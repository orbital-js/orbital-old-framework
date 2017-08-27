import { Component, State } from '@stencil/core';

import { ROUTES } from '../routes'
import { join } from '../path';

@Component({
    tag: 'documentation-container',
    styles: `
    .cont {
      margin-bottom: 20px;
    }
    `
})
export class DocumentationContainer {
    @State() routes = ROUTES;
    generateRoutes() {
        let routes = [];
        for (let pack of this.routes) {
            let root = '/docs';
            let rootProp = { pages: [join('/api', pack.urlSegment.toLowerCase(), 'index.html')] }

            routes.push(<stencil-route
                url={join(root, pack.urlSegment.toLowerCase())}
                router="#router"
                component="document-component"
                componentProps={rootProp}
                exact={true}
            />)
            for (let group in pack.groups) {
                for (let element of pack.groups[group]) {
                    let url = join(root, pack.urlSegment.toLowerCase(), group.toLowerCase(), element.toLowerCase())
                    let props = { pages: [join('/api', pack.urlSegment.toLowerCase(), group.toLowerCase(), element.toLowerCase() + '.html')] }

                    routes.push(<stencil-route
                        url={url}
                        router="#router"
                        component="document-component"
                        componentProps={props}
                        exact={true}
                    />)
                }
            }
        }
        return routes;
    }


    render() {
        console.log('docscomp')
        return (
            <div class="wrapper">
                <div class="pull-left">
                    <site-menu />
                </div>
                <div class="pull-right">
                    <div class="cont">
                        <stencil-route url="/docs" component="docs-home" router="#router" exact={true} />
                        {this.generateRoutes()}
                    </div>
                </div>
            </div>
        );
    }
}