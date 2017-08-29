import { TypeDecorator, makeDecorator } from '../../decorators/util';

export interface Argument {
    name: string;
    required?: boolean;
    variadic?: boolean;
}

export interface Option {
    long: string;
    short?: string;
    description?: string;
    arguments?: Argument[];
    coercionFn?: (val: any) => any;
    coercionMemory?: any;
}

export interface Command {
    command: string;
    arguments?: Argument[];
    options?: Option[];
    description?: string;
    alias?: string;
}

export interface CommandDecorator {
    (obj?: Command): TypeDecorator;

    new(obj?: Command): Command;
}


export const Command: CommandDecorator =
    <CommandDecorator>makeDecorator('Command', (command: Command = { command: '' }) => {
        return command;
    });