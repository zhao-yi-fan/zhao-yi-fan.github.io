module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: './'
      }
      
      return webpackConfig
    }
  },
};
