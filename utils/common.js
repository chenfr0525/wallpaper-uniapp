export const formatTimeDiff = (timestamp) => {
	const now = Date.now();
	const diff = now - timestamp; // 时间差（毫秒）

	// 如果时间戳是未来的时间，返回null
	if (diff < 0) return null;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (seconds < 60) {
		return '1分钟'; // 一分钟内统一显示"1分钟"
	} else if (minutes < 60) {
		return `${minutes}分钟`;
	} else if (hours < 24) {
		return `${hours}小时`;
	} else if (days < 30) {
		return `${days}天`;
	} else if (months < 3) {
		return `${months}个月`;
	} else {
		return null; // 超过三个月返回null
	}
}

export const goToHome = () => {
	uni.showModal({
		title: '提示',
		content: '页面有无，将跳转到首页！',
		showCancel: false,
		success(res) {
			if (res.confirm) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	})
}