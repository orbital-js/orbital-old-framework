import { TypeDecorator, makeDecorator } from '../../decorators/util';

import { Argument } from '../interfaces/argument';
import { Option } from '../interfaces/option';

export interface Command {
    command?: string | null;
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
    <CommandDecorator>makeDecorator('Command', (command: Command = { command: null }) => {
        return command;
    });
