import { Component, State } from '@stencil/core';

import { ROUTES } from '../routes'
import { join } from '../path';

@Component({
  tag: 'orbital-site',
  styleUrl: 'orbital-site.scss'
})
export class App {

  constructor() { }

  @State() routes = ROUTES;

  generateRoutes() {
    let routes = [];
    for (let pack of this.routes) {
      let root = '/docs';
      let rootProp = { pages: [join(pack.urlSegment.toLowerCase(), 'index.html')] }

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
    return (
      <div class="app">
        <site-header />
        <stencil-router id="router">
          <stencil-route url="/" component="landing-page" router="#router" exact={true} />

          <stencil-route url="/docs" component="documentation-container" router="#router" />

          {/* {this.generateRoutes()} */}

        </stencil-router>
      </div>
    );
  }
}
