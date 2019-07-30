const fetch = require('node-fetch')
const csv = require('csv-parser')
const fs = require('fs')

module.exports.list = (req, res) => {
    const dataObj = {}
    const results = []
    fetch(`https://ipvigilante.com/json/${req.body.ip}`)
        .then(res => res.json())
        .then(data => {
            dataObj.myCountry = data
            // console.log(dataObj.myCountry)
            fs.createReadStream('data.csv')
                .pipe(csv(['Country', 'Date', 'Local_price', 'Dollar_ex', 'Dollar_price', 'Dollar_PPP', 'Dollar_valuation']))
                .on('data', (data) => { results.push(data) })
                .on('end', () => {
                    //filter the results from the current country
                    const nonCurrentCountry = results.filter(country => country.Country != dataObj.myCountry.data.country_name)
                    const currentCountry = results.filter(country => country.Country == dataObj.myCountry.data.country_name)
                    // Generate Random country from filtered list
                    const num = Math.floor(Math.random() * nonCurrentCountry.length)
                    //make the random country in a object
                    dataObj.randomCountry = nonCurrentCountry[num]
                    //get the last entry in the csv file                
                    dataObj.myCountry = currentCountry[currentCountry.length - 1]
                    //send the object
                    res.send(dataObj);
                    // [
                    //   { NAME: 'Daffy Duck', AGE: '24' },
                    //   { NAME: 'Bugs Bunny', AGE: '22' }
                    // ]

                });

        })
        .catch(err => console.log(err))


}