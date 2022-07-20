var _loaderUtils = require("loader-utils");
var colorText = require("./utils/colorText")


var cssRules = [
  {
    name: '单引号CSS',
    reg: /(url\s?\(\s?')(.*?)('\s?\))/gi
  },
  {
    name: '双引号CSS',
    reg: /(url\s?\(\s?")(.*?)("\s?\))/gi
  },
  {
    name: '无引号CSS',
    reg: /(url\s?\(\s?)([^"']*?)(\s?\))/gi
  }
]

var tagRules = [
  {
    name: '双引号IMAGE',
    reg: /(<img.* src\s?=\s?"\s?)(.*?)(".*?\/\>)/gi
  },
  {
    name: '单引号IMAGE',
    reg: /(<img.* src\s?=\s?'\s?)(.*?)('.*?\/\>)/gi
  }
]

function urlFind (ruleList, data, callback) {
  ruleList.forEach(function (item) {
    data = data.replace(item.reg, function (_, prefix, link, suffix) {
      link = callback(item.name, link)
      return prefix + link + suffix
    })
  })
  
  return data
}


module.exports = function (source) {
  var options = _loaderUtils.getOptions(this) || {
    config: {}
  }
  if(!options.mode) return source

  var config = options.config
  var useRule, newUrl, reg;
  switch (options.mode) {
    case 'css':
      useRule = cssRules
      break;
    case 'html':
      useRule = tagRules
      break;
  }
  

  source = urlFind(useRule, source, function (ruleName, path) {
    for (var key in config) {
      reg = new RegExp('^' + key + '(?=/|$)')
      newUrl = path.replace(reg, config[key]).replace(/^\/\//, '/')
      console.log(`转换[${ruleName}] `, colorText.grey(path), '=>', colorText.green(newUrl))
      path = newUrl
    }
    return path
  })
  return source
}