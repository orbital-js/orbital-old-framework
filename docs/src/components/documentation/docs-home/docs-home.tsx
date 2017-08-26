import { Component } from '@stencil/core';

@Component({
    tag: 'docs-home',
    styleUrl: './docs-home.scss'
})
export class DocsHome {
    render() {
        return (
            <div class="wrapper">
                <div class="pull-left">
                    <site-menu />
                </div>
                <div class="pull-right">
                    <h1>API Documentation</h1>
                </div>
            </div>
        )
    }
}