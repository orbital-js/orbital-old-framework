import { Component } from '@stencil/core';

@Component({
  tag: 'orbital-site',
  styleUrl: 'orbital-site.scss'
})
export class App {
  constructor() { }
  render() {
    return (
      <div class="app">
        <site-header />
        <stencil-router id="router">
          <stencil-route url="/" component="landing-page" router="#router" exact={true} />
          <div class="wrapper">
            <div class="pull-left">
              <site-menu />
            </div>
            <div class="pull-right">
              <stencil-route url="/docs" component="what-is" router="#router" exact={true} />
              <stencil-route url="/docs/core/methods/bootstrap" component="bootstrap-method" router="#router" />
              <stencil-route url="/docs/getting-started" component="getting-started" router="#router" />
              <stencil-route url="/docs/components" component="basics-components" router="#router" />
              <stencil-route url="/docs/routing" component="basics-routing" router="#router" />
              <stencil-route url="/docs/config" component="compiler-config" router="#router" />
              <stencil-route url="/docs/server-side-rendering" component="stencil-ssr" router="#router" />
            </div>
          </div>
        </stencil-router>
      </div>
    );
  }
}
