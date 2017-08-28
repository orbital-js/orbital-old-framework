import { Component, Prop } from '@stencil/core';
@Component({
    tag: 'type-card',
    styleUrl: './type-card.scss'
})
export class TypeCard {
    @Prop() type: string;

    characters = {
        decorator: '@',
        function: 'F',
        module: 'M',
        provider: 'P',
        interface: 'I',
        middleware: 'MW',
        package: <span>📦&nbsp;</span>
    }

    capitalize(str) {
        let words = str.split(' ');
        return words.map((word) => {
            return word.substr(0, 1).toUpperCase() + word.substr(1, Infinity);
        }).join(' ');
    }

    render() {
        return (

            <div class="card">
                <span class={{ 'badge': true, [this.type]: true }}>{this.characters[this.type]}</span>
                {this.capitalize(this.type)}
            </div>

        )
    }
}