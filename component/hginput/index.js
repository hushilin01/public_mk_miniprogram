Component({
  properties: {
    // 初始化的输入框的值
    initvalue: {
      type: String,
      value: ''
    },
    initplaceholder: {
      type: String,
      value: '请输入搜索内容'
    },
    //类型，默认为text
    inittype: {
      type: String,
      value: "text"
    }
  },
  methods: {
    // input事件
    scinput: function(data) {
      this.triggerEvent("qcinput", data);
    }, // commit事件
    qcconfirm: function(data) {
      this.triggerEvent("qcconfirm", data);
    }
  }
})