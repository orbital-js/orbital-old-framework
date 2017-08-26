import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'document-component',
  styles: `
  .cont {
    margin-bottom: 20px;
  }
  `
})
export class DocumentComponent {

  @Prop() pages: string[];

  render() {
    return (
      <div class="wrapper">
        <div class="pull-left">
          <site-menu />
        </div>
        <div class="pull-right">
          <div class="cont">
            {this.pages && this.pages.map(page => <app-marked doc={page} />)}
          </div>
        </div>
      </div>
    );
  }
}