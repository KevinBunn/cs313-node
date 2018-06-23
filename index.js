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
                if (weight <= 3.5 && weight > 0)
                    price = .29 + (weight * .21);
                else
                    res.locals.weightError = `Weight cannot be over 3.5 for ${type}`;
                break;
            }
            case "metered": {
                if (weight <= 3.5 && weight > 0)
                    price = .26 + (weight * .21);
                else
                    res.locals.weightError = `Weight cannot be over 3.5 for ${type}`;
                break;
            }
            case "flats": {
                if (weight <= 13 && weight > 0)
                    price = ((weight - 1) * .21) + 1;
                else
                    res.locals.weightError = `Weight cannot be over 13 for ${type}`;
                break;
            }
            case "first-class": {
                weight = Math.round(weight);
                if (weight <= 13 && weight > 0) {
                    switch (weight) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            price = 3.50;
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            price = 3.75;
                            break;
                        case 9:
                            price = 4.10;
                            break;
                        case 10:
                            price = 4.45;
                            break;
                        case 11:
                            price = 4.80;
                            break;
                        case 12:
                            price = 5.15;
                            break;
                        case 13:
                            price = 5.50;
                            break;
                    }
                }
                else {
                    res.locals.weightError = `Weight cannot be over 13 for ${type}`;
                }
                break;
            }
        }

        res.locals.price = price.toPrecision(2);
        res.render('pages/result');
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
