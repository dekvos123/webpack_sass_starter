const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

const config = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    index: './index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/bundle.js'
  },

  module: {
    rules: [
      // babel-loader
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      // html-loader
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // scss-loader
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'styles')],
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      // file-loader (images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/img/'
            }
          }
        ]
      },
      //file-loader (fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/font'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    // }),
    extractPlugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/img"),
    compress: true,
    port: 4000,
    stats: 'errors-only',
    open: true
  },

  devtool: 'inline-source-map' // Dev env only
};

const viewObj = getView('src/*.html')
const pages = Object.keys(viewObj)
pages.forEach(function(pathname) {
  const htmlName = viewObj[pathname]
  const conf = {
      filename: './' + htmlName + '.html',  //生成的html存放路径，相对于path
      template: './' + htmlName + '.html',  //html模板路径
      inject: 'body',                       //js插入的位置，true/'head'/'body'/false
      hash: true,                           //为静态资源生成hash值
      minify: {                             //压缩HTML文件    
          removeComments: true,             //移除HTML中的注释
          collapseWhitespace: false         //删除空白符与换行符
      }
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
})

/**
 * 获取视图
 * @param {*} globPath 
 * @param {*} pathDir 
 */
function getView(globPath, pathDir) {
  let files = glob.sync(globPath);
  let entries = {},
      entry, dirname, basename, pathname, extname;

  for (let i = 0; i < files.length; i++) {
      entry = files[i];
      dirname = path.dirname(entry);

      extname = path.extname(entry);
      basename = path.basename(entry, extname);
      pathname = path.join(dirname, basename);
      pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
      entries[pathname] =  basename;
  }
  return entries;
}

module.exports = config;