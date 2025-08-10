

<script setup>
	import {ref} from 'vue'
	import {apiSelectList} from '../../api/api.js'
	import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
	const classifyList=ref([])
	//获取主题分类信息
	const getClassifyList=async()=>{
		let res = await apiSelectList({
			pageSize:15
		})
		classifyList.value=res
	}
	getClassifyList()
	//分享给朋友
	onShareAppMessage((e) => {
		return {
			title: '壁纸分类，精选壁纸',
			path: 'pages/classify/classify'
		}
	})
	//分享朋友圈
	onShareTimeline((e)=>{
		console.log(e)
		return {
			title: '壁纸分类，精选壁纸'
		}
	})
</script>

<template>
	<view class="layout pageBg">
		<custom-navbar title="分类"></custom-navbar>
		<view class="classify ">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<style lang="scss" scoped>
	 .classify{
		 padding:30rpx;
		 display: grid;
		 grid-template-columns: repeat(3,1fr);
		 gap:15rpx;
	 }      
</style>
