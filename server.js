const express = require('express');
const port = 5000;
const path = require('path')
const countryRoute = require('./routes/countryRoute');

const app = express();

app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log(`working on port ${port}`)
})

app.use(express.static("client/build"))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
// });

app.use('/api', countryRoute)