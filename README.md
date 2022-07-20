### 安装

```javascript
npm i @bestime/url-replace-loader
```

### 使用

需要在 css 被其它 loader 解析完毕后使用

```javascript
config.module
  .rule("scss")
  .oneOf("vue")
  .use("CSS-这个ID随便取")
  .before("postcss-loader")
  .loader("@bestime/url-replace-loader")
  .tap(() => {
    return {
      mode: "css",
      config: {
        "/static": "/newFolder/image",
      },
    };
  })
  .end();

config.module
  .rule("vue")
  .use("HTML-这个ID随便取")
  .before("vue-loader")
  .loader("@bestime/url-replace-loader")
  .tap(() => {
    return {
      mode: "html",
      config: {
        "/static": "/newFolder/image",
      },
    };
  })
  .end();
```

### 配置项

```javascript
{
  mode: 'html', // "html"、"css"
  config: {
    '/static': '/@prefix/static',
    '/images': '/api/assets',
    ...
  }
}
```
