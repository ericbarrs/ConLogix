const fetch = require('node-fetch')
const csv = require('csv-parser')
const fs = require('fs')




module.exports.list = (req, res) => {
    const dataObj = {}
    const results = [];
    let ip = req.ip
    console.log(ip)
    //if you using the local host or running this from webpack live server
    // will reassign the ip to a default of 8.8.8.8
    if (ip.includes("::ffff:")) {
        ip = ip.slice(7, ip.length)
    }
    if (ip == "::1") {
        ip = '8.8.8.8'
    }
    if (ip.includes("192") || ("127")) {
        ip = '8.8.8.8'
    }
    console.log(ip)
    fetch(`https://ipvigilante.com/json/${ip}`)
        .then(res => res.json())
        .then(data => {
            dataObj.myCountry = data
            console.log(dataObj.myCountry)
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