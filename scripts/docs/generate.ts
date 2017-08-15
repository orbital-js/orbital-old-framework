import { Dgeni } from 'dgeni';
// Notice how we are specifying which config to use
// This will import the index.js from the /docs/config folder and will use that
// configuration file while generating the documentation
var dgeni = new Dgeni([require('../../docs/config')]);

// Using the dgeni.generate() method
dgeni.generate();