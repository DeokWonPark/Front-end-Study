const path=require('path');
const webpack=require('webpack');
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
    devServer:{
        port:8000,
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
            template:'./src/index.html',
            templateParameters:{
                env: process.env.NODE_ENV === 'development'?"(개발용)":"(배포용)",
            }
        }),
        new CleanWebpackPlugin(),

        /* Banner Plugin 결과물에 빌드 정보나 커밋 버전같은 걸 추가할 수 있다*/
        new webpack.BannerPlugin({
            banner:() => `빌드 시간: ${new Date().toLocaleString()}`
        }),

        /* Define Plugin 빌드 타임에 결정된 값을 어플리이션에 전달할 때 사용*/
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("v.1.2.3"),
            PRODUCTION: JSON.stringify(false),
            MAX_COUNT: JSON.stringify(999),
            "api.domain": JSON.stringify("http://dev.api.domain.com"),
        }),
    ]
}