let that;
Component({
  properties: {
    // 初始化的输入框的值
    wookList: {
      type: Array,
      value: [],
      observer: function(newvalue, oldvalue) {
        console.log(newvalue)

      }

    },
  },
  methods: {

  },
  ready() {
    that = this;
  },
})