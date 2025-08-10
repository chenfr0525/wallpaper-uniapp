"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const infopop = common_vendor.ref();
    const scorepop = common_vendor.ref();
    const star = common_vendor.ref(0);
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_api.apiSetupScore({
        classid,
        wallId,
        userScore: star.value
      });
      common_vendor.index.hideLoading();
      if (res.id) {
        common_vendor.index.showToast({
          title: "评分成功！",
          icon: "none"
        });
      }
      classList.value[currentIndex.value].userScore = star.value;
      common_vendor.index.setStorageSync("theme-classify", classList.value);
      scoreClose();
    };
    function scoreClose() {
      star.value = 0;
      scorepop.value.close();
    }
    function open() {
      infopop.value.open();
    }
    const maskStatue = common_vendor.ref(true);
    function maskChange() {
      maskStatue.value = !maskStatue.value;
    }
    const goback = () => {
      common_vendor.index.navigateBack(
        {
          success() {
          },
          fail() {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
        }
      );
    };
    const storageInfo = common_vendor.index.getStorageSync("theme-classify");
    const classList = common_vendor.computed(() => {
      return storageInfo.map((item) => {
        return {
          ...item,
          picUrl: item.smallPicurl.replace("_small.webp", ".jpg")
        };
      });
    });
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(null);
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (e.type === "share") {
        let res = await api_api.apiDetailWall({
          id: e.id
        });
        classList.value = res.map((item) => {
          return {
            ...item,
            picUrl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = classList.value.findIndex((item) => item._id === currentId.value);
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const readImg = common_vendor.ref([]);
    common_vendor.watch(() => currentIndex.value, () => {
      readImg.value.push(...[
        currentIndex.value === 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value === classList.value.length - 1 ? 0 : currentIndex.value + 1
      ]);
      readImg.value = [...new Set(readImg.value)];
    });
    const currentInfo = common_vendor.computed(() => {
      return classList.value[currentIndex.value];
    });
    const downloadImg = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中..."
        });
        let {
          classid,
          _id: wallId
        } = currentInfo.value;
        let res = await api_api.apiWriteDownload({
          classid,
          wallId
        });
        if (res.errCode !== 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picUrl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (res3) => {
                common_vendor.index.showToast({
                  title: "下载成功"
                });
              }
            });
          },
          fail(e) {
            if (err.errMsg === "saveImageToPhotoAlbum:fail cancel") {
              common_vendor.index.showToast({
                title: "保存失败，请重新点击下载",
                icon: "none"
              });
              return;
            }
            common_vendor.index.showModal({
              title: "提示",
              content: "需要授权保存壁纸",
              success: (res2) => {
                if (res2.confirm) {
                  common_vendor.index.openSetting({
                    success: (setting) => {
                      if (setting.authSetting["scope.writePhotosAlbum"]) {
                        common_vendor.index.showToast({
                          title: "获取授权成功",
                          icon: "none"
                        });
                      } else {
                        common_vendor.index.showToast({
                          title: "获取授权失败",
                          icon: "none"
                        });
                      }
                    }
                  });
                }
              }
            });
          },
          complete() {
            common_vendor.index.hideLoading();
          }
        });
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/preview/preview.vue:203", e);
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸详情",
        path: `pages/preview/preview?id=${currentId.value}&type=share`
      };
    });
    common_vendor.onShareTimeline((e) => {
      common_vendor.index.__f__("log", "at pages/preview/preview.vue:217", e);
      return {
        title: "壁纸详情",
        query: `id=${currentId.value}&type=share`
      };
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImg.value.includes(index)
          }, readImg.value.includes(index) ? {
            b: common_vendor.o(maskChange, index),
            c: item.picUrl
          } : {}, {
            d: index
          });
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange),
        d: common_vendor.p({
          type: "left",
          size: "26",
          color: "#FFF"
        }),
        e: common_vendor.o(goback),
        f: common_vendor.unref(utils_system.getStatusBarHight)() + "px",
        g: common_vendor.t(currentIndex.value + 1),
        h: common_vendor.t(classList.value.length),
        i: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        j: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        k: common_vendor.p({
          type: "info",
          size: "28"
        }),
        l: common_vendor.o(open),
        m: common_vendor.p({
          type: "star",
          size: "28"
        }),
        n: common_vendor.o(($event) => scorepop.value.open()),
        o: common_vendor.p({
          type: "download",
          size: "28"
        }),
        p: common_vendor.o(downloadImg),
        q: maskStatue.value,
        r: common_vendor.o(($event) => infopop.value.close()),
        s: common_vendor.p({
          type: "closeempty",
          size: "20",
          color: "#aaa"
        }),
        t: common_vendor.t((_a = currentInfo.value) == null ? void 0 : _a._id),
        v: common_vendor.t((_b = currentInfo.value) == null ? void 0 : _b.nickname),
        w: common_vendor.p({
          size: "20",
          value: (_c = currentInfo.value) == null ? void 0 : _c.score,
          readonly: true
        }),
        x: common_vendor.t((_d = currentInfo.value) == null ? void 0 : _d.score),
        y: common_vendor.t((_e = currentInfo.value) == null ? void 0 : _e.description),
        z: common_vendor.f((_f = currentInfo.value) == null ? void 0 : _f.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab
          };
        }),
        A: common_vendor.sr(infopop, "2dad6c07-6", {
          "k": "infopop"
        }),
        B: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#FFF",
          borderRadius: "40rpx 40rpx 0 0",
          ["safe-area"]: false
        }),
        C: common_vendor.t(((_g = classList.value[currentIndex.value]) == null ? void 0 : _g.userScore) ? "已经评分过了~" : "评分信息"),
        D: common_vendor.o(scoreClose),
        E: common_vendor.p({
          type: "closeempty",
          size: "20",
          color: "#aaa"
        }),
        F: classList.value[currentIndex.value].userScore
      }, classList.value[currentIndex.value].userScore ? {
        G: common_vendor.o(($event) => classList.value[currentIndex.value].userScore = $event),
        H: common_vendor.p({
          size: "28",
          allowHalf: true,
          modelValue: classList.value[currentIndex.value].userScore
        }),
        I: common_vendor.t(classList.value[currentIndex.value].userScore)
      } : {
        J: common_vendor.o(($event) => star.value = $event),
        K: common_vendor.p({
          size: "28",
          disabled: classList.value[currentIndex.value].userScore ? true : false,
          ["disabled-color"]: "#FFCA3E",
          allowHalf: true,
          modelValue: star.value
        }),
        L: common_vendor.t(star.value)
      }, {
        M: common_vendor.o(submitScore),
        N: !star.value || classList.value[currentIndex.value].userScore,
        O: common_vendor.sr(scorepop, "2dad6c07-9", {
          "k": "scorepop"
        }),
        P: common_vendor.p({
          type: "center",
          ["background-color"]: "#FFF",
          borderRadius: "40rpx",
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map
