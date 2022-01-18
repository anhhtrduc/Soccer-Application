const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const session = require('express-session');
const app = express();
const port = 3000;

app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {},
    })
);

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    partialsDir: './views/partials',
    helpers: {
        section: hbs_sections(),
        ifStr(s1, s2, options) {
            if (s1 === s2) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./middlewares/locals.mdw')(app);
app.get('/', (req, res, next) => {
    res.render('home');
});
// app.use((req, res) => {
//     res.render('404', { layout: false });
// });

// app.use((err, req, res, next) => {
//     console.log(err.stack);
//     res.status(500).render('500', { layout: false });
// });
app.use(express.static('public'));

app.use('/account', require('./routes/account.route'));
app.use('/league', require('./routes/league.route'));
app.use('/admin', require('./routes/result.route'));
app.use('/statistic', require('./routes/statistic.route'));
app.use('/', require('./routes/search.route'));

app.listen(port, () => console.log(`Server start on port ${port}!`));
