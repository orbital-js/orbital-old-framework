import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'drop-icon',
})
export class DropIcon {

    @Prop() activated: boolean;

    render() {
        if (this.activated) {
            return <i style={{ 'width': '21px' }} class="far fa-chevron-down"></i>
        } else {
            return <i style={{ 'width': '21px' }} class="far fa-chevron-right"></i>
        }
    }
}