var vm = new Vue({
  el: '#app',
  data: {
    shengzi,
    no: '古诗二首',
    content: '床前明月光疑是地上霜举头望明月低头思故乡红豆生南国春来发几枝愿君多采撷此物最相思',
    end: '古诗两首 己亥夏月某某某书',
    row: '4',
    col: '10',

    activeColor: '#000',
    fontSize: 30,
    title: '怀瑾书院书法创作格式设置',
    color: {
      name: '彩色',
      cname: 'color',
      bg: '#ee0000',
      text: '#25c731'
    },
    colorList: [
      {
        name: '彩色',
        cname: 'color',
        bg: '#ee0000',
        text: '#25c731'
      },
      {
        name: '经典黑白',
        cname: 'classic',
        bg: '#cccccc',
        text: '#333333'
      }
    ],

    sub: '日课练习（40字）',
    name: '',
    familyIndex: 1,
    loading: true,
    cname: '混合格子',
    canmeList: {
      '带点米字格': 'dotmipage',
      '混合格子': 'shimipage',
      '米字格': 'mipage',
      '十字格': 'shipage',
      '回宫格': 'jiupage'
    },
    familyData: [{
      name: '田英章楷体',
      value: 'font',
      url: 'http://photo.guolaijie.com/css/font/font.css',
      isLoad: false,
      index: 0
    }, {
      name: '楷体_GB2312',
      value: 'KaiTi_GB2312',
      url: 'http://photo.guolaijie.com/css/font/KaiTi_GB2312.css',
      isLoad: true,
      index: 1
    }, {
      name: '字库堂楷体',
      value: 'zikutanghkt',
      url: 'http://photo.guolaijie.com/css/font/zikutanghkt.css',
      isLoad: false,
      index: 2
    }, {
      name: '吴玉生行楷繁体',
      value: 'WFT201911-01',
      url: 'http://photo.guolaijie.com/css/font/wuyusheng.css',
      isLoad: false,
      index: 3
    }, {
      name: '大王黄庭经小楷',
      value: 'dawang',
      url: 'http://photo.guolaijie.com/css/font/dawang.css',
      isLoad: false,
      index: 4
    }, {
      name: '荆霄鹏楷体',
      value: 'jinxiaopen',
      url: 'http://photo.guolaijie.com/css/font/jinxiaopen.css',
      isLoad: false,
      index: 5
    }, {
      name: '姜浩楷体',
      value: 'jianghao',
      url: 'http://photo.guolaijie.com/css/font/jianghao.css?v=1',
      isLoad: false,
      index: 6
    }, {
      name: '曹全碑',
      value: '书体坊续曹全碑_0',
      url: 'http://photo.guolaijie.com/css/font/caoquan.css',
      isLoad: false,
      index: 7
    }],
    size: '1.45cm',
    lineNum: 1,
    itemData: ['1.0cm', '1.3cm', '1.4cm', '1.45cm', '1.5cm']
  },
  watch: {
    no(a) {
      this.getStr()
    },
    lineNum() {
      this.getStr()
    }
  },
  computed: {
    len() {
      return parseInt(17.5 / parseFloat(this.size))
    },
    currstyle() {
      return {
        width: this.size,
        height: this.size,
        fontSize: parseFloat(this.size) * 0.8 + 'cm'
      }
    },
    grid() {
      return this.row * this.col
    },
    conNum() {
      return this.content.split('').length
    },
    widthCm() {
      return this.row * this.item + 'cm'
    },

    itemEndCm() {
      return this.item * 0.5 + 'cm'
    },
    line() {
      return this.item + 'cm'
    },
    lineEnd() {
      return this.item * .5 + 'cm'
    },
    constr() {
      let arr = []
      let len = parseInt(22.5 / parseFloat(this.size))
      let page = this.content.length / len
      for (let i = 0; i < page; i++) {
        let con = this.content.substr(i * len, len)
        arr.push(con)
      }
      return arr
    }
  },
  methods: {
    getQueryString(name, url) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      if (url) {
        try {
          url = url.split('?')[1]
          var r = url.match(reg)
          if (r != null)
            return decodeURI(r[2])
          return null
        } catch (e) {
          return null
        }
      } else {
        var r = window.location.search.substr(1).match(reg)
        if (r != null)
          return decodeURI(r[2])
        return null
      }
    },
    print() {
      window.print()
    },
    getStr() {
      let text = this.shengzi[this.no]
      let textArr = []
      for (let i of text) {
        let n = this.lineNum
        while(n > 0) {
          n--
          textArr.push(i)
        }
      }
      this.content = textArr.join('')
    },
    format(str) {
      const arr = str.split('')
      const total = this.row * this.col
      if (arr.length < this.row * this.col) {
        for (let i = arr.length; i < total; i++) {
          arr.push('')
        }
      }

      str = arr.map(item => {
        return `<i style="width:${this.item}cm;height:${this.item}cm">${item}</i>`
      })
      return str.join('')
    },
    downLoadCss(url, callback) {
      var elem = document.createElement('link')
      elem.rel = 'stylesheet'
      elem.type = 'text/css'
      elem.href = url
      document.body.appendChild(elem)
      elem.onload = elem.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          callback && callback()
          elem.onload = elem.onreadystatechange = null
        }
      }
    }
  },
  mounted() {
    const _this = this
    this.familyData.map(item => {
      if (!item.isLoad) {
        this.downLoadCss(item.url, function () {
          if (_this.familyIndex == this.index) {
            _this.loading = false
          }
          this.isLoad = true
        }.bind(item))
      }
    })
  }
})
