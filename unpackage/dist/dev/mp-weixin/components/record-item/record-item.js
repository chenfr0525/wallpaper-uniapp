"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  (_easycom_uni_icons2 + _easycom_uv_empty2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uv_empty)();
}
const _sfc_main = {
  __name: "record-item",
  props: {
    title: {
      type: String
    },
    icon: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ["deleteList", "startSearch"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const deleteSearchList = () => {
      emit("deleteList");
    };
    const clickTab = (item) => {
      emit("startSearch", item);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.title),
        b: __props.icon
      }, __props.icon ? {
        c: common_vendor.p({
          type: "trash",
          size: "24",
          color: "#6e6e6e"
        }),
        d: common_vendor.o(deleteSearchList)
      } : {}, {
        e: __props.list.length !== 0
      }, __props.list.length !== 0 ? {
        f: common_vendor.f(__props.list, (item, k0, i0) => {
          return {
            a: common_vendor.t((item == null ? void 0 : item.name) ?? item),
            b: common_vendor.o(($event) => clickTab((item == null ? void 0 : item.name) ?? item))
          };
        })
      } : {
        g: common_vendor.p({
          mode: "search"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-49f3b467"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/record-item/record-item.js.map
