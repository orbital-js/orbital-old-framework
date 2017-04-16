import { ControllerConfig } from '../types/controller';

export function Controller(config?: ControllerConfig): ClassDecorator {
    return (target: Function) => {
        console.log("CONTROLLER STARTED");
        let original = target;
        console.log("CONTROLLER FINISHED");
        return original;
    };
}