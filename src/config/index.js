const router = require('../router/routes');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const static = require('express').static;
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

module.exports = function(app)
{
    // Security
    //
    app.use(helmet());

    // Views Folder
    //
    app.set('views', path.join(__dirname, '../views'));

    // Views Engine
    //
    app.set('view engine', 'pug');

    // Favicon
    //
    app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));

    // Public Folder
    //
    app.use(static(path.join(__dirname, '../../public')));

    // BodyParser
    //
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // CookieParser
    //
    app.use(cookieParser());

    // Cors
    //
    app.use(cors());

    // Gzip
    //
    app.use(compression());

    // Router
    //
    app.use(router);

    // Error Handler
    //
    app.use(function (error, request, response) {
        response.status(error.status || 500).json({
            message: error.message,
        });
    });
};