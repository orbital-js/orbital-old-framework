// import { ControllerConfig } from '../types/controller';

export function Controller(): ClassDecorator {
    return (target: Function) => {
        let original = target;

        return original;
    };
}

@Controller()
export class Ctrl {
    constructor() {

    }
}