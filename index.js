

var _loaderUtils = require("loader-utils");

const cssRules = [
  /(url\s?\(\s?')(.*?)('\s?\))/gi,
  /(url\s?\(\s?")(.*?)("\s?\))/gi,
  /(url\s?\(\s?)(.*?)(\s?\))/gi
]

const tagRules = [
  /(<img.* [^:]src="\s?)(.*?)(".*?\/\>)/gi,
  /(<img.* [^:]src='\s?)(.*?)('.*?\/\>)/gi
]

function urlFind (ruleList, data, callback) {
  ruleList.forEach(function (reg) {
    data = data.replace(reg, function (_, prefix, link, suffix) {
      link = callback(link)      
      return prefix + link + suffix
    })
  })
  
  return data
}


module.exports = function (source) {
  const options = _loaderUtils.getOptions(this) || {
    config: {}
  }
  if(!options.mode) return source

  const config = options.config
  let useRule;
  switch (options.mode) {
    case 'css':
      useRule = cssRules
      break;
    case 'html':
      useRule = tagRules
      break;
  }
  

  source = urlFind(useRule, source, function (path) {
    for (var key in config) {
      var regStr = new RegExp('^' + key + '(?=/|$)')
      const newUrl = path.replace(regStr, config[key])
      console.log("转换", path, '=>', newUrl)
      path = newUrl
    }
    return path.replace(/^\/\//, '/')
  })
  return source
}