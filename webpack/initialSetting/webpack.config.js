const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

module.exports={
    mode: 'development',
    entry:{
        main:'./src/app.js'
    },
    output:{
        path:path.resolve('./dist'),
        filename:'[name].js',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.PNG$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        // publicPath:'../dist'
                        name:'[name].[ext]?[hash]'
                    }
                }]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}