<template>
	<view class="layout" v-if="detail">
		<view class="title">
			<view class="tag" v-if="detail.select">
				<uni-tag text="置顶" type="error" inverted size="mini"></uni-tag>
			</view>
			<view class="titleContent">{{detail.title}}</view>
		</view>
		<view class="info">
			<view class="item">作者：{{detail.author}}</view>
			<view class="item">
				<uni-dateformat :date="detail.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>
		<view class="content">
			<mp-html :content="detail.content" />
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
		</view>
		<view class="count">
			阅读量 {{detail.view_count}}
		</view>
	</view>
	<view class="loadingLayout" v-else>
		<view :style="{height:getTitleHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {
		getTitleHeight
	} from '@/utils/system.js'
	import {
		ref
	} from 'vue'
	import {
		apiGetNoticeDetail
	} from '@/api/api.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	onLoad((e) => {
		getDetail(e.id)
	})
	//获取通知信息
	const detail = ref(null)
	const getDetail = async (id) => {
		let res = await apiGetNoticeDetail({
			id
		})
		detail.value = res
	}
</script>

<style lang="scss">
	.layout {
		width: 100%;
		padding: 10rpx 30rpx;

		.title {
			display: flex;
			margin-bottom: 30rpx;

			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}

			.titleContent {
				font-size: 40rpx;
				line-height: 1.6em;
			}
		}

		.info {
			display: flex;
			font-size: 30rpx;
			color: #999;

			.item {
				margin-right: 30rpx;
			}
		}

		.content {
			padding: 50rpx 0;
		}

		.count {
			font-size: 28rpx;
			color: #999;
		}
	}

	.loadingLayout {
		padding: 30rpx 0;
	}
</style>