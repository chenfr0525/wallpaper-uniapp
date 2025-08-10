"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_record_item2 = common_vendor.resolveComponent("record-item");
  const _easycom_load2 = common_vendor.resolveComponent("load");
  (_easycom_uni_search_bar2 + _easycom_record_item2 + _easycom_load2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_record_item = () => "../../components/record-item/record-item.js";
const _easycom_load = () => "../../components/load/load.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_record_item + _easycom_load)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const selectList = common_vendor.ref([]);
    const isSearch = common_vendor.ref(true);
    const historySearch = common_vendor.ref(common_vendor.index.getStorageSync("wall-historySearch") || []);
    const list = common_vendor.ref([]);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
    });
    const getSelectList = async () => {
      let res = await api_api.apiSelectList({
        select: true
      });
      selectList.value = res;
    };
    const search = async (item) => {
      queryParams.value.keyword = item || queryParams.value.keyword;
      historySearch.value = [.../* @__PURE__ */ new Set([queryParams.value.keyword, ...historySearch.value])];
      common_vendor.index.setStorageSync("wall-historySearch", historySearch.value);
      getClassifyItem();
    };
    const deleteList = () => {
      common_vendor.index.setStorageSync("wall-historySearch", []);
      historySearch.value = common_vendor.index.getStorageSync("wall-historySearch");
    };
    const isNoData = common_vendor.ref(false);
    const getClassifyItem = async () => {
      let res = await api_api.apiSearchWall({
        ...queryParams.value
      });
      list.value.push(...res);
      common_vendor.index.setStorageSync("theme-classify", list.value);
      if (queryParams.value.pageSize > res.length)
        isNoData.value = true;
      isSearch.value = false;
    };
    common_vendor.onReachBottom(() => {
      if (isNoData.value)
        return;
      queryParams.value.pageNum++;
      getClassifyItem();
    });
    const reSearch = () => {
      queryParams.value.pageNum = 1;
      isNoData.value = false;
      isSearch.value = true;
      list.value = [];
    };
    getSelectList();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => search(queryParams.value.keyword)),
        b: common_vendor.o(($event) => queryParams.value.keyword = $event),
        c: common_vendor.p({
          focus: true,
          modelValue: queryParams.value.keyword
        }),
        d: common_vendor.o(reSearch),
        e: isSearch.value
      }, isSearch.value ? {
        f: common_vendor.o(search),
        g: common_vendor.o(deleteList),
        h: common_vendor.p({
          title: "最近搜索",
          list: historySearch.value,
          icon: historySearch.value.length !== 0 ? true : false
        }),
        i: common_vendor.o(search),
        j: common_vendor.p({
          title: "热门搜索",
          list: selectList.value
        })
      } : common_vendor.e({
        k: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        l: isNoData.value
      }, isNoData.value ? {
        m: common_vendor.p({
          type: "noMore"
        })
      } : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
