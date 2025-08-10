import {
	request
} from '../utils/request.js'

export const apiBannerList = async () => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/homeBanner'
	})
	return res
}

export const apiDayrecomList = async () => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/randomWall'
	})
	return res
}

export const apiNoticeList = async (data) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/wallNewsList',
		data
	})
	return res
}

export const apiSelectList = async (data = {}) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/classify',
		data
	})
	return res
}

export const apiclassifyItem = async (data) => {
	let res
	if (data.type === 'score' || data.type === 'download') {
		res = await request({
			url: 'https://tea.qingnian8.com/api/bizhi/userWallList',
			data
		})
	} else {
		res = await request({
			url: 'https://tea.qingnian8.com/api/bizhi/wallList',
			data

		})
	}
	return res
}

export const apiSetupScore = async (data = {}) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/setupScore',
		data
	})

	return res
}

export const apiWriteDownload = async (data = {}) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/downloadWall',
		data
	})
	return res
}

export const apiDetailWall = async (data = {}) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/detailWall',
		data
	})
	return res
}

export const apiGetUserInfo = async (data = {}) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/userInfo',
		data
	})
	return res
}

export const apiGetNoticeDetail = async (data = {}) => {
	const res = await request({
		url: 'https://tea.qingnian8.com/api/bizhi/wallNewsDetail',
		data
	})
	return res
}

export const apiSearchWall = async (data = {}) => {
	const res = await request(({
		url: 'https://tea.qingnian8.com/api/bizhi/searchWall',
		data
	}))
	return res
}