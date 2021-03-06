var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry:APP_PATH,
	output:{
		path:BUILD_PATH,
		filename:'bundle.js'
	},
	devServer: {
	    historyApiFallback:true,
	    hot:true,
	    inline:true
  	},

  	module:{
		loaders:[
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader'
            // },
	        {
		        test: /\.less$/,
		        loaders: ['style-loader', 'css-loader', 'less-loader'],
		        // include: APP_PATH
		    },
			{
        		test: /\.jsx?$/,
		        loader: 'babel-loader',
		        include: APP_PATH,
		        query: { 
		            presets: ['es2015','react','stage-2']
		        }
	        }
		]
	},


	//添加plugins插件
	plugins:[
		new HtmlwebpackPlugin({
			title:'Hello React',
			template: path.resolve(ROOT_PATH, 'views/index.html'),
			filename:'index.html'
		})
	]
	
};