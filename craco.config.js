module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: './'
      }
      
      // 只在生产环境使用 CDN，开发环境使用本地包
      if (env === 'production') {
        // 配置 externals，让 React 和 React-DOM 通过 CDN 引入，不打包进 bundle
        webpackConfig.externals = {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
      
      return webpackConfig
    }
  },
};
