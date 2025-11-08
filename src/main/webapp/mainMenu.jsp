<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<header>
<!--             <link rel="stylesheet" href="bootstrap.css">
            <link rel="stylesheet" href="resources/css/indigo.css">
            <link rel="stylesheet" href="resources/css/indigoDashboard.custom.css">
            
            <link rel="stylesheet" href="resources/fonts/font-awesome-4.5.0/css/font-awesome.css">
            
			<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
			<link rel="stylesheet" href="resources/bootstrap/css/AdminLTE.min.css" />
    		<link type="text/css" rel="stylesheet" href="resources/bootstrap/css/KAdmin.css"> -->

    		<script src="resources/jquery-1.11.3.min.js"></script>
    		<script src="resources/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<style type="text/css">
.mainMenuTextarea textarea.x-form-text {
	border-width: 0px !important;
}
</style>
<script type="text/javascript">
	var groupId;
	var userAuth;
	try{
		IndigoESBWebConsole.util.IndigoAjax.request({
			url : 'indexController?cmd=get-session-attribute',
			async: false,
		    params : {'attr': 'SESSION_SELECT_GROUP,SESSION_LOGIN_USER_AUTH'},
		    success : function(response) {
		    	var msg = Ext.JSON.decode(response.responseText);
		    	groupId = msg.SESSION_SELECT_GROUP;
		    	userAuth = msg.SESSION_LOGIN_USER_AUTH;
		    	if(userAuth == 'NORMAL') {
		    		$('#sum_box').hide();
					$('#currentMenu').hide();
					$('#createNotice').hide();
				}
		    }
		});
	}catch(error){
		console.log(error);
	}


	function initExt(){
		//최근메뉴
		var panel = Ext.create('IndigoESBWebConsole.view.center.main.IndigoESBWebConsoleMainFavorites',{
				height : 280,
				emptyText:'사용 내역이 없습니다.',
				autoScroll : false,
		   	    renderTo : 'favoritePanel',
		   	    style:'color:#7D7B7B;'
		});
	}
	
	$(document).ready(function() {
		//get Agent, Adaptor
		getProductAmount('IM', groupId);
		getProductAmount('AD', groupId);
		//get Today MessageSndRcv 
		getTodaySendAmount();
		//get QueueWaiting Message
		getQueueMessage();
		getNotifyMessage();
		getNoticeMessage();			
		queueSizeChart.createChart();
        queueSizeChart.update();
        doAsyncHtmlLoad("popupContent", "resources/html/dialogTemplate.html", true);
        
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        
        var cmd = getUrlParameter('cmd');
        var pd_id = getUrlParameter('pd_id');
        var in_id = getUrlParameter('in_id');
        var pd_name = getUrlParameter('pd_name');
        var pd_alias = getUrlParameter('pd_alias');
        var open_dTree = getUrlParameter('open_dTree');
        if(pd_id != undefined){
        	IndigoAjax.request({
    			url: 'productController?cmd='+cmd,
    			params : {"pd_id": pd_id, "pd_name": pd_name, "pd_alias":pd_alias},
    			success: function(response) {
    				var data = Ext.JSON.decode(response.responseText);
    				setAgentInfo('IndigoESBWebConsoleCenterAgentPanel', data.pd_alias, data.product_info, 'fa fa-plug glyphIcon');
    			}
    		});
        }
        
        if(in_id != undefined){
        	IndigoAjax.request({
    			url: 'adaptorController?cmd='+cmd,
    			params: {'in_id': in_id},
    			success: function(response) {
    				var data = Ext.JSON.decode(response.responseText);
    				setAdaptorInfo('IndigoESBWebConsoleCenterAdaptorPanel', data.eaiInstance.pd_alias, data.eaiInstance, 'fa fa-folder-open glyphIcon');
    			}
    		});
        }
        
        var cookie;
        
        if(document.cookie) {
			// 대시보드 링크로 IMC 이동 시 쿠키에 저장되어있는 페이지로 강제이동하지않음
        	if(document.cookie == null || (dashboardParam != null && dashboardParam != 'null' && dashboardParam != '')) return;
        	cookie = Ext.JSON.decode(document.cookie);
        	var mainController = IndigoESBWebConsole.app.getController('MainFrameController');
        	if(cookie != null && cookie.viewClassName != null){
	        	mainController.viewCenterContents(cookie.viewClassName, cookie.title, cookie.paramData, cookie.focusMenuTreeSelector);
        	}
        }
        
        initExt();
	});
	
	/**
	 * 해당 아이디에 html 문서를 로딩한다.
	 * @param id
	 * @param htmlURL
	 * @param isAppend [default = false]
	 */
	function doAsyncHtmlLoad(id, htmlURL, isAppend, callback){
		try{
			$.get(htmlURL, function(result){
				if(isAppend){
					$('#'+id).append(result);
				}else{
					$('#'+id).empty().append(result);
				}
				
				if(callback){
					callback();
				}
			});
		}catch(error){
			console.error(error);
		}
	}
	
	/**
	 * 대시보드 링크
	 */
	function clickDashboardLink(){
		window.open('/indigoDashboard', '_blank');
	}
	
	/**
	 * IM,어댑터 정보 출력
	 * @param pd_type
	 * @param group_id
	 */
	function getProductAmount(pd_type, group_id) {
		IndigoAjax.request({
			url: 'productController?cmd=monitoring-product',
			params: {"pd_type": pd_type, "group_id": group_id},
			success: function(response) {
				var data = Ext.JSON.decode(response.responseText);
				/*if(data.errCnt >= 1){
					$("#icon"+ pd_type).css("color","#FFA194");
				} else{
					$("#icon"+ pd_type).css("color","#79CF9E");
				} */
				$("#" + pd_type + "_value").html(data.errCnt);
				$("#" + pd_type + "_percent").css("width", "0%");
				$("#" + pd_type + "_percent").css("width", data.errCnt/data.totCnt*100+"%");
			     /* $("#" + pd_type + "_description").html(" 에러: " + data.errCnt + " 총: " + data.totCnt); */ 
			    if(pd_type == "IM"){
					$("#" + pd_type + "_description").html("정상: "+ data.sucCnt +" 에러: " + data.errCnt + " 총: " + data.totCnt);
			    }else{
			    	$("#" + pd_type + "_description").html("정상: "+ data.sucCnt +" 정지: " + data.stopCnt + " 에러: " + data.errCnt + " 총: " + data.totCnt);
			    } 
			}
		});
	}
	
	/**
	 * 금일 전송 에러현황 정보 출력
	 */
	function getTodaySendAmount() {
		IndigoAjax.request({
			url: 'imsMessageTraceController?cmd=msg-today-send-amount',
			success: function(response) {
				var data = Ext.JSON.decode(response.responseText);
				/*if(data.errCnt >= 1){
					$("#iconMessage").css("color","#FFA194");
					
				} else{
					$("#iconMessage").css("color","#79CF9E");
				} */
				$("#today_send_value").html(data.errCnt);
				$("#today_send_percent").css("width", data.errCnt/data.totCnt*100+"%");
				$("#today_send_description").html("에러: " + data.errCnt + " 총: " + data.totCnt);
			},error:function(e){
// 				alert("ERROR: " + e.responseText);
	        }
		});
	}
	
	/**
	 * 큐 적재량 정보 출력
	 */
	function getQueueMessage() {	
		IndigoAjax.request({
			url: 'queueController?cmd=view-MainMenuQueue',
			success: function(response) {
				var data = Ext.JSON.decode(response.responseText);
				
				var waitCnt = 0, totalCnt = 0, tempWaitCnt = 0;
				for(var j = 0; j < data.serverData.length;j++){
					if(data.serverData[j].mbeanlist == undefined) {
						$("#queue_message_description").append(data.serverData[j].name+": 정지");
					} else {
						for(var i = 0; i < data.serverData[j].mbeanlist.length; i++){
							totalCnt += data.serverData[j].mbeanlist[i].EnqueueCount;
							waitCnt += data.serverData[j].mbeanlist[i].QueueSize;
							//각각 ESB마다 큐 적재현황
							tempWaitCnt += data.serverData[j].mbeanlist[i].QueueSize;
						}
						$("#queue_message_description").append(data.serverData[j].name+": " + tempWaitCnt +" ");					
					}
					tempWaitCnt = 0;
				}
				$("#iconQueue").css("color","#999999");
// 				if(waitCnt <= 6666){
// 					$("#iconQueue").css("color","#79CF9E");
// 				}else if(waitCnt <= 13332){
// 					$("#iconQueue").css("color","#FDB300");
// 				}else{
// 					$("#iconQueue").css("color","#FFA194");
// 				}
				$("#queue_message_value").html(waitCnt);
				$("#queue_message_percent").css("width", waitCnt/totalCnt*100+"%");
			},error:function(e){
// 				alert("ERROR: " + e.responseText);
	        }
		});
	}
	
	/**
	 * 알림 출력
	 */
	function getNotifyMessage() {
		IndigoAjax.request({
			url: 'layoutController?cmd=view-notify-message',
			success: function(response) {
				var data = Ext.JSON.decode(response.responseText);
				
				if(data.messageList.length == 0){
					var content = '<div class="todo-title" style="color:#7D7B7B; padding:15px;">등록된 알림이 없습니다.</div>';
			    	$('#slimScrollDiv').append(content);
			    	return;
				}
				$("#notifyCaption").html("<img src='resources/img/icon1.png'/> 알림"+"("+data.total+")");
				 var status = 'alert';
				for(var i = 0; i < data.messageList.length; i++){
					if(data.messageList[i].message_status == "I"){
						status = '"alert alert-info"';
					}else if(data.messageList[i].message_status == "E"){
						status = '"alert alert-danger"';
					}else{
						status = '"alert alert-success"';
					}
					$('#slimScrollDiv').append('<div style="margin:5px 5px 5px 5px; height:44px;"class='+status+'>'+
					  '<strong style="position:relative;top:-2px">'+data.messageList[i].message_content+'</strong>'+ '<span style="position:absolute;right:50px;margin-top:-2px">' + data.messageList[i].create_date+
		             //message_id '<button type="button" data-dismiss="alert" aria-hidden="true" class="close" style="position:absolute;right:-40px;top:-4px;">×</button>' +'</span>' +
		              '<button type="button" data-dismiss="alert" aria-hidden="true" class="close" onclick="deleteRowNotify(\''+data.messageList[i].message_id+'\')"><i class="fa fa-times" style="position:absolute;right:-27px;"></i></button></span>' +
		              '</div>');
					} 
			},error:function(e){
// 				alert("ERROR: " + e.responseText);
	        }
		});
	}
	
	/**
	 * 알림 삭제
	 */
	function deleteRowNotify(id){
		IndigoAjax.request({
			url: 'layoutController?cmd=remove-notify-message',
			params:{"id": id}
		});
	}
	
	/**
	* 알림 설정창
	*/
	function configNotify(){
		 var window = Ext.create('IndigoESBWebConsole.view.center.main.IndigoESBWebConsoleCenterNotifyWindow',{
			layout: 'fit', title: '알림 상세' , width: 900, height: 600, okButtonText: '확인', useCancelButton: false,
		}).show();
		 
		 // 일반 사용자가 알림 상세 클릭 시 삭제, 전체 삭제 버튼 숨김
		 if(userAuth == 'NORMAL'){
			 window.down('IndigoESBWebConsoleCenterNotifyToolbar [itemId=delete]').hide();
			 window.down('IndigoESBWebConsoleCenterNotifyToolbar [itemId=deleteAll]').hide();
		 }
	}
	
	/**
	 * 공지사항 출력
	 */
	function getNoticeMessage() {
		IndigoAjax.request({
			url: 'layoutController?cmd=view-notice',
			params:{"lines": 11},
			success: function(response) {
				var data = Ext.JSON.decode(response.responseText);
				
				if(data.list.length == 0){
					var content = '<div class="todo-title" style="color:#7D7B7B; padding:15px;">등록된 공지사항이 없습니다.</div>';
			    	$('#noticeForm').append(content);
			    	return;
				}
				for(var i=0;i<data.list.length;i++){
					var year = data.list[i].REG_DATE.substring(0,4);
					var month = data.list[i].REG_DATE.substring(4,6);
					var day = data.list[i].REG_DATE.substring(6,8);
					var reg_date = year + '/' + month +'/'+ day;
					data.list[i].CONTS = data.list[i].CONTS.split("\n")[0];
					
					$('#noticeForm').append(
							  '<li class="clearfix" style="margin: 5px;">'+
							  '<div class="todo-check pull-left">'+
							  '<div class="icheckbox_minimal-grey" style="position: relative;"><input type="checkbox" value="" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div></div>'+
				              '<div class="todo-title" style="width:70%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"><span style="cursor:pointer;" onclick="openNoticePop(\'공지사항 - 수정\',\'modify\',' + data.list[i].ID + ',\'' + data.list[i].CONTS +'\')">'+'&nbsp; '+data.list[i].CONTS +'</span></div>'+'<span style="position:absolute;right:50px;margin-top:-17px">' + reg_date+ '</span>'+
				              '<div class="todo-actions pull-right clearfix">'+
// 				              '<a href="#" class="todo-edit"><i class="fa fa-edit"></i></a>'+
							  '<a href="#" class="todo-remove" onclick="deleteRowNotice(\''+data.list[i].ID+'\')"><i class="fa fa-times" style="position:absolute;right:-3px;top:2px;"></i></a>'+
// 				              '<button type="button" data-dismiss="alert" aria-hidden="true" class="close" onclick="deleteRowNotice(\''+data.list[i].id+'\')"><i class="fa fa-times" style="position:absolute;right:-27px;"></i></button>' +
						      '</i></a>'+
						      '</div></li>');
				}
			}
		});
	}
	
	
	/**
	* 공지사항 삭제
	*/
 	function deleteRowNotice(id){
		if(id == undefined){
			id = $('#notice_btn').data("selectId");
		}
		
		Ext.Msg.show({
	     	title:'공지사항 - 삭제',
	     	msg: '이 공지사항을 삭제하시겠습니까?',
	     	buttons: Ext.Msg.OKCANCEL,
	     	icon: Ext.Msg.WARNING,
	     	fn : function(buttonValue, inputText, showConfig){
	     		if(buttonValue == 'ok'){
	     			IndigoAjax.request({
	    				url: 'layoutController?cmd=delete-notice',
	    				params:{"id": id},
	    				success: function(data) {
	    					refreshNotice();
	    				}
	    			});
	     		}
	     	}
		});
	}
	/**
	* 공지사항 생성
	*/
	function createNotice(){
		openNoticePop('공지사항 - 추가','add', '','');	
	}
	
	/**
	* 알림, 공지사항 새로고침
	*/
	function refreshNotice(){
		$("#noticeForm").empty();
		getNoticeMessage();
// 		Ext.getCmp('noticePanel').getStore().load();
	}
	function refreshNotify(){
		$("#slimScrollDiv").empty();
// 		getNotifyMessage();
// 		Ext.getCmp('notifyPanel').getStore().load();
		getNotifyMessage();
	}
	
	/**
	* 에이전트,어댑터,메시지,큐적재량 클릭시 링크
	*/
	function clickAgentManagement() {
		getViewClass('IndigoESBWebConsoleAgentListPanel', '에이전트 관리', 'fa fa-plug glyphIcon');
	}
	function clickAdaptorManagement() {
		getViewClass('IndigoESBWebConsoleCenterProjectListPanel', '프로젝트 관리', 'fa fa-folder-open glyphIcon');
	}
	function clickTodayMessageManagement() {
		getViewClass('IndigoESBWebConsoleMsgSendIfIdTracePanel', '송수신 메시지 조회', 'fa fa-bar-chart glyphIcon');
	}
	function clickQueueManagement() {
		getViewClass('IndigoESBWebConsoleESBMessageQueueMainPanel', '메시지 큐', 'fa fa-server glyphIcon');
	}
	
	/**
	* 공지사항 클릭 상세정보
	*/
	function openNoticePop(title, type, selectId, data){
		if(type == 'modify'){
			IndigoAjax.request({
    			url: 'layoutController?cmd=view-notice-detail',
    			params : {"id": selectId},
    			async:false,
    			success: function(response) {
    				var msg = Ext.JSON.decode(response.responseText);
    				data = msg.CONTS;
    			}
    		});
		}
		
 		var window = Ext.create('IndigoESBWebConsole.view.common.IndigoESBWebConsoleWindow',{
			layout: 'fit', title: title , width: 500, height: 300, resizable: true
		});
		var panel = Ext.create('Ext.form.FormPanel',{
			border:0,
			items:[{xtype:'hidden', name: 'operationType', value: type},
				   {xtype:'hidden', name: 'selectId', value: selectId},{
				xtype     : 'textareafield',
		        name      : 'notice', value : data,
		        anchor    : '100% 100%', border: 0, margin:0, cls:'mainMenuTextarea'
			}]
		});
		window.add(panel);
		window.show();
		//ok 저장버튼
		window.down('button[itemId=ok]').addListener('click', function(view){
			var conts = window.down('textareafield').getValue();
			submitPopup(window, type, selectId, conts)
		});
		//cancel 취소 버튼
		window.down('button[itemId=cancel]').addListener('click', function(view){
			view.up('.window').destroy();
		});
	} 
	
	//공지사항 추가
	function submitPopup(window, type, selectId, conts){		
		var req_url = "";
		
		if(conts.indexOf('<script>') != -1 || conts.indexOf('<\/script>') != -1){
			Ext.Msg.show({
				title:'공지사항 추가',
        		msg: '공지사항에 스크립트를 삽입할 수 없습니다',
        		buttons: Ext.Msg.OK,
        		icon: Ext.Msg.ERROR,
        	});
			
        	return;
		}
		
		if(type == 'add'){
			req_url = "layoutController?cmd=insert-notice";
		}else if(type == 'modify'){
			req_url = "layoutController?cmd=update-notice";
		}
		
		IndigoAjax.request({
			url : req_url,
			params : {"contents": conts, "id": selectId},
			success : function(){
				window.destroy();
				refreshNotice();
			},
			failure : function(response) {
				Ext.Msg.show({
					title:'공지사항 추가',
	        		msg: '공지사항 등록에 실패했습니다. ' + response.statusText,
	        		buttons: Ext.Msg.OK,
	        		icon: Ext.Msg.ERROR,
	        	});
			}
		}); 
	}
