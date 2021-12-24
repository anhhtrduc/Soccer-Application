const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');

const app = express();
const port = 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    partialsDir: './views/partials',
    helpers: {
        section: hbs_sections(),
    },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.render('home');
});

app.use('/account', require('./routes/account.route'));

app.listen(port, () => console.log(`Server start on port ${port}!`));
