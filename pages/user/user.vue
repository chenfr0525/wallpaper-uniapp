<script setup>
	import {
		computed,
		ref
	} from 'vue'
	import {
		getTitleHeight
	} from '@/utils/system.js'
	import {
		apiGetUserInfo
	} from '@/api/api.js'
	const sectionList2 = [{
			title: '订阅更新',
			icon: 'notification-filled',
			num: 0,
			url: ''
		},
		{
			title: '常见问题',
			icon: 'flag-filled',
			num: 0,
			url: ''
		},
	]
	//用户信息
	const userInfo = ref(null)
	const getUserInfo = async () => {
		let res = await apiGetUserInfo()
		userInfo.value = res
	}
	getUserInfo()
</script>

<template>
	<view class="userLayout pageBg" v-if="userInfo">
		<view :style="{height:getTitleHeight()+'px'}"></view>
		<view class="userInfo">
			<view class="avatar">
				<image src="/common/images/avatar.jpg" mode="aspectFill"></image>
			</view>
			<view class="nickname">{{userInfo.IP}}</view>
			<view class="address">来自:{{userInfo.address.city||userInfo.address.province||userInfo.address.country}}
			</view>
		</view>
		<view class="section">
			<section-item title="我的下载" icon="download-filled" url="/pages/classList/classList?title=我的下载&type=download"
				:num="userInfo.downloadSize"></section-item>
			<section-item title="我的评分" icon="star-filled" url="/pages/classList/classList?title=我的评分&type=score"
				:num="userInfo.scoreSize"></section-item>
			<section-item title="联系客服" icon="chatboxes-filled" url=""></section-item>
		</view>
		<view class="section">
			<section-item title="订阅更新" icon="notification-filled"
				url="/pages/notice/detail?id=65361e318b0da4ca084e3ce0"></section-item>
			<section-item title="常见问题" icon="flag-filled"
				url="/pages/notice/detail?id=6536358ce0ec19c8d67fbe82"></section-item>
		</view>
	</view>
	<view class="loadingLayout" v-else>
		<view :style="{height:getTitleHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<style lang="scss" scoped>
	.userLayout {

		.userInfo {
			padding: 50rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.nickname {
				padding: 25rpx 0;
				font-size: 46rpx;
			}

			.address {
				color: #666;
			}
		}

		.section {
			margin: 50rpx auto;
			width: 690rpx;
			border: 1px solid #eee;
			border-radius: 15rpx;
			box-shadow: 0 0 25rpx rgba(0, 0, 0, 0.05);
		}
	}

	.loadingLayout {
		padding: 30rpx 0;
	}
</style>