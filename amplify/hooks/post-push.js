const fs = require('fs');
const parameters = JSON.parse(fs.readFileSync(0, { encoding: 'utf8' }));
// send parameters.{data|error} to git
