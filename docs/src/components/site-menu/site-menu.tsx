import { Component, State } from '@stencil/core';

import { ROUTES } from '../routes';
import { join } from '../path';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {

  @State() routes = ROUTES;

  capitalize(str) {
    let words = str.split(' ');
    return words.map((word) => {
      return word.substr(0, 1).toUpperCase() + word.substr(1, Infinity);
    }).join(' ');
  }

  generateRoutes() {
    console.log('calling gen');

    return this.routes.map((pack) =>
      <li>
        <h2>{this.capitalize(pack.package)}</h2>
        <ul>
          {Object.keys(pack.groups).map(groupName => {
            let group = pack.groups[groupName];
            console.log(groupName);
            
            return (<li id={groupName.toLowerCase()}>
              <h4>{this.capitalize(groupName)}</h4>
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
      </li>);
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <h4>Packages</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/core" router="#router">
                  Core
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/graphql" router="#router">
                  GraphQL
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/http" router="#router">
                  HTTP
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/middlewares" router="#router">
                  Middlewares
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/mongo" router="#router">
                  Mongo
                </stencil-route-link>
              </li>
            </ul>
          </li>
          {/* <li>
            <h2>Core</h2>
            <ul>
              <li>
                <h4>Methods</h4>
                <ul>
                  <li>
                    <stencil-route-link url="/docs/core/methods/bootstrap" router="#router">
                      bootstrap
                     </stencil-route-link>
                  </li>
                </ul>
              </li>
              <li>
                <h4>Decorators</h4>
                <ul>
                  <li>
                    <stencil-route-link url="/docs/core/decorators/module" router="#router">
                      Module
                     </stencil-route-link>
                  </li>
                  <li>
                    <stencil-route-link url="/docs/core/decorators/orbital" router="#router">
                      Orbital
                     </stencil-route-link>
                  </li>
                  <li>
                    <stencil-route-link url="/docs/core/decorators/injectable" router="#router">
                      Injectable
                     </stencil-route-link>
                  </li>
                  <li>
                    <stencil-route-link url="/docs/core/decorators/middleware" router="#router">
                      Middleware
                     </stencil-route-link>
                  </li>
                  <li>
                    <stencil-route-link url="/docs/core/decorators/route" router="#router">
                      Route
                     </stencil-route-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <h2>Mongo</h2>
            <ul>
              <li>
                <h4>Providers</h4>
                <ul>
                  <li>
                    <stencil-route-link url="/docs/mongo/providers/mongo" router="#router">
                      Mongo
                     </stencil-route-link>
                  </li>
                </ul>
              </li>
              <li>
                <h4>Modules</h4>
                <ul>
                  <li>
                    <stencil-route-link url="/docs/mongo/providers/mongo-module" router="#router">
                      MongoModule
                     </stencil-route-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li> */}
          {this.generateRoutes()}
        </ul>
      </div>
    );
  }
}
