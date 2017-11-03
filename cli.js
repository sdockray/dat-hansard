#!/usr/bin/env node
var cli = require('commander');
var h2d = require('./index.js');

console.log('Running Hansard -> Dat');

cli
  .version('1.0.2')
  .option('-d, --directory <directory>', 'The directory to save the data to')
  .parse(process.argv);

h2d.representativesToDat(cli.directory);
h2d.senateToDat(cli.directory);
h2d.membersToDat(cli.directory);