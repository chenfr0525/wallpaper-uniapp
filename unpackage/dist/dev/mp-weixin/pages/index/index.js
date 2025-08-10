"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_custom_navbar2 = common_vendor.resolveComponent("custom-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_navbar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_navbar = () => "../../components/custom-navbar/custom-navbar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_navbar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const dayrecomList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const selectList = common_vendor.ref([]);
    const getBannerList = async () => {
      let res = await api_api.apiBannerList();
      bannerList.value = res;
    };
    const getDayrecomList = async () => {
      let res = await api_api.apiDayrecomList();
      dayrecomList.value = res;
    };
    const getNoticeList = async () => {
      let res = await api_api.apiNoticeList({
        select: true
      });
      noticeList.value = res;
    };
    const getSelectList = async () => {
      let res = await api_api.apiSelectList({
        select: true
      });
      selectList.value = res;
    };
    const goPreview = (id) => {
      common_vendor.index.setStorageSync("theme-classify", dayrecomList.value);
      common_vendor.index.navigateTo({
        url: `/pages/preview/preview?id=${id}`
      });
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "咸虾米壁纸",
        path: "pages/index/index"
      };
    });
    common_vendor.onShareTimeline((e) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:65", e);
      return {
        title: "咸虾米壁纸"
      };
    });
    getBannerList();
    getDayrecomList();
    getNoticeList();
    getSelectList();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.target === "miniProgram"
          }, item.target === "miniProgram" ? {
            b: item.picurl,
            c: item.url,
            d: item.appid
          } : {
            e: item.picurl,
            f: "/pages/classList/classList?class" + item.url.replace("name", "title")
          }, {
            g: item._id
          });
        }),
        c: common_vendor.p({
          type: "sound",
          size: "26",
          color: "#28b389"
        }),
        d: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: `/pages/notice/detail?id=${item._id}`,
            c: item._id
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "16",
          color: "#28b389"
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "18",
          color: "#28b389"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        h: common_vendor.f(dayrecomList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item._id), item._id)
          };
        }),
        i: common_vendor.p({
          type: "right",
          size: "16",
          color: "#28b389"
        }),
        j: common_vendor.f(selectList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-8-" + i0,
            c: common_vendor.p({
              item
            })
          };
        }),
        k: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
