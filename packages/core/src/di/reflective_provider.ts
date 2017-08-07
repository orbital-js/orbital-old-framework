/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { AsyncFactoryProvider, ClassProvider, ExistingProvider, FactoryProvider, Provider, TypeProvider, ValueProvider } from './provider';
import { Inject, Optional, Self, SkipSelf } from './metadata';
import { invalidProviderError, mixingMultiProvidersWithRegularProvidersError, noAnnotationError } from './reflective_errors';

import { InjectionToken } from './injection_token';
import { ReflectiveKey } from './reflective_key';
import { Type } from '../type';
import { reflector } from '../reflection/reflection';
import { resolveForwardRef } from './forward_ref';

interface NormalizedProvider extends TypeProvider, ValueProvider, ClassProvider, ExistingProvider,
  AsyncFactoryProvider, FactoryProvider { }

/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
export class ReflectiveDependency {
  constructor(
    public key: ReflectiveKey, public optional: boolean, public visibility: Self | SkipSelf | null) { }

  static fromKey(key: ReflectiveKey): ReflectiveDependency {
    return new ReflectiveDependency(key, false, null);
  }
}

const _EMPTY_LIST: any[] = [];

/**
 * An internal resolved representation of a {@link Provider} used by the {@link Injector}.
 *
 * It is usually created automatically by `Injector.resolveAndCreate`.
 *
 * It can be created manually, as follows:
 *
 * ### Example ([live demo](http://plnkr.co/edit/RfEnhh8kUEI0G3qsnIeT?p%3Dpreview&p=preview))
 *
 * ```typescript
 * var resolvedProviders = Injector.resolve([{ provide: 'message', useValue: 'Hello' }]);
 * var injector = Injector.fromResolvedProviders(resolvedProviders);
 *
 * expect(injector.get('message')).toEqual('Hello');
 * ```
 *
 * @experimental
 */
export interface ResolvedReflectiveProvider {
  /**
   * A key, usually a `Type<any>`.
   */
  key: ReflectiveKey;

  /**
   * Factory function which can return an instance of an object represented by a key.
   */
  resolvedFactories: ResolvedReflectiveFactory[];

  /**
   * Indicates if the provider is a multi-provider or a regular provider.
   */
  multiProvider: boolean;
}

export class ResolvedReflectiveProvider_ implements ResolvedReflectiveProvider {
  constructor(
    public key: ReflectiveKey, public resolvedFactories: ResolvedReflectiveFactory[],
    public multiProvider: boolean) { }

  get resolvedFactory(): ResolvedReflectiveFactory { return this.resolvedFactories[0]; }
}

/**
 * An internal resolved representation of a factory function created by resolving {@link
 * Provider}.
 * @experimental
 */
export class ResolvedReflectiveFactory {
  constructor(
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    public factory: Function,

    /**
     * Arguments (dependencies) to the `factory` function.
     */
    public dependencies: ReflectiveDependency[],
    async: boolean = false) { }
}


/**
 * Resolve a single provider.
 */
async function resolveReflectiveFactory(provider: NormalizedProvider): Promise<ResolvedReflectiveFactory> {
  let factoryFn: Function;
  let resolvedDeps: ReflectiveDependency[];
  let async = false;
  if (provider.useClass) {

    const useClass = await resolveForwardRef(provider.useClass);
    factoryFn = reflector.factory(useClass);
    resolvedDeps = await _dependenciesFor(useClass);
  } else if (provider.useExisting) {

    factoryFn = (aliasInstance: any) => aliasInstance;
    resolvedDeps = [ReflectiveDependency.fromKey(await ReflectiveKey.get(provider.useExisting))];
  } else if (provider.useAsyncFactory) {

    factoryFn = provider.useAsyncFactory;
    async = true;
    resolvedDeps = await constructDependencies(provider.useAsyncFactory, provider.deps, true);
  } else if (provider.useFactory) {

    factoryFn = provider.useFactory;
    resolvedDeps = await constructDependencies(provider.useFactory, provider.deps);
  } else {

    factoryFn = () => provider.useValue;
    resolvedDeps = _EMPTY_LIST;
  }
  return new ResolvedReflectiveFactory(factoryFn, resolvedDeps, async);
}

/**
 * Converts the {@link Provider} into {@link ResolvedProvider}.
 *
 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
 * convenience provider syntax.
 */
async function resolveReflectiveProvider(provider: NormalizedProvider): Promise<ResolvedReflectiveProvider> {
  return new ResolvedReflectiveProvider_(
    await ReflectiveKey.get(provider.provide), [await resolveReflectiveFactory(provider)],
    provider.multi || false);
}

