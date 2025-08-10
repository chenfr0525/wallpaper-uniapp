<script setup>
	import {
		formatTimeDiff
	} from '../../utils/common.js'
	defineProps({
		isMore: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			default () {
				return {
					name: '默认主题',
					picurl: '/common/images/classify1.jpg',
					updateTime: Date.now() - 1000 * 60 * 60 * 10
				}
			}
		}
	})
</script>

<template>
	<view class="theme-item">
		<navigator :url="`/pages/classList/classList?classid=${item._id}&title=${item.name}`" class="box"
			v-if="!isMore">
			<image :src="item.picurl" mode="widthFix"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tap" v-if="formatTimeDiff(item.updateTime)">{{formatTimeDiff(item.updateTime)}}前更新</view>
		</navigator>


		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image src="/common/images/more.jpg" mode="widthFix"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#FFF"></uni-icons>
				<text>更多</text>
			</view>
		</navigator>
	</view>
</template>



<style lang="scss" scoped>
	.theme-item {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			image {
				height: 100%;
				width: 100%;
			}

			.mask {
				position: absolute;
				height: 70rpx;
				width: 100%;
				line-height: 70rpx;
				text-align: center;
				left: 0;
				bottom: 0;
				background-color: rgba(250, 250, 250, 0.2);
				backdrop-filter: blur(20px);
				color: #FFF;
				font-weight: 600;
				font-size: 30rpx;
			}

			.tap {
				padding: 6rpx 14rpx;
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(250, 129, 50, 0.7);
				backdrop-filter: blur(20rpx);
				border-radius: 0 0 20px 0;
				color: #FFF;
				font-size: 22rpx;
				transform: scale(0.8);
				transform-origin: top left;
			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				color: #FFF;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			text {
				font-size: 34rpx;
				font-weight: 400;
			}
		}
	}
</style>