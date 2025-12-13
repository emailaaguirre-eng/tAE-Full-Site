const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'production',
  entry: {
    'artkey-editor': './wp-build/artkey-editor/index.js',
    'design-editor': './wp-build/design-editor/index.js',
    'artkey-viewer': './wp-build/artkey-viewer/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'wp-content/plugins'),
    filename: (pathData) => {
      const chunk = pathData.chunk.name;
      if (chunk === 'artkey-editor' || chunk === 'artkey-viewer') {
        return `artkey-editor/build/[name].js`;
      }
      return `artkey-design-editor/build/[name].js`;
    },
    clean: false, // Don't clean, we're outputting to specific plugin folders
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['> 1%', 'last 2 versions'] } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        const chunk = pathData.chunk.name;
        if (chunk === 'artkey-editor' || chunk === 'artkey-viewer') {
          return `artkey-editor/build/[name].css`;
        }
        return `artkey-design-editor/build/[name].css`;
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'components'),
    },
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
});

