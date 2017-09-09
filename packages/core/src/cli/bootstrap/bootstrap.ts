import 'reflect-metadata';

import * as chalk from 'chalk';
import * as minimist from 'minimist';
import * as path from 'path';

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

let emptyCommands: string[] = [];

export function bootstrap(mod: any): void {

    /* We strip some data from the type annotation on the module. */
    let providers: Provider[] = cycleProviders([mod]);
    let commands: Function[] = cycleCommands([mod]);
    let annotations: CliModule = Reflect.getMetadata('annotations', mod)[0];

    const config = annotations.config || { version: '0' };
    let slice = process.argv[1].substr(0, 1) === '/' ? 2 : 1;
    const input = minimist(process.argv.slice(slice));

    /* Use Angular's dependency injection to assosciate all providers to their respective places */
    let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(<any[]>[...commands, ...providers]);

    console.log(input);

    let chosenCommand = checkCommands(injector, commands, input._[0]);
    if (chosenCommand) {
        let commandAnnotation: Command = Reflect.getMetadata('annotations', chosenCommand);

        let args: object = getArguments(commandAnnotation, input);
        delete input._;
        let opts: object = getOptions(commandAnnotation, input);

        injector.get(chosenCommand).action(args, opts);

        return;
    } else {
        console.error(chalk.red(`Command '${input._[0]}' does not exist.`));
    }
}

function checkCommands(injector: ReflectiveInjector, commands: any[], command: string) {
    let annotations = commands.map(cmd => {
        const annotation = Reflect.getMetadata('annotations', cmd).command;

        if (annotation === null) {
            emptyCommands.push(cmd.constructor.name);
            if (emptyCommands.length > 1) {
                throw new Error(`You have multiple commands with no name. ${emptyCommands}. You may only have one command with no name.`);
            }
        }
        return annotation;
    });

    let aliases = commands.map(cmd => Reflect.getMetadata('annotations', cmd).alias || '');

    const index = annotations.indexOf(command);
    const aliasIndex = aliases.indexOf(command);
    if (index > -1) {
        return commands[index];
    } else if (aliasIndex > -1) {
        return commands[aliasIndex];
    } else {
        return commands[annotations.indexOf(null)];
    }
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

const cycleCommands = (modules: (CliModule | ModWithProviders)[] = [], prefix: string = '/'): Function[] => {
    let commands: Function[] = [];

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

function getArguments(commandAnnotation: Command, input: minimist.ParsedArgs) {
    let args: any = {};
    if (commandAnnotation && commandAnnotation.arguments) {
        for (let argument in commandAnnotation.arguments) {
            let arg = commandAnnotation.arguments[argument];
            let varCount = 0;
            if (!arg.variadic) {
                args[arg.name] = input._.indexOf(arg.name) > -1;
            } else {
                varCount++;
                if (varCount > 1) {
                    throw new Error('Command should only have one set of variadic arguments, but more were found.');
                } else {
                    args[arg.name] = input._.map(item => {
                        if (commandAnnotation.arguments) {
                            let mappedArgs = commandAnnotation.arguments.map(a => a ? a.name : '');
                            let i: number = mappedArgs.indexOf(item);
                            return i < 0;
                        } else {
                            return [undefined];
                        }
                    });
                }
            }
        }
    }
    return args;
}

function getOptions(commandAnnotation: Command, input: minimist.ParsedArgs) {
    let opts: any = {};
    if (commandAnnotation && commandAnnotation.options) {
        for (const option in commandAnnotation.options) {
            const opt = commandAnnotation.options[option];
            console.log(input);
            if (opt.short && input[opt.short]) {
                opts[opt.long] = input[opt.short];
            } else {
                opts[opt.long] = input[opt.long];
            }
        }
    }
    return opts;
}

