<script setup>
defineProps({
	type:{
		type:String,
		default:'no-more'
	}
})
</script>


<template>
	<view class="layout">
		<uni-load-more :status="type"></uni-load-more>
	</view>
</template>

<style lang="scss" scoped>
.layout {
	padding:30rpx 0;
}
</style>