import { ControllerConfig } from '../types/controller';

/**
 * Controller
 * @description the decorator to wrap a controller
 * @param config {ControllerConfig} configuration on your controller 
 * @returns decorator {ClassDecorator} to decorate your controller class
 */
export function Controller(config?: ControllerConfig): ClassDecorator {
    return (target: Function) => {
        let original = target;
        return original;
    };
}