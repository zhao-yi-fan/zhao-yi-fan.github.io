module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      /**
       * 相对 publicPath 只在生产构建需要，用于 GitHub Pages 和静态子目录部署。
       *
       * 开发环境必须保留 CRA 默认的 '/'：dev-middleware 按 publicPath 匹配请求，
       * 设成 './' 会导致 '/' 匹配不上，请求落到静态中间件、
       * 直接吐出未经 HtmlWebpackPlugin 处理的 public/index.html
       * （占位符不替换、没有 script 标签，页面全白）。
       */
      if (env === 'production') {
        webpackConfig.output = {
          ...webpackConfig.output,
          publicPath: './',
        };
      }

      return webpackConfig;
    },
  },
};
