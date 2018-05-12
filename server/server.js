const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();

var NODE_ENV = process.env.NODE_ENV || 'production';
var isDev = NODE_ENV === 'development';

const config = isDev ? require('../webpack.dev.js') : require('../webpack.prod.js');
const compiler = webpack(config);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// const config = require('../webpack.config.js');
// const compiler = webpack(config);

//-------------------开发环境-------
if (isDev) {
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    app.use(webpackDevMiddleware(compiler, {
        //noInfo: true,
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        },
        headers: {
            "Access-Control-Allow-Origin": "*", //处理跨域请求
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        }
    }));
    //热加载
    app.use(webpackHotMiddleware(compiler));


    app.get('/*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'build') + '/index.html');
    });
    // Serve the files on port 8000.
    app.listen(8000, function() {
        console.log('development listening on port 8000!\n');
    });

}
//---------------生产环境----------------------
else {
    //使用./build作为web目录
    app.use(express.static(path.resolve(__dirname, 'build')));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'build/index.html'));

    });

    // Serve the files on port 8001.
    app.listen(8001, function() {
        console.log('production listening on port 8001!\n');
    });
}