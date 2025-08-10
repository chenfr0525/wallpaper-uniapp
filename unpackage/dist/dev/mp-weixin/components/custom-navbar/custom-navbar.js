"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "custom-navbar",
  props: {
    title: {
      type: String,
      default: "壁纸"
    }
  },
  setup(__props) {
    const toSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(utils_system.getStatusBarHight)() + "px",
        b: common_vendor.t(__props.title),
        c: common_vendor.p({
          type: "search",
          size: "23",
          color: "#6a6a6a"
        }),
        d: common_vendor.o(toSearch),
        e: common_vendor.unref(utils_system.getTitleHeight)() + "px",
        f: common_vendor.s(`height:${common_vendor.unref(utils_system.getStatusBarHight)() + common_vendor.unref(utils_system.getTitleHeight)()}px`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-94e9cc56"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-navbar/custom-navbar.js.map
