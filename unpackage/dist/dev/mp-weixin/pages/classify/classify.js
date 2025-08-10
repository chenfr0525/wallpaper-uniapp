"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_custom_navbar2 = common_vendor.resolveComponent("custom-navbar");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_navbar2 + _easycom_theme_item2)();
}
const _easycom_custom_navbar = () => "../../components/custom-navbar/custom-navbar.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_navbar + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    const getClassifyList = async () => {
      let res = await api_api.apiSelectList({
        pageSize: 15
      });
      classifyList.value = res;
    };
    getClassifyList();
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸分类，精选壁纸",
        path: "pages/classify/classify"
      };
    });
    common_vendor.onShareTimeline((e) => {
      common_vendor.index.__f__("log", "at pages/classify/classify.vue:25", e);
      return {
        title: "壁纸分类，精选壁纸"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "分类"
        }),
        b: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "6bcfa975-1-" + i0,
            c: common_vendor.p({
              item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bcfa975"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classify/classify.js.map
