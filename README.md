# Nightmare.js WebScraper

## Project Description

#### I needed a way to scrape websites for products that are on sale that didn't require me to manually check the website everyday. This scraper uses nightmare.js to open a browser, enter the search terms I regurlay look for, and return the list of products that are available at that time.

## Requirements

#### These are the packages you will need to run this scraper
* Node 7.x
* Nightmare.js (to perform the scrape)
* d3-dsv (to format a csv file)
* fs (to read and write file sync)

#### Example imports

##### const { csvFormat } = require('d3-dsv');
##### const Nightmare = require('nightmare');
##### const { readFileSync, writeFileSync } = require('fs');

## To Run

1. Open up index.js and edit the start variable to determine where the
Electron browser will navigate to initially
1. Edit the wait(), type(), and click() statements to guide nightmare
to the desired elements
1. If necessary, edit the replace statements in thehandleResultData function
to accurately manipulate the returned data.
1. Save the file.
1. Run node index.js

#### You will see a browser pop up and output in the terminal and perform the tasks you set. Once it is done, it outputs the result to the output.csv file.

## References

1. [Nightmare.js Tutorial](https://medium.com/journocoders/nightmarishly-good-scraping-with-nightmare-js-and-async-await-b7b20a38438f)





