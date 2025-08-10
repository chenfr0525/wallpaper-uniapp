<script setup>
	const props = defineProps({
		icon: {
			type: String,
			default: "chat"
		},
		url: {
			type: String,
		},
		title: {
			type: String
		},
		num: {
			type: Number,
			default: 0
		}
	})

	function onContact() {
		uni.makePhoneCall({
			phoneNumber: '114'
		})
	}
</script>

<template>
	<view class="section-item">
		<view class="row" v-if="title==='联系客服'">
			<view class="left">
				<uni-icons :type="icon" size="22" color="#28b389"></uni-icons>
				<text>{{title}}</text>
			</view>
			<view class="right">
				<view class="text" v-if="num">{{num}}</view>
				<uni-icons type="right" size="20" color="#aaa"></uni-icons>
			</view>
			<!-- 如果是小程序 -->
			<!-- #ifdef MP -->
			<button open-type="contact" v-if="title==='联系客服'">联系客服</button>
			<!-- #endif -->
			<!-- 如果不是小程序 -->
			<!-- #ifndef MP -->
			<button @click="onContact" v-if="title==='联系客服'">拨打电话</button>
			<!-- #endif -->
		</view>

		<navigator :url="url" v-else>
			<view class="row">
				<view class="left">
					<uni-icons :type="icon" size="22" color="#28b389"></uni-icons>
					<text>{{title}}</text>
				</view>
				<view class="right">
					<view class="text" v-if="num">{{num}}</view>
					<uni-icons type="right" size="20" color="#aaa"></uni-icons>
				</view>
			</view>
		</navigator>
	</view>
</template>

<style lang="scss" scoped>
	.section-item {
		.row {
			padding: 0 30rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #eee;
			position: relative;

			.left {
				display: flex;
				align-items: center;

				text {
					font-size: 35rpx;
					margin-left: 5rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.text {
					font-size: 30rpx;
					color: $text-font-color-1;
				}
			}

			button {
				height: 100%;
				width: 100%;
				position: absolute;
				left: 0;
				opacity: 0;
			}
		}
	}
</style>