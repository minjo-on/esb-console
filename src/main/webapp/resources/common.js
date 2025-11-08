function parseStatusToImg(status){
	var img ="";
	if("2"== status){
		img = "./resources/img/view/status_warning.gif";
	}else if("-9"== status){
		img = "./resources/img/view/status_stop.gif";
	}else if("0"== status){
		img = "./resources/img/view/status_starting.gif";
	}else if("1"== status){
		img = "./resources/img/view/status_running.gif";
	}else if("-2"== status){
		img = "./resources/img/view/status_zombie.gif";
	}else if("-1"== status){
		img = "./resources/img/view/status_scramble.gif";
	}else{
		img = "./resources/img/view/status_no_signal.gif";
	}
	return img;
}

function parseStatusToImgText(status){
	var imgText ="";
	if("2"== status){
		imgText = "경고";
	}else if("-9"== status){
		imgText = "신호 없음";
	}else if("0"== status){
		imgText = "시작중";
	}else if("1"== status){
		imgText = "운영";
	}else if("-2"== status){
		imgText = "정지";
	}else if("-1"== status){
		imgText = "중단";
	}else{
		imgText = "초기화 되지 않음";
	}
	return imgText;
}

function parseServerIcon(status){
	var img ="";
	if("2"== status){
		img = "./resources/img/server_icon/status_warning.png";
	}else if("-9"== status){
		img = "./resources/img/server_icon/status_stop.png";
	}else if("0"== status){
		img = "./resources/img/server_icon/status_starting.png";
	}else if("1"== status){
		img = "./resources/img/server_icon/status_running.png";
	}else if("-2"== status){
		img = "./resources/img/server_icon/status_zombie.png";
	}else if("-1"== status){
		img = "./resources/img/server_icon/status_scramble.png";
	}else{
		img = "./resources/img/server_icon/status_stop.png";
	}
	return img;
}

function parseTreeAdaptorIcon(status){
	var img ="";
	if("2"== status){
		img = "menu-icon-ad_warnning";
	}else if("-9"== status){
		img = "menu-icon-ad_stop";
	}else if("0"== status){
		img = "menu-icon-ad_starting";
	}else if("1"== status){
		img = "menu-icon-ad_running";
	}else if("-2"== status){
		img = "menu-icon-ad_zombie";
	}else if("-1"== status){
		img = "menu-icon-ad_scramble";
	}else{
		img = "menu-icon-ad_stop";
	}
	return img;
}

function currentDate(type, count){
	var d1 = new Date(), d2 = new Date (d1);
	if(type =='minutes'){
		d2.setMinutes ( d1.getMinutes() + count );
	}else if(type =='todayStart'){
		d2.setHours(0,0,0);
	}	
	return d2;
}