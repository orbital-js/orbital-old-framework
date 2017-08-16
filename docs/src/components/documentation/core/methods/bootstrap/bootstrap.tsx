import { Component } from '@stencil/core';

@Component({
  tag: 'bootstrap-method',
  styleUrl: 'bootstrap.scss'
})
export class StencilSsr {

  render() {
    return [
      <app-marked doc='core/methods/bootstrap/index.html'></app-marked>
    ]
  }
}
