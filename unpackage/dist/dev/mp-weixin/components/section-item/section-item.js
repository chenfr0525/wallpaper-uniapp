"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "section-item",
  props: {
    icon: {
      type: String,
      default: "chat"
    },
    url: {
      type: String
    },
    title: {
      type: String
    },
    num: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.title === "联系客服"
      }, __props.title === "联系客服" ? common_vendor.e({
        b: common_vendor.p({
          type: __props.icon,
          size: "22",
          color: "#28b389"
        }),
        c: common_vendor.t(__props.title),
        d: __props.num
      }, __props.num ? {
        e: common_vendor.t(__props.num)
      } : {}, {
        f: common_vendor.p({
          type: "right",
          size: "20",
          color: "#aaa"
        }),
        g: __props.title === "联系客服"
      }, __props.title === "联系客服" ? {} : {}) : common_vendor.e({
        h: common_vendor.p({
          type: __props.icon,
          size: "22",
          color: "#28b389"
        }),
        i: common_vendor.t(__props.title),
        j: __props.num
      }, __props.num ? {
        k: common_vendor.t(__props.num)
      } : {}, {
        l: common_vendor.p({
          type: "right",
          size: "20",
          color: "#aaa"
        }),
        m: __props.url
      }));
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-402c3015"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/section-item/section-item.js.map
