"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_load2 = common_vendor.resolveComponent("load");
  _easycom_load2();
}
const _easycom_load = () => "../../components/load/load.js";
if (!Math) {
  _easycom_load();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    const isLoading = common_vendor.ref(true);
    const list = common_vendor.ref([]);
    const isNoData = common_vendor.ref(false);
    const queryparams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12
    });
    const getClassifyItem = async () => {
      let res = await api_api.apiclassifyItem(queryparams.value);
      list.value.push(...res);
      common_vendor.index.setStorageSync("theme-classify", list.value);
      isLoading.value = false;
      if (queryparams.value.pageSize > res.length)
        isNoData.value = true;
    };
    const title = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      if (options.type)
        queryparams.value.type = options.type;
      if (options.classid)
        queryparams.value.classid = options.classid;
      title.value = options.title;
      common_vendor.index.setNavigationBarTitle({
        title: options.title
      });
      getClassifyItem();
    });
    common_vendor.onReachBottom(() => {
      if (isNoData.value)
        return;
      queryparams.value.pageNum++;
      getClassifyItem();
    });
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸分类" + title.value,
        path: `pages/classList/classList?classid=${queryparams.value.classid}&name=${title.value}`
      };
    });
    common_vendor.onShareTimeline((e) => {
      common_vendor.index.__f__("log", "at pages/classList/classList.vue:59", e);
      return {
        title: "壁纸分类" + title.value,
        query: `classid=${queryparams.value.classid}&name=${title.value}`
      };
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("theme-classify");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {
        b: common_vendor.p({
          type: "loading"
        })
      } : {
        c: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        })
      }, {
        d: isNoData.value
      }, isNoData.value ? {
        e: common_vendor.p({
          type: "noMore"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classList/classList.js.map
