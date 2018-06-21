const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
    .get('/result', function(req, res) {

        let type = req.query.type;
        let weight = req.query.weight;
        let price = 0;

        switch (type) {
            case "stamped": {
                price = .29 + (weight * .21);
                break;
            }
            case "metered": {
                price = .26 + (weight * .21);
                break;
            }
            case "flats": {
                price = ((weight - .50) * .21) + .50;
                break;
            }
            case "first-class": {
                break;
            }
        }

        res.locals.price = price.toPrecision(2);
        res.render('pages/result');
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
