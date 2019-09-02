let that;
Component({
  properties: {
    // 初始化的输入框的值
    value: {
      type: String,
      value: '',
      observer(new_value, old_value) {
        this.data.value = new_value;
        this.triggerEvent("hgchange", this.data.value);
      }
    },
    placeholder: {
      type: String,
      value: '请输入搜索内容'
    },
    //类型，默认为text
    type: {
      type: String,
      value: "text"
    }
  },
  ready() {
    that = this;
  },
  methods: {
    // input事件
    hginput: function (data) {
      this.setData({
        value: data.detail.value
      });
    }, // commit事件
    hgconfirm: function (data) {
      this.triggerEvent("hgconfirm", this.data.value);
    },
    clearValue: function () {
      this.setData({
        value: ''
      })
      this.triggerEvent("hgchange", '');
    }

  }
})