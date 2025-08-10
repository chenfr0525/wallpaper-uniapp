"use strict";
const common_vendor = require("../common/vendor.js");
const getStatusBarHight = () => {
  let SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
  return SYSTEM_INFO.statusBarHeight || 10;
};
const getTitleHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let {
      height,
      top
    } = common_vendor.index.getMenuButtonBoundingClientRect();
    return (top - getStatusBarHight()) * 2 + height;
  } else {
    return 40;
  }
};
exports.getStatusBarHight = getStatusBarHight;
exports.getTitleHeight = getTitleHeight;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
