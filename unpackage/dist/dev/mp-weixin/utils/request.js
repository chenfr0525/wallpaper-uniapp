"use strict";
const common_vendor = require("../common/vendor.js");
const request = (config = {}) => {
  return new Promise((resolve, reject) => {
    let {
      url,
      method = "GET",
      data
    } = config;
    common_vendor.index.request({
      url,
      method,
      data,
      header: {
        "access-key": "rubychenling525"
      },
      success: (res) => {
        if (res.data.errCode === 0) {
          resolve(res.data.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none"
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
