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

  render() {
    return (
      <div class="app">
        <site-header />
        <stencil-router id="router">
          <stencil-route url="/" component="landing-page" router="#router" exact={true} />

          <stencil-route url="/docs" component="documentation-container" router="#router" />

        </stencil-router>
      </div>
    );
  }
}
