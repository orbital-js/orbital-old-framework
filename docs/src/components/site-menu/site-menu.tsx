import { Component, State } from '@stencil/core';

import { ROUTES } from '../routes';
import { join } from '../path';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {

  @State() routes = ROUTES;
  @State() active: string = null;

  capitalize(str) {
    let words = str.split(' ');
    return words.map((word) => {
      return word.substr(0, 1).toUpperCase() + word.substr(1, Infinity);
    }).join(' ');
  }

  activate(pack) {
    if (this.active !== pack) this.active = pack;
    else this.active = null;
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <h4>Packages</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/core" router="#router" onClick={() => this.active = 'Core'}>
                  Core
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/graphql" router="#router" onClick={() => this.active = 'GraphQL'}>
                  GraphQL
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/http" router="#router" onClick={() => this.active = 'HTTP'}>
                  HTTP
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/middlewares" router="#router" onClick={() => this.active = 'Middlewares'}>
                  Middlewares
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/mongo" router="#router" onClick={() => this.active = 'Mongo'}>
                  Mongo
                </stencil-route-link>
              </li>
            </ul>
          </li>
          {this.routes.map((pack) =>
            <li>
              <h2 onClick={() => this.activate(pack.package)}>
                <drop-icon activated={this.active == pack.package} />
                {this.capitalize(pack.package)}
              </h2>
              <ul style={{ 'display': this.active == pack.package ? 'block' : 'none' }}>
                {Object.keys(pack.groups).map(groupName => {
                  let group = pack.groups[groupName];

                  return (<li id={groupName.toLowerCase()}>
                    <h4>{this.capitalize(groupName)} </h4>
                    <ul>
                      {group.map(name => {
                        let url = join('/docs', pack.urlSegment.toLowerCase(), groupName.toLowerCase(), name.toLowerCase())
                        return (<li>
                          <stencil-route-link url={url} router="#router">
                            {this.capitalize(name)}
                          </stencil-route-link>
                        </li>
                        )
                      })}

                    </ul>
                  </li>
                  )
                })}

              </ul>
            </li>)}
        </ul>
      </div>
    );
  }
}
