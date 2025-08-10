export const getStatusBarHight=()=>{
	let SYSTEM_INFO = uni.getSystemInfoSync()
	return SYSTEM_INFO.statusBarHeight || 10
}

export const getTitleHeight=()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {
			height,
			top
		} = uni.getMenuButtonBoundingClientRect()
		return (top - getStatusBarHight()) * 2 + height
	}else{
		return 40
	}
}