/**
 * Resolve a list of Providers.
 */
export async function resolveReflectiveProviders(providers: Provider[]): Promise<ResolvedReflectiveProvider[]> {
  const normalized: Provider[] = _normalizeProviders(providers, []);

  const resolved: ResolvedReflectiveProvider[] = [];
  for (const provider of normalized) {

    const res = await resolveReflectiveProvider(<NormalizedProvider>provider);

    resolved.push(res);
  }

  const resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());

  return Array.from((await resolvedProviderMap).values());
}

/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 */
export function mergeResolvedReflectiveProviders(
  providers: ResolvedReflectiveProvider[],
  normalizedProvidersMap: Map<number, ResolvedReflectiveProvider>):
  Map<number, ResolvedReflectiveProvider> {
  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    const existing = normalizedProvidersMap.get(provider.key.id);
    if (existing) {
      if (provider.multiProvider !== existing.multiProvider) {
        throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
      }
      if (provider.multiProvider) {
        for (let j = 0; j < provider.resolvedFactories.length; j++) {
          existing.resolvedFactories.push(provider.resolvedFactories[j]);
        }
      } else {
        normalizedProvidersMap.set(provider.key.id, provider);
      }
    } else {
      let resolvedProvider: ResolvedReflectiveProvider;
      if (provider.multiProvider) {
        resolvedProvider = new ResolvedReflectiveProvider_(
          provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
      } else {
        resolvedProvider = provider;
      }
      normalizedProvidersMap.set(provider.key.id, resolvedProvider);
    }
  }
  return normalizedProvidersMap;
}

function _normalizeProviders(providers: Provider[], res: Provider[]): Provider[] {

  for (const b of providers) {
    if (b instanceof Type) {
      res.push({ provide: b, useClass: b });

    } else if (b && typeof b == 'object' && (b as any).provide !== undefined) {
      res.push(b as NormalizedProvider);

    } else if (b instanceof Array) {
      _normalizeProviders(b, res);

    } else {
      throw invalidProviderError(b);
    }
  }

  return res;
}

export async function constructDependencies(
  typeOrFunc: any, dependencies?: any[], async: boolean = false): Promise<ReflectiveDependency[]> {


  if (!dependencies) {
    return await _dependenciesFor(typeOrFunc, async);
  } else {
    const params: any[][] = dependencies.map(t => [t]);
    const deps: ReflectiveDependency[] = [];
    for (const dependency of dependencies) {

      deps.push(await _extractToken(typeOrFunc, dependency, params, async));
    }
    return deps;
  }

}

async function _dependenciesFor(typeOrFunc: any, async: boolean = false): Promise<ReflectiveDependency[]> {
  const params = reflector.parameters(typeOrFunc);


  if (!params) return [];
  if (params.some(p => p == null)) {
    throw noAnnotationError(typeOrFunc, params);
  }
  const p: ReflectiveDependency[] = [];
  for (const param of params) {

    p.push(await _extractToken(typeOrFunc, param, params, async));
  }
  return p;
}

async function _extractToken(
  typeOrFunc: any, metadata: any[] | any, params: any[][], async: boolean = false): Promise<ReflectiveDependency> {
  let token: any = null;
  let optional = false;


  if (!Array.isArray(metadata)) {
    if (metadata instanceof Inject) {
      return await _createDependency(metadata.token, optional, null);
    } else {
      return await _createDependency(metadata, optional, null);
    }
  }



  let visibility: Self | SkipSelf | null = null;

  for (let i = 0; i < metadata.length; ++i) {
    const paramMetadata = metadata[i];

    if (paramMetadata instanceof Type) {
      token = paramMetadata;

    } else if (paramMetadata instanceof Inject) {
      token = paramMetadata.token;

    } else if (paramMetadata instanceof Optional) {
      optional = true;

    } else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
      visibility = paramMetadata;
    } else if (paramMetadata instanceof InjectionToken) {
      token = paramMetadata;
    }
  }



  token = await resolveForwardRef(token, async);



  if (token != null) {
    return await _createDependency(token, optional, visibility);
  } else {
    throw noAnnotationError(typeOrFunc, params);
  }
}

async function _createDependency(
  token: any, optional: boolean, visibility: Self | SkipSelf | null): Promise<ReflectiveDependency> {
  return new ReflectiveDependency(await ReflectiveKey.get(token), optional, visibility);
}
