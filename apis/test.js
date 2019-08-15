import ghhttp from '../utils/http.js';
import regeneratorRuntime from '../utils/runtime.js';
class Test {
  constructor() {}
  async getsatinApi() {
    console.log("调用");
    let ajax_data1 = await getApp().globalData.ghhttp({
      url: 'https://www.apiopen.top/satinApi',
      params: {
        type: 1,
        page: 1
      },
    });
    console.log(ajax_data1);
  }
}
let test = new Test();
export default test;