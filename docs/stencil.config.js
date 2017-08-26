exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['orbital-site', 'site-header', 'landing-page',] },
    { components: ['app-marked', 'site-menu'] },
    { components: ['document-component', 'docs-home'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  preferBuiltins: false
}
