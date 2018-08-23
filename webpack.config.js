/**
 * Created by apple on 2018/8/22.
 *
 * 游戏打包配置
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WEBPACK_PRO_ENV = process.env.NODE_ENV;
const phaserModulePath = path.join(__dirname, '/node_modules/phaser/');

const sourcePath = {
    'dev':path.join(__dirname,'./server/views'),
    'dist':path.join(__dirname,'./dist')
}

module.exports = {
    entry:path.join(__dirname,'./src/game.js'),
    devtool:'cheap-module-source-map',
    output:{
        path:sourcePath[WEBPACK_PRO_ENV],
        publicPath:'/',
        filename:'js/[name]_[chunkhash:8].js',
        chunkFilename:'js/common/[name]_[chunkhash:8].js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "stage-2"],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test:/\.(png|svg|jpg|gif|eot|woff|ttf)$/,
                use:['file-loader?name=[path][name]_[hash:8].[ext]&context=./src/assets&outputPath=assets/']
            },
            { test: /pixi\.js/, loader: 'expose-loader?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
            { test: /p2\.js/, loader: 'expose-loader?p2' }
        ]
    },
    resolve: {
        alias: {
            'phaser': path.join(phaserModulePath, 'build/custom/phaser-split.js'),
            'pixi': path.join(phaserModulePath, 'build/custom/pixi.js'),
            'p2': path.join(phaserModulePath, 'build/custom/p2.js'),
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            showErrors:true,
            inject:'body'
        })
    ]
}