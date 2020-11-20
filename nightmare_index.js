//imports for nightmare.js and d3-dsv for scraping and outputting to csv format
const { csvFormat } = require('d3-dsv');
const Nightmare = require('nightmare');
const { readFileSync, writeFileSync } = require('fs');
//declare params to input into search bar
const params = readFileSync('./skincare-search-params.csv', 
  {encoding: 'utf8'}).trim().split('\n');
//starting URL for nightmare
const START = 'https://www.sephora.com/';

//handles some of the string manipulation for the result array,
function handleResultData(string) {
  var re = /,/g;
  var reTwo = /"|'/g;
  var reThree = /'/g;
  var reFour = /,/g;
  replace = string.replace(re,"'\n'").replace(reTwo,'').replace(reThree,'').replace(reFour,"'\n'");
  var finalResult = replace;
  return finalResult;
};

  //declare async function to start scrape
  const getSkincare = async (param) => {
    //log statement showing param being passed
    console.log(`Now checking ${param}`);
    //({ show: true }) flag brings up a browser window to show work being done by script
    const nightmare = new Nightmare({ show: true});
    // Go to initial start page, navigate to Detail search
    try {
      await nightmare
        //navigates to URL defined above and finds the search bar,
        //enters the passed param, waits and presses enter
        .goto(START)
        .wait('.css-1g8idav')
        .type('.css-1g8idav', param)
        .wait(500)
        //simulates enter keystroke to return search results
        .type('body', '\u000d')
        //handle popup by waiting and clicking close button
        .wait('.css-1kna575')
        .click('.css-1kna575');
    } catch(e) {
      console.error(e);
    }
    try {
      //defines result of search and selects class of items returned,
      //uses the spread operator to populate an array, and then
      //iterates through the new array with map and prints innerText
      const result = await nightmare
        .wait('.css-1gughuu')
        .evaluate(() => {
          return [...document.querySelectorAll('.css-1gughuu')]
            .map(el => el.innerText);
        })
        //ends the process
        .end();
      //return result array
      return {result};
    } catch(e) {
      console.error(e);
      return undefined;
    }
  };

  //calls function and passes in first index of param file
  //defined in params and logs result to console. This
  //call will only work for one param, specified as [0]
  /*getSkincare(params[0])
  .then(a => console.dir(a))
  .catch(e => console.error(e));*/



  //used to define a series for a list of params and makes async
  //calls until all params have been passed and the results have
  //been processed

  const series = params.reduce(async (queue, param) => {
    const dataArray = await queue;
    dataArray.push(await getSkincare(param));
    return dataArray;
  }, Promise.resolve([]));
  series.then(data => {
    const csvData = csvFormat(data.filter(i => i));
    writeFileSync('./output.csv', handleResultData(csvData), { encoding: 'utf8' });
  })
  .catch(e => console.error(e));