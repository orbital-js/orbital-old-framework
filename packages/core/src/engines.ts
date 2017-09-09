import * as engines from 'consolidate';

export interface RendererInterface {
    render(path: string, fn: (err: Error, html: string) => any): any;

    render(path: string, options: { cache?: boolean, [otherOptions: string]: any }, fn: (err: Error, html: string) => any): any;

    render(path: string, options?: { cache?: boolean, [otherOptions: string]: any }): Promise<string>;

    (path: string, fn: (err: Error, html: string) => any): any;

    (path: string, options: { cache?: boolean, [otherOptions: string]: any }, fn: (err: Error, html: string) => any): any;

    (path: string, options?: { cache?: boolean, [otherOptions: string]: any }): Promise<string>;
}

export interface Engine {
    name: string;
    engine: RendererInterface;
}


export const Engines: {
    [propName: string]: Engine;
} = {
    atpl: { name: 'atpl', engine: <RendererInterface>engines.atpl },
    dot: { name: 'dot', engine: <RendererInterface>engines.dot },
    dust: { name: 'dust', engine: <RendererInterface>engines.dust },
    eco: { name: 'eco', engine: <RendererInterface>engines.eco },
    ejs: { name: 'ejs', engine: <RendererInterface>engines.ejs },
    ect: { name: 'ect', engine: <RendererInterface>engines.ect },
    haml: { name: 'haml', engine: <RendererInterface>engines.haml },
    hamlet: { name: 'hamlet', engine: <RendererInterface>engines.hamlet },
    handlebars: { name: 'handlebars', engine: <RendererInterface>engines.handlebars },
    hogan: { name: 'hogan', engine: <RendererInterface>engines.hogan },
    htmling: { name: 'htmling', engine: <RendererInterface>engines.htmling },
    jade: { name: 'jade', engine: <RendererInterface>engines.jade },
    jazz: { name: 'jazz', engine: <RendererInterface>engines.jazz },
    jqtpl: { name: 'jqtpl', engine: <RendererInterface>engines.jqtpl },
    just: { name: 'just', engine: <RendererInterface>engines.just },
    liquid: { name: 'liquid', engine: <RendererInterface>engines.liquid },
    liquor: { name: 'liquor', engine: <RendererInterface>engines.liquor },
    lodash: { name: 'lodash', engine: <RendererInterface>engines.lodash },
    mote: { name: 'mote', engine: <RendererInterface>engines.mote },
    mustache: { name: 'mustache', engine: <RendererInterface>engines.mustache },
    nunjucks: { name: 'nunjucks', engine: <RendererInterface>engines.nunjucks },
    pug: { name: 'pug', engine: <RendererInterface>engines.pug },
    qejs: { name: 'qejs', engine: <RendererInterface>engines.qejs },
    ractive: { name: 'ractive', engine: <RendererInterface>engines.ractive },
    react: { name: 'react', engine: <RendererInterface>engines.react },
    swig: { name: 'swig', engine: <RendererInterface>engines.swig },
    templayed: { name: 'templayed', engine: <RendererInterface>engines.templayed },
    toffee: { name: 'toffee', engine: <RendererInterface>engines.toffee },
    underscore: { name: 'underscore', engine: <RendererInterface>engines.underscore },
    walrus: { name: 'walrus', engine: <RendererInterface>engines.walrus },
    whiskers: { name: 'whiskers', engine: <RendererInterface>engines.whiskers },
};