### 安装
`npm i @bestime/url-replace-loader`

### 使用
需要在css被其它loader解析完毕后使用

```javascript
config.module
    .rule('scss')
    .oneOf('vue')
    .use('样式url转化器')
    .before('postcss-loader')
    .loader('./loaders/url-replace-loader')
    .tap(() => {
      return {
        mode: 'css',
        config: {
          '/static': process.env.VUE_APP_ROUTER_BASE + '/static',
        }
      }
    })
    .end()

  config.module
    .rule('vue')
    .use('标签url转化器')
    .before('vue-loader')
    .loader('./loaders/url-replace-loader')
    .tap(() => {
      return {
        mode: 'html',
        config: {
          '/static': process.env.VUE_APP_ROUTER_BASE + '/static',
        }
      }
    })
    .end()
```

### 配置项
```javascript
{
  mode: 'html', // "html"、"css"
  config: {
    '/static': '/@prefix/static',
    '/images': '/api/assets',
  }
}
```