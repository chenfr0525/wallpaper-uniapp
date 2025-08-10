<script setup>
	import {
		ref
	} from 'vue'
	import {
		goToHome
	} from '@/utils/common.js'
	import {
		onLoad,
		onReachBottom,
		onUnload
	} from '@dcloudio/uni-app';
	import {
		apiclassifyItem
	} from '../../api/api.js'
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	const isLoading = ref(true)
	const list = ref([])
	const isNoData = ref(false)
	const queryparams = ref({
		pageNum: 1,
		pageSize: 12
	})
	const getClassifyItem = async () => {
		let res = await apiclassifyItem(queryparams.value)
		list.value.push(...res)
		uni.setStorageSync('theme-classify', list.value)
		isLoading.value = false
		if (queryparams.value.pageSize > res.length) isNoData.value = true
	}
	const title = ref(null)
	onLoad((options) => {
		if (options.type) queryparams.value.type = options.type
		if (options.classid) queryparams.value.classid = options.classid
		title.value = options.title
		uni.setNavigationBarTitle({
			title: options.title
		})
		getClassifyItem()
	})
	//触底时继续加载
	onReachBottom(() => {
		if (isNoData.value) return
		queryparams.value.pageNum++
		getClassifyItem()
	})
	//分享给朋友
	onShareAppMessage((e) => {
		return {
			title: '壁纸分类' + title.value,
			path: `pages/classList/classList?classid=${queryparams.value.classid}&name=${title.value}`
		}
	})
	//分享朋友圈
	onShareTimeline((e) => {
		console.log(e)
		return {
			title: '壁纸分类' + title.value,
			query: `classid=${queryparams.value.classid}&name=${title.value}`
		}
	})
	//退出页面
	onUnload(() => {
		uni.removeStorageSync('theme-classify')
	})
</script>

<template>
	<view class="classList">
		<load type="loading" v-if="isLoading"></load>
		<view class="content" v-else>
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in list" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>

		</view>
		<load type="noMore" v-if="isNoData"></load>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<style lang="scss" scoped>
	.classList {
		.content {
			display: grid;
			padding: 0 15rpx;
			grid-template-columns: repeat(3, 1fr);
			gap: 15rpx;

			.item {
				height: 400rpx;

				image {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
</style>