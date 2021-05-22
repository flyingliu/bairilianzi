var vm = new Vue({
  el: '#app',
  data: {
    no: 1,
    tiku: tiku,
    content: '床前明月光疑是地上霜举头望明月低头思故乡红豆生南国春来发几枝愿君多采撷此物最相思',
    end: '古诗两首 庚子夏月某某某书',
    row: '4',
    col: '10',
    item: '1.5',
    activeColor: '#000',
    fontSize: 30,
    title: '怀瑾书院书法创作格式设置',
    sub: '日课练习（40字）',
    name: '',
    familyIndex: 0,
    loading: true,
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
      isLoad: false,
      index: 1
    }, {
      name: '米芾真迹体',
      value: 'mifu',
      url: 'http://photo.guolaijie.com/css/font/mifu.css',
      isLoad: false,
      index: 2
    }, {
      name: '爨宝子字体',
      value: 'SXS-Cuanbaozibei',
      url: 'http://photo.guolaijie.com/css/font/SXS-Cuanbaozibei.css',
      isLoad: false,
      index: 3
    }, {
      name: '字库堂楷体',
      value: 'zikutanghkt',
      url: 'http://photo.guolaijie.com/css/font/zikutanghkt.css',
      isLoad: false,
      index: 4
    }, {
      name: '毛泽东草书',
      value: 'maozedong',
      url: 'http://photo.guolaijie.com/css/font/maozedong.css',
      isLoad: false,
      index: 5
    }, {
      name: '金文大篆体',
      value: 'dazhuan',
      url: 'http://photo.guolaijie.com/css/font/dazhuan.css',
      isLoad: false,
      index: 6
    }, {
      name: '方正小篆体',
      value: 'xiaozhuan',
      url: 'http://photo.guolaijie.com/css/font/xiaozhuan.css',
      isLoad: false,
      index: 7
    }, {
      name: '于右任标准草书体',
      value: 'yuyouren',
      url: 'http://photo.guolaijie.com/css/font/yuyouren.css',
      isLoad: false,
      index: 8
    }, {
      name: '田英章行书',
      value: 'tyzxs',
      url: 'http://photo.guolaijie.com/css/font/tyzxs.css',
      isLoad: false,
      index: 9
    }, {
      name: '章草',
      value: 'zhangcao',
      url: 'http://photo.guolaijie.com/css/font/tyzxs.css',
      isLoad: false,
      index: 10
    },{
      name: '文征明',
      value: 'wenzhengming',
      url: 'http://photo.guolaijie.com/css/font/wenzhengming.css',
      isLoad: false,
      index: 13
    }, {
      name: '大王黄庭经小楷',
      value: 'dawang',
      url: 'http://photo.guolaijie.com/css/font/dawang.css',
      isLoad: false,
      index: 11
    }, {
      name: '荆霄鹏楷体',
      value: 'jinxiaopen',
      url: 'http://photo.guolaijie.com/css/font/jinxiaopen.css',
      isLoad: false,
      index: 12
    }, {
      name: '姜浩楷体',
      value: 'jianghao',
      url: 'http://photo.guolaijie.com/css/font/jianghao.css?v=1',
      isLoad: false,
      index: 13
    }, {
      name: '曹全碑',
      value: '书体坊续曹全碑_0',
      url: 'http://photo.guolaijie.com/css/font/caoquan.css',
      isLoad: false,
      index: 14
    }]
  },
  watch: {
    no(a) {
      this.getStr()
      console.log(a)
    }
  },
  computed: {
    grid() {
      return this.row * this.col
    },
    conNum() {
      return this.content.split('').length
    },
    widthCm() {
      return this.row * this.item + 'cm'
    },
    widthAndCm() {
      return (Number(this.row) + 1) * this.item + 'cm'
    },
    heightCm() {
      return this.col * this.item + 'cm'
    },
    itemCm() {
      return this.item * 0.75 + 'cm'
    },
    rowCm() {
      return this.item + 'cm'
    },

    itemEndCm() {
      return this.item * 0.5 + 'cm'
    },
    line() {
      return this.item + 'cm'
    },
    lineEnd() {
      return this.item * .5 + 'cm'
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
      // document.title = this.title + this.sub
      window.print()
    },
    formatend(str) {
      const arr = str.split('')
      str = arr.map(item => {
        return `<i style="width:${this.item * 0.5}cm;height:${this.item * 0.5}cm">${item}</i>`
      })
      return str.join('')
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
    },
    getStr() {
      const no = this.no
      const reg =
      /[\ |\n|\；|\!|\@|\#|\$|\，|\。|\？|\！|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g

      let str = tiku[no]
      if (str) {
        str = str.content
        str = str.replace(reg, '')
        this.content = str
        this.sub = `${no}号题（${str.length}个字）`
        if (no > 0 && no < 11) {
          this.title = '小学低年级组（1、2年级）题库'
          this.col = 10
        } else if (no > 10 && no < 21) {
          this.title = '小学中年级组（3、4年级）题库'
          this.col = 14
        } else if (no > 20 && no < 31) {
          this.title = '小学高年级组（5、6年级）题库'
          this.col = 14
        } else if (no > 30 && no < 41) {
          this.title = '中学组（初中、高中）题库'
          this.col = 16
          this.item = 1.3
        }
        this.row = Math.ceil(str.length / this.col)
      }
    }
  },
  mounted() {
    this.getStr()
    const _this = this
    this.familyData.map(item => {
      this.downLoadCss(item.url, function () {
        if (_this.familyIndex == this.index) {
          _this.loading = false
        }
        this.isLoad = true
      }.bind(item))
    })
  }
})
