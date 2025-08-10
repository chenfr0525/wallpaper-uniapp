"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_section_item2 = common_vendor.resolveComponent("section-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_section_item2 + _easycom_uni_load_more2)();
}
const _easycom_section_item = () => "../../components/section-item/section-item.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_section_item + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const getUserInfo = async () => {
      let res = await api_api.apiGetUserInfo();
      userInfo.value = res;
    };
    getUserInfo();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value
      }, userInfo.value ? {
        b: common_vendor.unref(utils_system.getTitleHeight)() + "px",
        c: common_assets._imports_0,
        d: common_vendor.t(userInfo.value.IP),
        e: common_vendor.t(userInfo.value.address.city || userInfo.value.address.province || userInfo.value.address.country),
        f: common_vendor.p({
          title: "我的下载",
          icon: "download-filled",
          url: "/pages/classList/classList?title=我的下载&type=download",
          num: userInfo.value.downloadSize
        }),
        g: common_vendor.p({
          title: "我的评分",
          icon: "star-filled",
          url: "/pages/classList/classList?title=我的评分&type=score",
          num: userInfo.value.scoreSize
        }),
        h: common_vendor.p({
          title: "联系客服",
          icon: "chatboxes-filled",
          url: ""
        }),
        i: common_vendor.p({
          title: "订阅更新",
          icon: "notification-filled",
          url: "/pages/notice/detail?id=65361e318b0da4ca084e3ce0"
        }),
        j: common_vendor.p({
          title: "常见问题",
          icon: "flag-filled",
          url: "/pages/notice/detail?id=6536358ce0ec19c8d67fbe82"
        })
      } : {
        k: common_vendor.unref(utils_system.getTitleHeight)() + "px",
        l: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
