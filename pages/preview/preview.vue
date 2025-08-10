<script setup>
	import {
		computed,
		ref,
		watch
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getStatusBarHight
	} from '../../utils/system.js'
	import {
		apiSetupScore,
		apiWriteDownload,
		apiDetailWall
	} from '@/api/api.js'
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	//弹出层
	const infopop = ref()
	const scorepop = ref()
	//评分
	const star = ref(0)
	//提交评分
	const submitScore = async () => {
		uni.showLoading({
			title: '加载中...'
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value
		let res = await apiSetupScore({
			classid,
			wallId,
			userScore: star.value
		})
		uni.hideLoading()
		if (res.id) {
			uni.showToast({
				title: '评分成功！',
				icon: 'none'
			})
		}
		classList.value[currentIndex.value].userScore = star.value
		uni.setStorageSync('theme-classify', classList.value)
		scoreClose()
	}
	//关闭评分弹窗
	function scoreClose() {
		star.value = 0
		scorepop.value.close()
	}

	function open() {
		infopop.value.open()
	}
	//遮罩层
	const maskStatue = ref(true)

	function maskChange() {
		maskStatue.value = !maskStatue.value
	}
	//返回上一页
	const goback = () => {
		uni.navigateBack({
			success() {
				
			},
			fail() {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
		 )
	}
	//获取壁纸信息
	const storageInfo = uni.getStorageSync('theme-classify')
	const classList = computed(() => {
		return storageInfo.map((item) => {
			return {
				...item,
				picUrl: item.smallPicurl.replace('_small.webp', '.jpg')
			}
		})
	})
	//壁纸索引
	const currentId = ref(null)
	const currentIndex = ref(null)

	onLoad(async (e) => {
		currentId.value = e.id
		if (e.type === 'share') {
			let res = await apiDetailWall({
				id: e.id
			})
			classList.value = res.map(item => {
				return {
					...item,
					picUrl: item.smallPicurl.replace('_small.webp', '.jpg')
				}
			})
		}
		currentIndex.value = classList.value.findIndex(item => item._id === currentId.value)
	})
	const swiperChange = (e) => {
		currentIndex.value = e.detail.current
	}
	// 加载部分图片
	const readImg = ref([])
	watch(() => currentIndex.value, () => {
		readImg.value.push(...[
			currentIndex.value === 0 ? classList.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value === classList.value.length - 1 ? 0 : currentIndex.value + 1
		])
		readImg.value = [...new Set(readImg.value)]
	})
	//当前壁纸信息
	const currentInfo = computed(() => {
		return classList.value[currentIndex.value]
	})
	//下载壁纸
	const downloadImg = async () => {
		// #ifdef H5
		uni.showModal({
			content: "请长按保存壁纸",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				title: '下载中...'
			})
			let {
				classid,
				_id: wallId
			} = currentInfo.value
			let res = await apiWriteDownload({
				classid,
				wallId
			})
			if (res.errCode !== 0) throw res

			uni.getImageInfo({
				src: currentInfo.value.picUrl,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: (res) => {
							uni.showToast({
								title: '下载成功'
							})
						},
					})
				},
				fail(e) {
					if (err.errMsg === 'saveImageToPhotoAlbum:fail cancel') {
						uni.showToast({
							title: '保存失败，请重新点击下载',
							icon: "none"
						})
						return
					}
					uni.showModal({
						title: '提示',
						content: "需要授权保存壁纸",
						success: (res) => {
							if (res.confirm) {
								uni.openSetting({
									success: (setting) => {
										if (setting.authSetting[
												'scope.writePhotosAlbum'
											]) {
											uni.showToast({
												title: "获取授权成功",
												icon: "none"
											})
										} else {
											uni.showToast({
												title: "获取授权失败",
												icon: 'none'
											})
										}
									}
								})
							}
						}
					})
				},
				complete() {
					uni.hideLoading()
				}
			})
		} catch (e) {
			uni.hideLoading()
			console.log(e)
		}
		// #endif
	}

	//分享给朋友
	onShareAppMessage((e) => {
		return {
			title: '壁纸详情',
			path: `pages/preview/preview?id=${currentId.value}&type=share`
		}
	})
	//分享朋友圈
	onShareTimeline((e) => {
		console.log(e)
		return {
			title: '壁纸详情',
			query: `id=${currentId.value}&type=share`
		}
	})
	
	
</script>

