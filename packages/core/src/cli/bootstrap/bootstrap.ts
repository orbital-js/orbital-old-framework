import 'reflect-metadata';

import * as path from 'path';
import * as program from 'commander';

import { Injector, Provider, ReflectiveInjector } from 'injection-js';
import { getModule, isFunction, joinPath, methods, unique } from './util';

import { CliModule } from '../decorators/cli-module';
import { Command } from '../decorators/command';
import { ModWithProviders } from '../../interfaces/module_with_providers';

/**
 * @description The method to start up a Orbital instance. 
 * This compiles all of the dependencies and prepares them to be served.
 * 
 * @param {Module} mod 
 * @returns {void} 
 */
function bootstrap(mod: any): void {

    /* We strip some data from the type annotation on the module. */
    let providers: Provider[] = cycleProviders([mod]);
    let commands: Command[] = cycleCommands([mod]);
    let annotations: CliModule = Reflect.getMetadata('annotations', mod)[0];

    const config = annotations.config;
    program
        .version(config.version);

    /* Use Angular's dependency injection to assosciate all providers to their respective places */
    let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(<any[]>[...commands, ...providers]);


    /* Notify express of all of the routes */
    commands.forEach((command: any) => {
        buildCommand(injector, command);
    });
    
    program.parse(process.argv);

    return;
}

function buildCommand(injector: Injector, command: Function): void {
    let commandClass = injector.get(command);
    let commandAnnotation: Command = Reflect.getMetadata('annotations', command);
    let p = program
        .command(commandAnnotation.command);
    if (commandAnnotation.alias) {
        p.alias(commandAnnotation.alias);
    }
    if (commandAnnotation.description) {
        p.description(commandAnnotation.description);
    }
    if (commandAnnotation.arguments) {
        let argStr = '';
        let varStr = '';
        let varCount = commandAnnotation.arguments.filter(el => el.variadic).length;
        if (varCount > 1) {
            throw new Error(`Commands can only take one variadic argument, but ${commandAnnotation.command} specified ${varCount}.`)
        }
        for (let arg of commandAnnotation.arguments) {
            if (arg.variadic) {
                varStr = `[${arg.name}...]`;
            }
            if (arg.required) {
                argStr += `<${arg.name}> `;
            } else {
                argStr += `[${arg.name}] `;
            }
        }
        argStr += varStr;
        p.arguments(argStr);
    }
    if (commandAnnotation.options) {
        for (let o of commandAnnotation.options) {
            let optStr: string;
            let long = o.long.replace(/-/g, '');
            let short = o.short.replace(/-/g, '');
            if (short) {
                optStr = `-${short} --${long}`;
            } else {
                optStr = `--${long}`;
            }
            p.option(optStr, o.description, o.coercionFn, o.coercionMemory);
        }
    }
    p.action(commandClass.action);
}

const cycleProviders = (modules: (CliModule | ModWithProviders)[] = []): Provider[] => {
    let providers: Provider[] = [];
    modules.forEach(mod => {
        let annotation: CliModule = getModule(mod);
        if ((<ModWithProviders>mod).obModule && (<ModWithProviders>mod).providers) {
            providers = providers.concat(mod.providers || []);
        } else {
            providers = providers.concat(annotation.providers || []);
        }

        if (annotation.imports) {
            providers = providers.concat(cycleProviders(annotation.imports));
        }
    });

    return providers;
};

const cycleCommands = (modules: (CliModule | ModWithProviders)[] = [], prefix: string = '/'): Command[] => {
    let commands: Command[] = [];

    modules.forEach((mod) => {
        let annotation: CliModule = getModule(mod);

        if (annotation.commands) {
            for (let route of annotation.commands) {
                let controller: Command = Reflect.getMetadata('annotations', route)[0];
                Reflect.defineMetadata('annotations', controller, route);
                commands.push(route);
            }
        }

        if (annotation.imports) {
            commands = commands.concat(cycleCommands(annotation.imports));
        }

    });

    return commands;
};

