# Vue Laboratory

## Three.js

- Map
- Map backend
- geometry-convex
- geometry-extrude-shapes2

## Remote SVG

`build/icon-loader.js`从远程获取`SVG`，保存至本地。

`svg-sprite-loader`进行加载(**远程**与**本地**)`SVG`。

- Icons

## Question

- Firefox: `TypeError: "exports" is read-only`
- Chrome: `Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'`

`webpack.base.conf.js`:
``` js
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    resolve('src'),
    resolve('test'),
    // Remove
    // resolve('node_modules/webpack-dev-server/client')
  ]
}
```
