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
  var options = _loaderUtils.getOptions(this)
  if(!options.urlCallback) {
    return source
  }
  


  var showLog = options.showLog === true
  var useRule, newUrl;
  switch (options.mode) {
    case 'css':
      useRule = cssRules
      break;
    case 'html':
      useRule = tagRules
      break;
  }
  
  // if(showLog) {
  //   console.log("测试", options.mode,'=>', options)
  // }

  
  source = urlFind(useRule, source, function (ruleName, path) {
    
    newUrl = options.urlCallback(path)
    
    if(showLog) {
      if(newUrl !== path) {
        console.log(`转换[${ruleName}] `, colorText.red(path), '=>', colorText.green(newUrl))
      } else {
        console.log(`转换[${ruleName}] `, colorText.grey(path), '=>', colorText.grey(newUrl))
      }      
    }

    path = newUrl
    return path
  })
  return source
}