<script setup>
import {getStatusBarHight,getTitleHeight} from '../../utils/system.js'
defineProps({
	title:{
		type:String,
		default:"壁纸"
	}
})
const toSearch=()=>{
	uni.navigateTo({
		url:'/pages/search/search'
	})
}
</script>

<template>
	<view class="layout">
		<view class="nav">
			<view class="statusBar" :style="{height:getStatusBarHight()+'px'}"></view>
			<view class="content" :style="{height:getTitleHeight()+'px'}">
				<view class="title">{{title}}</view>
				<view class="search" @click="toSearch">
					<uni-icons type="search" size="23" color="#6a6a6a"></uni-icons>
					<view class="text">搜索</view>
				</view>
			</view>
		</view>
		<view class="fill" :style="`height:${getStatusBarHight()+getTitleHeight()}px`">

		</view>
	</view>
</template>

<style lang="scss" scoped>
	.layout {
		.nav {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background:
				linear-gradient(to bottom, transparent, #FFF 400rpx),
				linear-gradient(to right, #beecd8 20%, #f4e2d8),
			;

			.statusBar {}

			.content {
				display: flex;
				align-items: center;
				padding: 0 30rpx;

				.title {
					margin-right: 30rpx;
					font-size: 45rpx;
					font-weight: 600;
				}

				.search {
					display: flex;
					align-items: center;
					background-color: rgba(255, 255, 255, 0.4);
					height: 60rpx;
					width: 250rpx;
					border-radius: 60rpx;
					padding-left: 20rpx;

					.text {
						margin-left: 10rpx;
						color: #aaa;
					}
				}
			}
		}

		.fill {}
	}
</style>