<template>
	<view class="preview">
		<swiper :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="index">
				<image v-if="readImg.includes(index)" @click="maskChange" :src="item.picUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskStatue">
			<view class="goback" @click="goback" :style="{top:getStatusBarHight()+'px'}">
				<uni-icons type="left" size="26" color="#FFF"></uni-icons>
			</view>
			<view class="count">{{currentIndex+1}} / {{classList.length}}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="open">
					<uni-icons type="info" size="28"></uni-icons>
					<text>信息</text>
				</view>
				<view class="box" @click="scorepop.open()">
					<uni-icons type="star" size="28"></uni-icons>
					<text>评分</text>
				</view>
				<view class="box" @click="downloadImg">
					<uni-icons type="download" size="28"></uni-icons>
					<text>下载</text>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="infopop" type="bottom" background-color="#FFF" borderRadius="40rpx 40rpx 0 0"
			:safe-area="false">
			<view class="infopop">
				<view class="popheader">
					<view></view>
					<text>壁纸信息</text>
					<uni-icons @click="infopop.close()" class="close" type="closeempty" size="20"
						color="#aaa"></uni-icons>
				</view>
				<scroll-view scroll-y class="content">
					<view class="row">
						<view class="label">壁纸ID：</view>
						<text class="value" user-select>{{currentInfo?._id}}</text>
					</view>
					<!-- <view class="row">
						<view class="label">分类：</view>
						<view class="value class">明星美女</view>
					</view> -->
					<view class="row">
						<view class="label">发布者：</view>
						<view class="value">{{currentInfo?.nickname}}</view>
					</view>
					<view class="row">
						<view class="label">评分：</view>
						<view class="value rate">
							<uni-rate size="20" :value="currentInfo?.score" readonly />
							<text>{{currentInfo?.score}}分</text>
						</view>
					</view>
					<view class="row">
						<view class="label">摘要：</view>
						<view class="value">{{currentInfo?.description}}</view>
					</view>
					<view class="row">
						<view class="label">标签：</view>
						<view class="value tabs">
							<view class="tab" v-for="tab in currentInfo?.tabs" :key="tab">{{tab}}</view>
						</view>
					</view>
					<view class="copyright">
						声明：本图片来自于用户投稿，非商业使用，用于免费学习交流，如侵犯您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护你的权益。
					</view>
					<view class="safe-area-inset-bottom"></view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorepop" type="center" background-color="#FFF" borderRadius="40rpx" :is-mask-click="false">
			<view class="scorepop">
				<view class="popheader">
					<view></view>
					<text>{{classList[currentIndex]?.userScore?'已经评分过了~':'评分信息'}}</text>
					<uni-icons @click="scoreClose" class="close" type="closeempty" size="20" color="#aaa"></uni-icons>
				</view>
				<view class="score" v-if="classList[currentIndex].userScore">
					<uni-rate size="28" v-model="classList[currentIndex].userScore" allowHalf />
					<view class="text">{{classList[currentIndex].userScore}}分</view>
				</view>
				<view class="score" v-else>
					<uni-rate size="28" v-model="star" :disabled="classList[currentIndex].userScore?true:false"
						disabled-color="#FFCA3E" allowHalf />
					<view class="text">{{star}}分</view>
				</view>
				<view class="footer">
					<button @click="submitScore" :disabled="!star||classList[currentIndex].userScore" size="mini"
						plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			height: 100%;
			width: 100%;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #FFF;
			}

			.goback {
				margin-left: 30rpx;
				padding: 20rpx;
				width: 75rpx;
				height: 75rpx;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.3);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.count {
				top: 10vh;
				width: fit-content;
				background-color: rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(10rpx);
				border-radius: 30rpx;
				padding: 8rpx 28rpx;
			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				width: fit-content;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
				font-weight: 300;
			}

			.date {
				font-size: 36rpx;
				top: calc(10vh + 250rpx);
				width: fit-content;
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				bottom: 10vh;
				background-color: rgba(255, 255, 255, 0.8);
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					flex-direction: column;
					color: $text-font-color-2;
					padding: 8rpx 20rpx;
					font-size: 26rpx;
				}
			}
		}

		.popheader {
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				color: $text-font-color-1;
				padding-left: 60rpx;
			}

			.close {
				padding: 30rpx 30rpx;
			}
		}

		.infopop {

			.content {
				max-height: 60vh;
				width: calc(100vw - 30rpx - 30rpx);
				padding: 0 30rpx 30rpx 30rpx;

				.row {
					display: flex;
					font-size: 32rpx;
					line-height: 1.7em;
					padding: 8rpx 0;

					.label {
						color: $text-font-color-2;
						width: 140rpx;
						font-size: 30rpx;
						text-align: right;
					}

					.value {
						flex: 1;
					}

					.class {
						color: $brand-theme-color;
					}

					.rate {
						display: flex;
						align-items: center;

						text {
							padding-left: 10rpx;
						}
					}

					.tabs {
						display: flex;
						flex-wrap: wrap;
						gap: 10rpx;

						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							border-radius: 30rpx;
							padding: 3rpx 15rpx;
						}
					}
				}

				.copyright {
					margin-top: 10rpx;
					font-size: 26rpx;
					line-height: 1.6em;
					background-color: #f6f6f6;
					color: #666;
					padding: 10rpx 20rpx;
					border-radius: 20rpx;
				}
				
				.safe-area-inset-bottom {
					height:env(safe-area-inset-bottom) ;
				}
			}
		}

		.scorepop {
			width: 60vw;

			.score {
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					width: 80rpx;
					line-height: 1em;
					text-align: right;
					color: #FFCA3E;
				}
			}

			.footer {
				padding: 20rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>