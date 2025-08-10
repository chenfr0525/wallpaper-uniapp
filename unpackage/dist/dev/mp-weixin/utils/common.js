"use strict";
require("../common/vendor.js");
const formatTimeDiff = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  if (diff < 0)
    return null;
  const seconds = Math.floor(diff / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  if (seconds < 60) {
    return "1分钟";
  } else if (minutes < 60) {
    return `${minutes}分钟`;
  } else if (hours < 24) {
    return `${hours}小时`;
  } else if (days < 30) {
    return `${days}天`;
  } else if (months < 3) {
    return `${months}个月`;
  } else {
    return null;
  }
};
exports.formatTimeDiff = formatTimeDiff;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
