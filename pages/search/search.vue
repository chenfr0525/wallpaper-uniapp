<script setup>
	import {
		ref
	} from 'vue'
	import {
		apiSelectList,
		apiSearchWall
	} from '../../api/api.js'
	import {
		onReachBottom
	} from '@dcloudio/uni-app'
	const selectList = ref([])
	const isSearch = ref(true)
	//历史搜索
	const historySearch = ref(uni.getStorageSync('wall-historySearch') || [])
	const list = ref([])
	//查询参数
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})
	//获取主题推荐
	const getSelectList = async () => {
		let res = await apiSelectList({
			select: true
		})
		selectList.value = res
	}

	//搜索跳转
	const search = async (item) => {
		queryParams.value.keyword = item || queryParams.value.keyword
		historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])]
		uni.setStorageSync('wall-historySearch', historySearch.value)

		getClassifyItem()
	}
	//清理缓存
	const deleteList = () => {
		uni.setStorageSync("wall-historySearch", [])
		historySearch.value = uni.getStorageSync('wall-historySearch')
	}
	//是否存在数据
	const isNoData = ref(false)
	const getClassifyItem = async () => {
		let res = await apiSearchWall({
			...queryParams.value,
		})
		list.value.push(...res)
		uni.setStorageSync('theme-classify', list.value)
		if (queryParams.value.pageSize > res.length) isNoData.value = true
		isSearch.value = false
	}
	//触底时继续加载
	onReachBottom(() => {
		if (isNoData.value) return
		queryParams.value.pageNum++
		getClassifyItem()
	})

	//重新搜索
	const reSearch = () => {
		queryParams.value.pageNum = 1
		isNoData.value = false;
		isSearch.value = true;
		list.value = []
	}

	getSelectList()
</script>

<template>
	<view class="searchLayout">
		<view class="input" @click="reSearch">
			<uni-search-bar @confirm="search(queryParams.keyword)" :focus="true" v-model="queryParams.keyword">
			</uni-search-bar>
		</view>
		<view class="record" v-if="isSearch">
			<record-item @startSearch="search" title="最近搜索" :list="historySearch"
				:icon="historySearch.length!==0?true:false" @deleteList="deleteList"></record-item>
			<record-item @startSearch="search" title="热门搜索" :list="selectList"></record-item>
		</view>
		<view class="classList" v-else>
			<view class="content">
				<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in list"
					:key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>

			</view>
			<load type="noMore" v-if="isNoData"></load>
			<view class="safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.searchLayout {
		padding: 20rpx 30rpx;

		.record {
			padding-top: 40rpx;
		}

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
	}
</style>