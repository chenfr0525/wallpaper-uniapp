"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2 + _easycom_uni_load_more2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    common_vendor.onLoad((e) => {
      getDetail(e.id);
    });
    const detail = common_vendor.ref(null);
    const getDetail = async (id) => {
      let res = await api_api.apiGetNoticeDetail({
        id
      });
      detail.value = res;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value
      }, detail.value ? common_vendor.e({
        b: detail.value.select
      }, detail.value.select ? {
        c: common_vendor.p({
          text: "置顶",
          type: "error",
          inverted: true,
          size: "mini"
        })
      } : {}, {
        d: common_vendor.t(detail.value.title),
        e: common_vendor.t(detail.value.author),
        f: common_vendor.p({
          date: detail.value.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        g: common_vendor.p({
          content: detail.value.content
        }),
        h: common_vendor.t(detail.value.view_count)
      }) : {
        i: common_vendor.unref(utils_system.getTitleHeight)() + "px",
        j: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map
