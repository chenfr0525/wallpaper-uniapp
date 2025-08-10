<script setup>
	import {
		ref
	} from 'vue'
	import {
		apiBannerList,
		apiDayrecomList,
		apiNoticeList,
		apiSelectList
	} from '../../api/api.js'
	import {
		onShareAppMessage,
		onShareTimeline
	} from "@dcloudio/uni-app"

	const bannerList = ref([])
	const dayrecomList = ref([])
	const noticeList = ref([])
	const selectList = ref([])

	//获取banner数据
	const getBannerList = async () => {
		let res = await apiBannerList()
		bannerList.value = res
	}

	//获取每日推荐壁纸
	const getDayrecomList = async () => {
		let res = await apiDayrecomList()
		dayrecomList.value = res
	}


	//获取公告信息
	const getNoticeList = async () => {
		let res = await apiNoticeList({
			select: true,
		})
		noticeList.value = res
	}
	//获取主题推荐
	const getSelectList = async () => {
		let res = await apiSelectList({
			select: true
		})
		selectList.value = res
	}

	//跳转preview页面
	const goPreview = (id) => {
		uni.setStorageSync('theme-classify', dayrecomList.value)
		uni.navigateTo({
			url: `/pages/preview/preview?id=${id}`
		})
	}
	//分享给朋友
	onShareAppMessage((e) => {
		return {
			title: '咸虾米壁纸',
			path: 'pages/index/index'
		}
	})
	//分享朋友圈
	onShareTimeline((e) => {
		console.log(e)
		return {
			title: '咸虾米壁纸'
		}
	})

	getBannerList()
	getDayrecomList()
	getNoticeList()
	getSelectList()
</script>


<template>
	<view class="homeLayout pageBg">
		<custom-navbar title="推荐"></custom-navbar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#FFF" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target==='miniProgram'" class="nav" :url="item.url" :app-id="item.appid"
						target="miniProgram">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else class="nav"
						:url="'/pages/classList/classList?class'+item.url.replace('name','title')">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>

		<view class="notify">
			<view class="left">
				<uni-icons type="sound" size="26" color="#28b389"></uni-icons>
				<text>公告</text>
			</view>
			<view class="content">
				<swiper vertical autoplay circular duration="200" interval="1500">
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="`/pages/notice/detail?id=${item._id}`">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#28b389"></uni-icons>
			</view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in dayrecomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="heightFix"></image>

					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">
						<text>更多</text>
						<uni-icons type="right" size="16" color="#28b389"></uni-icons>
					</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in selectList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<style lang="scss" scoped>
	.homeLayout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 100%;
				height: 340rpx;

				&-item {
					height: 100%;
					width: 100%;
					padding: 0 30rpx;

					.nav {
						height: 100%;
						width: 100%;

						image {
							height: 100%;
							width: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
		}

		.notify {
			height: 80rpx;
			width: 700rpx;
			background-color: #f9f9f9;
			display: flex;
			align-items: center;
			margin: 0 auto;
			line-height: 80rpx;
			border-radius: 80rpx;
			padding: 0 15rpx;

			.left {
				width: 140rpx;
				display: flex;
				align-items: center;

				text {
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 26rpx;

				}
			}

			.content {
				flex: 1;
				height: 100%;

				swiper {
					height: 100%;

					swiper-item {
						font-size: 28rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.right {
				width: 70rpx;
			}
		}

		.select {
			padding-top: 50rpx;

			.date {
				color: $brand-theme-color;
			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;
						overflow: hidden;
						border-radius: 8rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.box:last-child {
						margin-right: 30rpx;
					}
				}
			}
		}
	}

	.theme {
		padding-top: 50rpx;

		.more {
			color: $brand-theme-color;
		}

		.content {
			margin-top: 30rpx;
			width: 100%;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>