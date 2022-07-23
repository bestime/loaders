转换`css`和`<img/`>标签中的资源地址

### 安装

```javascript
npm i @bestime/url-replace-loader
```

### 使用

> 需要在 css 被其它 loader 解析完毕后使用，否则一些 css 变量没被解析导致不能全部转换成功

```javascript
config.module
  .rule('scss')
  .oneOf('vue')
  .use('css-url-replace')
  .before('postcss-loader')
  .loader('@bestime/url-replace-loader')
  .tap(() => {
    return {
      mode: 'css',
      showLog: true,
      urlCallback: function (url) {
        return '/abc/' + url + '?flag=static'
      }
    };
  })
  .end();

config.module
  .rule('vue')
  .use('html-url-replace')
  .before('vue-loader')
  .loader('@bestime/url-replace-loader')
  .tap(() => {
    return {
      mode: 'html',
      showLog: true,
      urlCallback: function (url) {
        return return '/abc/' + url + '?flag=static'
      }
    };
  })
  .end();
```