</script>
</header>

<body>
<div class="page-content" style="padding-bottom: 0px">
                    <div id="tab-general">
                        <div id="sum_box" class="row mbl">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3" style="padding-right:5px;padding-left:5px;">
                                <div class="panel profit db1 mbm" style="cursor:pointer;height:150px;border:1px solid #e5e5e5;" onclick="clickAgentManagement()">
                                    <div class="panel-body" style="margin-right: 5px;">
                                        <p class="icon">
                                            <i id="iconIM" class="icon fa fa-plug"></i>
                                        </p>
                                        <h4 class="value">
                                            <span id="IM_value" data-counter="" data-start="10" data-end="50" data-step="1" data-duration="0">0</span><span id="IM_EA">개</span>
                                        	<p class="description">에이전트 에러 현황</p>
                                        </h4>
                                        <p id="IM_description" class="progress-description" style="margin-bottom:10px;">에러: 0 총: 0</p>
                                        <div class="progress progress-sm mbn" style="background-color:#F0F2F7;">
                                            <div id="IM_percent" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" class="progress-bar progress-bar-danger"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3" style="padding-right:5px;padding-left:5px;">
                                <div class="panel income db1 mbm" style="cursor:pointer;height:150px;border:1px solid #e5e5e5;" onclick="clickAdaptorManagement()">
                                    <div class="panel-body" style="margin-right: 5px;">
                                        <p class="icon">
                                            <i id="iconAD" class="icon fa fa-plus"></i>
                                        </p>
                                        <h4 class="value">
                                            <span id="AD_value" data-counter="" data-start="10" data-end="50" data-step="1" data-duration="0">0</span><span id="AD_EA">개</span>
                                        	<p class="description">어댑터 에러 현황</p>
                                        </h4>
                                        <p id="AD_description" class="progress-description" style="margin-bottom:10px;">에러: 0 총: 0</p>
                                        <div class="progress progress-sm mbn" style="background-color:#F0F2F7;">
                                            <div id="AD_percent" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" class="progress-bar progress-bar-danger"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3" style="padding-right:5px;padding-left:5px;">
                                <div class="panel task db1 mbm" style="cursor:pointer;height:150px;border:1px solid #e5e5e5;" onclick="clickTodayMessageManagement()">
                                    <div class="panel-body" style="margin-right: 5px;">
                                        <p class="icon">
                                            <i id="iconMessage" class="icon fa fa-bar-chart"></i>
                                        </p>
                                        <h4 class="value">
                                            <span id="today_send_value" data-counter="" data-start="10" data-end="50" data-step="1" data-duration="0">0</span><span id="message_EA">개</span>
                                        	<p class="description">금일 전송 에러 현황</p>
                                        </h4>
                                        <p id="today_send_description" class="progress-description" style="margin-bottom:10px;">완료: 0, 총: 0</p>
                                        <div class="progress progress-sm mbn" style="background-color:#F0F2F7;">
                                            <div id="today_send_percent" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" class="progress-bar progress-bar-danger"></div> <!-- "progress-bar progress-bar-success" -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3" style="padding-right:5px;padding-left:5px;">
                                <div class="panel visit db1 mbm" style="cursor:pointer;height:150px;border:1px solid #e5e5e5;" onclick="clickQueueManagement()">
                                    <div class="panel-body" style="margin-right: 5px;">
                                        <p class="icon">
                                            <i id="iconQueue" class="icon fa fa-server"></i>
                                        </p>
                                        <h4 class="value">
                                            <span id="queue_message_value" data-counter="" data-start="10" data-end="50" data-step="1" data-duration="0">0</span><span id="queue_EA">개</span>
                                        	<p class="description" style="margin-bottom:-5px;">큐 적재 현황</p>
                                        </h4>
                                         <p id="queue_message_description" class="progress-description" style="margin-top:10px; margin-bottom:-30px;"></p>
