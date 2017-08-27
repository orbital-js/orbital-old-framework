import { Component } from '@stencil/core';

@Component({
    tag: 'docs-home',
    styleUrl: './docs-home.scss'
})
export class DocsHome {
    render() {
        return (
            <div>
                <h1>API Documentation</h1>
            </div>
        )
    }
}