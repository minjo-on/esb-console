Ext.define("IndigoESBWebConsole.controller.report.ReportCustomController", {
    extend : "Ext.app.Controller",
    //컨트롤 할 View와 연관된 모든 컴포넌트 호출
    views : [
		'site.sample.popup.report.ReportFormPanel',	// report
		'site.sample.popup.report.ReportListGrid',	//reportList
		'site.sample.popup.report.ReportListPanel',
		'site.sample.popup.report.ReportListToolbar',
		'site.sample.popup.report.ReportListWindow',
		'site.sample.popup.report.ReportDetailFormPanel', //reportDetail
		'site.sample.popup.report.ReportDetailWindow',
		'site.sample.popup.report.ReportWindow',
    ],
    
    stores : [
	],	
	models : [
	],
	//ExtJS에서는 미리 정의된 변수가 존재하며 해당 변수를 넘겨받을 수 있음
	//init() : Controller가 시작 될 때 호출되는 함수
    init : function(app) {		
		console.log('this works!');
				
    	//this.control({...}) : Controller를 통해 관리할 함수
    	this.control({
        	/**
			 * 침해사고 및 에러 보고 모달
			 */
			'ReportListToolbar [itemId=addReport]': {
				click: function(view, eOpts) {
					console.log('clicked!');
					var win = Ext.create('IndigoESBWebConsole.view.site.sample.popup.report.ReportWindow', {
					}).show();
				}
			},
			'ReportWindow button[itemId=cancel]': {	//취소 버튼
				click: function(view) {
					console.log(view);
					view.up('.window').destroy();
				}
			},
			
			// OK 저장버튼
			'ReportWindow button[itemId=ok]': {
				click: function(btn, e, eOpts) {
					var me = this;
					var form = btn.up('window').down('form');
					const formValues = form.getForm().getValues();

//					var eTypeButtons = form.down('indigoSwitchButtonSegment[name=e_type]');
//					var eTypeValue = eTypeButtons.getValue();
//					formValues["report_Type"] = eTypeValue;
					formValues["report_Type"] = 'E';		//임시 조치

					// 빈칸 및 형식에 맞지 않을 때 오류
					if (!form.isValid()) {
						Ext.Msg.show({
							title: '경고',
							msg: '형식에 맞게 모든 필수항목을 입력하세요.',
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.ERROR,
						});
						return;
					}

					// 모든 값이 정상적으로 채워졌을 때
					Ext.Msg.confirm("확인", "이대로 발송하시겠습니까?", function(chk) {
						if (chk == 'yes') {
							// Ajax로 백엔드에 form의 값 전달
							IndigoESBWebConsole.util.IndigoAjax.request({ // Ajax 요청을 수행하는 메서드
								url: 'ReportController?cmd=insert-report', // Ajax 요청을 보낼 URL 지정
								jsonData: formValues,
//								data: formValues,
								async: false, // 비동기 여부, false 이니 동기적인 요청 수행
								success: function(response) {  // Ajax 요청이 성공적으로 완료했을 때 실행되는 콜백 함수, response를 통해 응답 데이터에 접근 가능
									msg = Ext.JSON.decode(response.responseText);

									Ext.Msg.show({
										title: '성공',
										msg: '문의가 접수되었습니다.',
										buttons: Ext.Msg.OK,
										icon: Ext.Msg.INFO
									});
									btn.up('.window').destroy(); // 창 닫기
								}
							}, false);
						} else {
							return;
						}
					});
				}
			},

			/**
			 * 보고 상세 내역
			 */
			'ReportDetailWindow button[itemId=cancel]': {	//취소 버튼
				click: function(view) {
					console.log(view);
					view.up('.window').destroy();
				}
			},
        });
    }
});