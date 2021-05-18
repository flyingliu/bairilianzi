var vm = new Vue({
  el: '#app',
  data: {
    color: {
      name: '彩色',
      cname: 'color',
    },
    colorList: [
      {
        name: '彩色',
        cname: 'color',
      },
      {
        name: '红色',
        cname: 'color1',
      },
      {
        name: '经典黑白',
        cname: 'classic',
      }
    ],
    no: 0,
    tiku: tiku,
    content: '123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上123456789012345678901234567890床前明月光疑是地上霜举头望明月低头思故乡红豆生南国春来发几枝愿君多采撷此物最相思',
    end: '古诗两首 庚子夏月某某某书',
    row: '4',
    col: '10',
    item: '0.8',
    activeColor: '#000',
    fontSize: 30,
    title: '怀瑾书院书法创作格式设置',
    sub: '日课练习（40字）',
    name: '',
    allstrs: [],
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
      name: '田英章行书',
      value: 'tyzxs',
      url: 'http://photo.guolaijie.com/css/font/tyzxs.css',
      isLoad: false,
      index: 9
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
    no (a) {
      this.getStr()
    },
    item (a) {
      this.getRowCol()
      // this.format(this.content)
    }
  },
  computed: {
    grid () {
      return this.row * this.col
    },
    conNum () {
      return this.content.split('').length
    },
    widthCm () {
      return this.row * this.item + 'cm'
    },
    widthAndCm () {
      return (Number(this.row) + 1) * this.item + 'cm'
    },
    heightCm () {
      return this.col * this.item + 'cm'
    },
    itemCm () {
      return this.item * 0.75 + 'cm'
    },
    rowCm () {
      return this.item + 'cm'
    },
    line () {
      return this.item + 'cm'
    },
    contentFormat () {
      const arr = this.content ? this.content.split('') : ['']
      const allstrs = []
      this.getRowCol()
      const total = this.row * this.col
      const len = arr.length
      for (let i = 0; i < len; i++) {
        let page = Math.floor(i / total)
        if (allstrs[page] === undefined) allstrs[page] = []
        allstrs[page].push(arr[i])
      }
      const last = allstrs.length > 0 ? allstrs[allstrs.length - 1] : ['']
      for (let i = last.length; i < total; i++) {
        last.push('')
      }
      console.log(allstrs)
      return allstrs
    }
  },
  methods: {
    getQueryString (name, url) {
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
    print () {
      // document.title = this.title + this.sub
      window.print()
    },

    format (str) {
      this.allstrs = []
      const arr = str.split('')
      this.getRowCol()
      const total = this.row * this.col
      const len = arr.length
      for (let i = 0; i < len; i++) {
        let page = Math.floor(i / total)
        if (this.allstrs[page] === undefined) this.allstrs[page] = []
        this.allstrs[page].push(arr[i])
      }
      const last = this.allstrs[this.allstrs.length - 1]
      for (let i = last.length; i < total; i++) {
        last.push('')
      }

      console.log(this.allstrs)
      return this.allstrs

    },
    getHtml (arr) {
      let strs = arr.map((item, index) => {
        const myclass = (index + 1) % this.row === 0 ? 'active' : 'noact'
        return ``
      })
      strs = strs.join('')
      // console.log(strs)
      return strs
    },
    downLoadCss (url, callback) {
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
    getRowCol () {
      this.row = parseInt(18 / (this.item * 0.9375))
      this.col = parseInt(24 / (this.item * 2 + 0.4))
    },
    getStr () {
      const no = this.no
      let str = tiku[no]
      if (str) {
        str = str.content
        this.content = str
        this.sub = `${no}号题（${str.length}个字）`
      }
    }
  },
  mounted () {

    const _this = this
    this.familyData.map(item => {
      this.downLoadCss(item.url, function () {
        if (item.familyIndex == this.index) {
          item.loading = false
        }
        item.isLoad = true
      }.bind(item))
    })
  }
})
