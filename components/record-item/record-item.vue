<script setup>
	defineProps({
		title: {
			type: String,
		},
		icon: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Array,
			default: () => [],
		}
	})
	const emit = defineEmits(['deleteList', 'startSearch'])
	const deleteSearchList = () => {
		emit('deleteList')
	}
	const clickTab = (item) => {
		emit('startSearch', item)
	}
</script>

<template>
	<view class="layout">
		<view class="header">
			<view class="title">{{title}}</view>
			<view class="icon" v-if="icon" @click="deleteSearchList">
				<uni-icons type="trash" size="24" color="#6e6e6e"></uni-icons>
			</view>
		</view>
		<view class="content" v-if="list.length!==0">
			<view @click="clickTab(item?.name??item)" v-for="item in list" class="item">
				<text class="text">{{item?.name??item}}</text>
			</view>
		</view>
		<view class="nosearch" v-else>
			<uv-empty mode="search"></uv-empty>
		</view>

	</view>
</template>

<style lang="scss" scoped>
	.layout {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 35rpx;
				color: #999;
			}
		}

		.content {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			gap: 20rpx;
			flex-wrap: wrap;

			.item {
				padding: 5rpx 15rpx;
				border-radius: 30rpx;
				background-color: rgba(0, 0, 0, 0.05);
				max-width: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					font-size: 30rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>