<!--                                         <div id="queuechart_ex" style="height:75px; width:100%;"></div> -->
<!--                                         <p id="queue_message_description" class="progress-description">총: 0</p>
                                        <div class="progress progress-sm mbn">
                                            <div id="queue_message_percent" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" class="progress-bar progress-bar-danger"></div>
                                        </div> -->
                                    </div>
                                    <div id="queuechart_ex" style="height:67px; width:100%;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row mbl">
							<div class="col-lg-6" style="padding-right:5px;padding-left:5px;">
                        	<div class="portlet box" style="border:1px solid #e5e5e5;">
                                    <div class="portlet-header">
                                    <div id="notifyCaption" class="caption"><img src="resources/img/icon1.png"/> 알림</div> <div style="position:absolute;right:30px;" class="nav nav-pills"><i onclick="configNotify()" class="icon fa fa-cog" style="cursor:pointer;color:#FF7514;margin-right: 5px;"></i><i onclick="refreshNotify()" class="icon fa fa-refresh" style="cursor:pointer;color:#FE6900"></i><!-- <a href="javascript:clickDashboardLink()">더 보기</a> --></div>
                                </div>
                                <div style="overflow: hidden;padding:0px;" class="portlet-body">
                                
                                <!-- <div id="notifyPanel" class="slimScrollDiv"  style="position: relative; overflow: auto; width: 100%; height: 280px; border: 1px;">
                                    </div> -->
                                	<div id="slimScrollDiv" class="slimScrollDiv"  style="position: relative; overflow: auto; width: 100%; height: 250px; border: 1px;">
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6" style="padding-right:5px;padding-left:5px;">
                                <div class="portlet box" style="border:1px solid #e5e5e5;">
                                    <div class="portlet-header">
                                        <div class="caption"><img src="resources/img/icon1.png"/> 공지사항</div><div style="position:absolute;right:30px;" class="nav nav-pills"><i id="createNotice" onclick="createNotice()" class="icon fa fa-plus" style="cursor:pointer;color:#FF7514;margin-right: 5px;"></i><i onclick="refreshNotice()" class="icon fa fa-refresh" style="cursor:pointer;color:#FE6900"></i><!-- <a href="javascript:clickDashboardLink()">더 보기</a> --></div>
                                        <div style="position:absolute;right:50px;" class="nav nav-pills"></div>
                                    </div>
                                    <div style="overflow: hidden;padding:0px;" class="portlet-body">
                                    <!-- <div id="noticePanel" class="slimScrollDiv"  style="position: relative; overflow: auto; width: 100%; height: 280px; border: 1px;">
                                    </div> -->
                                    
                                        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: 100%; height: 250px;"><ul id="noticeForm" onblur="checkEmpty(this);" class="todo-list sortable ui-sortable" style="overflow: auto; width: 100%; height: 250px;">
                                        </ul><div class="slimScrollBar" style="width: 7px; position: absolute; top: 35px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 204.248px; background: rgb(0, 0, 0);"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="currentMenu" class="row mbl">
                        	<div class="col-lg-12" style="padding-right:5px;padding-left:5px;">
                        		<div class="portlet box" style="border:1px solid #e5e5e5;">
                                    <div class="portlet-header">
                                        <div class="caption"><img src="resources/img/icon1.png"/> 최근메뉴</div>
                                    </div>
                                   	<div style="overflow: hidden;" class="portlet-body">
                                    	<div id="favoritePanel" class="slimScrollDiv" style="position: relative; overflow: hidden; width: 100%; height: 310px;">
                                    	</div>
                                    </div>
                                </div>
							</div>
						</div>
<!-- popup content -->
<div id="popupContent"></div>
</body>
</html>