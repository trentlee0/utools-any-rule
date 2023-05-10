const rules = require('./RULES')
const {shell} = require('electron')

const showList = rules.map((value) => ({
  title: value.title,
  description:
    '例如：' +
    value.examples.reduce(
      (prev, cur, curIndex) => (curIndex === 0 ? cur : prev + '，' + cur),
      ''
    ),
  reg: value.rule + ''
}))

window.exports = {
  'any-rule': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        callbackSetList(showList)
      },
      search: (action, searchWord, callbackSetList) => {
        let filterArray
        if (searchWord) {
          filterArray = showList.filter(
            (value) =>
              value.title.toLowerCase().indexOf(searchWord.toLowerCase()) != -1
          )
        } else {
          filterArray = showList
        }
        callbackSetList(filterArray)
      },
      select: (action, itemData, callbackSetList) => {
        utools.hideMainWindow()
        utools.copyText(itemData.reg)
        utools.outPlugin()
      },
      placeholder: '搜索，Enter 复制正则'
    }
  },
  'visual-rule': {
    mode: 'none',
    args: {
      enter: ({code, type, payload}) => {
        utools.hideMainWindow()
        shell.openExternal('https://regexper.com/#' + payload)
        utools.outPlugin()
      }
    }
  }
}
