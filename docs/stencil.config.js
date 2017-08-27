exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['orbital-site', 'site-header', 'landing-page', 'type-card'] },
    { components: ['app-marked', 'drop-icon', 'documentation-container', 'site-menu'] },
    { components: ['document-component', 'docs-home'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
