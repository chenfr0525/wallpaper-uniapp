"use strict";
const utils_request = require("../utils/request.js");
const apiBannerList = async () => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/homeBanner"
  });
  return res;
};
const apiDayrecomList = async () => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/randomWall"
  });
  return res;
};
const apiNoticeList = async (data) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/wallNewsList",
    data
  });
  return res;
};
const apiSelectList = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/classify",
    data
  });
  return res;
};
const apiclassifyItem = async (data) => {
  let res;
  if (data.type === "score" || data.type === "download") {
    res = await utils_request.request({
      url: "https://tea.qingnian8.com/api/bizhi/userWallList",
      data
    });
  } else {
    res = await utils_request.request({
      url: "https://tea.qingnian8.com/api/bizhi/wallList",
      data
    });
  }
  return res;
};
const apiSetupScore = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/setupScore",
    data
  });
  return res;
};
const apiWriteDownload = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/downloadWall",
    data
  });
  return res;
};
const apiDetailWall = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/detailWall",
    data
  });
  return res;
};
const apiGetUserInfo = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/userInfo",
    data
  });
  return res;
};
const apiGetNoticeDetail = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/wallNewsDetail",
    data
  });
  return res;
};
const apiSearchWall = async (data = {}) => {
  const res = await utils_request.request({
    url: "https://tea.qingnian8.com/api/bizhi/searchWall",
    data
  });
  return res;
};
exports.apiBannerList = apiBannerList;
exports.apiDayrecomList = apiDayrecomList;
exports.apiDetailWall = apiDetailWall;
exports.apiGetNoticeDetail = apiGetNoticeDetail;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiNoticeList = apiNoticeList;
exports.apiSearchWall = apiSearchWall;
exports.apiSelectList = apiSelectList;
exports.apiSetupScore = apiSetupScore;
exports.apiWriteDownload = apiWriteDownload;
exports.apiclassifyItem = apiclassifyItem;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/api.js.map
