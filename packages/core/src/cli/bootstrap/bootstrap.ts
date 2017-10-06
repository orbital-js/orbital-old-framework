import * as chalk from 'chalk';
import { Injector, Provider, ReflectiveInjector } from 'injection-js';
import * as minimist from 'minimist';
import * as path from 'path';
import 'reflect-metadata';
import { ModuleWithProviders } from '../../interfaces/module_with_providers';
import {
    cycleProviders,
    getModule,
    isFunction,
    joinPath,
    methods,
    unique
    } from '../../util';
import { CliModule } from '../decorators/cli-module';
import { Command } from '../decorators/command';



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
    let providers: Provider[] = cycleProviders<CliModule>([mod]);
    let commands: Function[] = cycleCommands([mod]);
    let annotations: CliModule = Reflect.getMetadata('annotations', mod)[0];

    const config = annotations.config || { version: '0' };
    let slice = process.argv[1].substr(0, 1) === '/' ? 2 : 1;
    const input = minimist(process.argv.slice(slice));

    /* Use Angular's dependency injection to assosciate all providers to their respective places */
    let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(<any[]>[...commands, ...providers]);

    let chosenCommand;
    if (process.argv[slice] && process.argv[slice].substr(0, 1) !== '-') {
        chosenCommand = checkCommands(injector, commands, input._[0], input);
    } else {
        chosenCommand = checkCommands(injector, commands, undefined);
    }

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

function checkCommands(injector: ReflectiveInjector, commands: any[], command: string | undefined, input?: minimist.ParsedArgs) {
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
        // input && input._.splice(0, 1);
        return commands[index];
    } else if (aliasIndex > -1) {
        // input && input._.splice(0, 1);
        return commands[aliasIndex];
    } else {
        return commands[annotations.indexOf(undefined)];
    }
}

const cycleCommands = (modules: (CliModule | ModuleWithProviders)[] = [], prefix: string = '/'): Function[] => {
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
    let varCount = 0;
    if (commandAnnotation && commandAnnotation.arguments) {
        let i = 0;
        for (let argument in commandAnnotation.arguments) {
            let arg = commandAnnotation.arguments[argument];
            if (!arg.variadic) {
                args[arg.name] = input._[i];
                input._.splice(0, 1);
            } else {
                varCount++;
                if (varCount > 1) {
                    throw new Error('Command should only have one set of variadic arguments, but more were found.');
                } else {
                    args[arg.name] = input._;
                }
            }
        }
    }
    if (commandAnnotation && commandAnnotation.arguments) {
        commandAnnotation.arguments.forEach((arg) => {
            if (arg.required && !args[arg.name]) {
                console.error(chalk.red(`Uh oh, looks like you forgot the required argument '${arg.name}'.`));
                process.exit(1);
            }
        });
    }


    return args;
}

function getOptions(commandAnnotation: Command, input: minimist.ParsedArgs) {
    let opts: any = {};
    if (commandAnnotation && commandAnnotation.options) {
        for (const option in commandAnnotation.options) {
            const opt = commandAnnotation.options[option];
            if (opt.short && input[opt.short]) {
                opts[opt.long] = input[opt.short];
            } else {
                opts[opt.long] = input[opt.long];
            }
        }
    }
    return opts;
}

