import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'document-component',
  styles: `
.tag {
  text-align:right;
  float:right;
}
a {
  text-decoration:none;
}
a:hover {
  text-decoration:underline;
}`
})
export class DocumentComponent {

  @Prop() pages: string[];

  trim(name: string) {
    return name.replace(/.html/g, '.md');
  }

  render() {

    return (

      <div>
        {this.pages && this.pages.map(page => {
          return (
            <div>
              <a target="_blank" href={`https://github.com/orbital-js/orbital/tree/master/docs/docs${this.trim(page)}`} class="tag">Improve this doc</a>
              <app-marked doc={page} />
            </div>
          )
        })}
      </div>

    );

  }
}