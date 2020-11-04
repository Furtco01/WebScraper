const { csvFormat } = require('d3-dsv');
const Nightmare = require('nightmare');
const { readFileSync, writeFileSync } = require('fs');
/*const numbers = readFileSync('./tesco-title-numbers.csv', 
  {encoding: 'utf8'}).trim().split('\n');*/
const START = 'https://www.dermstore.com/shop_Sale_504310.htm';

  const getSkincare = async () => {
    //console.log(`Now checking ${id}`);
    const nightmare = new Nightmare({ show: true, webPreferences: {images: false }});
    // Go to initial start page, navigate to Detail search
    /*try {
        await nightmare
          .goto(START)
          .wait('.dropdown-toggle sale-cat')
          .click('.dropdown-toggle sale-cat');
      } catch(e) {
        console.error(e);
      }*/
    try {
      await nightmare
        .goto(START)
        .wait('checkbox_500014')
        .click('checkbox_500014');
    } catch(e) {
      console.error(e);
    }
    try {
      await nightmare
        .goto(START)
        .wait('checkbox_300082')
        .click('checkbox_300082');
    } catch(e) {
      console.error(e);
    }
    try {
      await nightmare
        .goto(START)
        .wait('checkbox_500837')
        .click('checkbox_500837');
    } catch(e) {
      console.error(e);
    }
    try {
      await nightmare
        .goto(START)
        .wait('checkbox_500001')
        .click('checkbox_500001');
    } catch(e) {
      console.error(e);
    }
    try {
      await nightmare
        .goto(START)
        .wait('checkbox_503564')
        .click('checkbox_503564');
    } catch(e) {
      console.error(e);
    }
    try {
      const result = await nightmare
        .wait('.item-name')
        .evaluate(() => {
          return [...document.querySelectorAll('.item-name')]
            .map(el => el.innerText);
        })
        .end();
      return { result: result[0]};
    } catch(e) {
      console.error(e);
      return undefined;
    }
  };


  getSkincare()
  .then(a => console.dir(a))
  .catch(e => console.error(e));


  /*const series = numbers.reduce(async (queue, number) => {
    const dataArray = await queue;
    dataArray.push(await getAddress(number));
    return dataArray;
  }, Promise.resolve([]));
  series.then(data => {
    const csvData = csvFormat(data.filter(i => i));
    writeFileSync('./output.csv', csvData, { encoding: 'utf8' });
  })
  .catch(e => console.error(e));*/