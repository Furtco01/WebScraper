//github reference for chalk https://github.com/chalk/chalk

//require statement for chalk.js import
const chalk = require('chalk');

//syntax for using chalk with multiple styles, more available in Github
console.log(chalk.red.underline('Hi, Collin'));
console.log(chalk.underline.keyword('orange')('Hi, Collin'));
console.log(chalk.yellow.underline('Hi, Collin'));
console.log(chalk.green.underline('Hi, Collin'));
console.log(chalk.blue.underline('Hi, Collin'));
console.log(chalk.magenta.underline('Hi, Collin'));
console.log(chalk.underline.keyword('purple')('Hi, Collin'));
console.log('\n');

//github reference for progress https://github.com/visionmedia/node-progress

//require statement for progress import
const ProgressBar = require('progress')


//short example on usage of progress
const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)