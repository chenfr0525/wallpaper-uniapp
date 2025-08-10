export const request = (config = {}) => {
	return new Promise((resolve, reject) => {
		let {
			url,
			method = 'GET',
			data,
		} = config
		uni.request({
			url,
			method,
			data,
			header:{
				'access-key':'rubychenling525'
			},
			success: (res) => {
				if (res.data.errCode === 0){
					resolve(res.data.data)
				}else if(res.data.errCode === 400){
					uni.showModal({
						title:'错误提示',
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				}else{
					uni.showToast({
						title:res.data.errMsg,
						icon:'none'
					})
					reject(res.data)
				}
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}