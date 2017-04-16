import { ControllerConfig } from '../types/controller';

export function Controller(config?: ControllerConfig): ClassDecorator {
    return (target: Function) => {
        let original = target;
        return original;
    };
}