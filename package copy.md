{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "private": true,
  "dependencies": {
    "lodash": "^4.17.19",
    "speed-measure-webpack-plugin": "^1.5.0"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.2.0",
    "eslint": "^6.0.0",
    "eslint-config-airbnb-base": "^13.0.0",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-import": "^2.25.4",
    "file-loader": "^4.0.0",
    "html-loader": "1.0.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.0.0",
    "less-loader": "6.0.0",
    "mini-css-extract-plugin": "^1.2.0",
    "optimize-css-assets-webpack-plugin": "^6.0.1",
    "postcss-loader": "^4.0.0",
    "postcss-preset-env": "^7.0.0",
    "style-loader": "^2.0.0",
    "url-loader": "^3.0.0",
    "webpack": "^4.9.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "build:chart": "webpack --profile --json > stats.json",
    "build:pro": "webpack --env.NODE_ENV=local --env.production --progress",
    "build:test": "webpack --env.NODE_ENV=local --env.development --progress"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "browserslist": {
    "development": [
      "> 0.2%",
      "last 1 chrome versions",
      "last 1 firefox versions",
      "last 1 safari versions"
    ],
    "production": [
      "> 2%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig":{
    "extends": "airbnb-base"
  }
}
