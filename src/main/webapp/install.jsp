<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.io.FileUtils"%>
<%@page import="com.indigo.web.common.Utils"%>
<%@page import="com.indigo.web.common.Base64"%>
<%@page import="java.util.Properties"%>
<%@page import="javax.servlet.ServletContext"%>
<%@page import="java.io.FileInputStream"%>

<%
	ServletContext context = request.getSession().getServletContext();
	String realFolder = context.getRealPath("WEB-INF/classes");
	File file = new File(realFolder,"indigo.properties");
	Properties prop = new Properties();
	prop.load(new FileInputStream(file));
	String version = prop.get("imcVersion").toString();
	String releaseDate = prop.get("buildNo").toString();
	String copyright = prop.get("copyright").toString();
%>

<%
	String path = request.getRealPath("WEB-INF/classes");
	File licenseFile = new File(path,"license.txt");
	String licStr = FileUtils.readFileToString(licenseFile);
	request.setAttribute("license_txt", licStr);
%>
<!DOCTYPE HTML>
<html>
<head> 
<link rel="shortcut icon" href="resources/img/favicon.ico">
<title>+++ Mesim ESB <%=version %> Install +++</title>

<link rel="stylesheet" href="resources/install.css">
<link rel="stylesheet" href="resources/css/indigo.css">
<link rel="stylesheet" href="resources/css/buttonSegment.css">

<script src="resources/jquery-1.11.3.min.js"></script>            
<!-- <script src="ext/ext-dev.js"></script> -->
<script src="resources/install/ext-all.js"></script>
<script src="resources/install/ext-lang-ko.js" charset="utf-8"></script>
<script src="resources/install/indigowebconsole-lang-kr.js" charset="utf-8"></script>
<!-- <script src="bootstrap.js"></script> -->
<script src="resources/common.js"></script>

<script type="text/javascript">

function loadLogin(){
	location.href="<c:url value='/index.jsp'/>";
}

function viewSelectDb(){
	var me = this;
	var store= Ext.create('Ext.data.Store',{
		autoLoad:true,
		fields:['name','value'],
		data:[ 
		      { name:'Oracle', value:'oracle'},
		      { name:'Derby(Network)', value:'derby'}, 
		      { name:'MySql', value:'mysql'},
		      { name:'Altibase', value:'altibase'},
		      { name:'수동 입력', value:'etc'}]
	});
	var f = Ext.create('Ext.form.FormPanel',{  
		maxHeight: 400, minWidth: 500,
		bodyStyle:{"background-color":"#f1f1f1"},
        title : '<div style="text-align:center;">ESB IMC 설치 정보 입력</div>',
   		xtype:'form', name: 'normal', layout: 'anchor',
        items:[{
    			xtype: 'textfield', name : 'mciResult', hidden:true, value:'false'
    		},{
    			xtype: 'textfield', name : 'db_encrypt', hidden:true, value:'false'
    		},{
        		xtype: 'textfield', name : 'db_name', hidden:true
        	},{
        		xtype: 'textfield', name : 'adtResult', hidden:true, value:'false'
        	},{
           		xtype: 'combo', name : 'dbms', editable: false, fieldLabel: 'DBMS 선택', margin: '5 5 5 10',
				store: store, displayField: 'name', valueField: 'value', value: 'oracle', labelWidth: 150,
           		listeners: {
            			select: function(combo, record, index) {
            				var sidtemp = 'SID(Service ID)';
            				if(combo.getValue() != 'oracle'){
            					sidtemp = 'DB Name';
            				}
            				f.down('[name=db_sid]').labelEl.update(sidtemp);
            				
            				var usertemp = 'User ID';
            				var passtemp = 'User Password';
            				if(combo.getValue() == 'etc'){
            					f.down('[name=db_ip]').hide();
            					f.down('[name=db_port]').hide();
            					f.down('[name=db_sid]').hide();
            					f.down('[name=db_ip]').allowBlank = true;
            					f.down('[name=db_port]').allowBlank = true;
            					f.down('[name=db_sid]').allowBlank = true;
            					
            					usertemp = 'jdbc.username';
                				passtemp = 'jdbc.password';
            					
            					f.down('[name=jdbc_db]').show();
            					f.down('[name=jdbc_driver]').show();
            					f.down('[name=jdbc_url]').show();
            					f.down('[name=ping_query]').show();
            					f.down('[name=jdbc_db]').allowBlank = false;
            					f.down('[name=jdbc_driver]').allowBlank = false;
            					f.down('[name=jdbc_url]').allowBlank = false;
            					f.down('[name=ping_query]').allowBlank = false;
            				}else{
            					f.down('[name=db_ip]').show();
            					f.down('[name=db_port]').show();
            					f.down('[name=db_sid]').show();
            					f.down('[name=db_ip]').allowBlank = false;
            					f.down('[name=db_port]').allowBlank = false;
            					f.down('[name=db_sid]').allowBlank = false;
            					
            					f.down('[name=jdbc_db]').hide();
            					f.down('[name=jdbc_driver]').hide();
            					f.down('[name=jdbc_url]').hide();
            					f.down('[name=ping_query]').hide();
            					f.down('[name=jdbc_db]').allowBlank = true;
            					f.down('[name=jdbc_driver]').allowBlank = true;
            					f.down('[name=jdbc_url]').allowBlank = true;
            					f.down('[name=ping_query]').allowBlank = true;
            				}
            				f.down('[name=db_user]').labelEl.update(usertemp);
            				f.down('[name=db_pawd]').labelEl.update(passtemp);
            				
            			}
            		}
            }, //기타 수동입력 부분  
              {
           		xtype: 'textfield', name : 'jdbc_db', fieldLabel: 'jdbc.db',
           		labelWidth: 150, margin: '5 5 5 10',  hidden:true,
            },{
           		xtype: 'textfield', name : 'jdbc_driver', fieldLabel: 'jdbc.driver', width:480,
           		labelWidth: 150, margin: '5 5 5 10',  hidden:true,
            },{
           		xtype: 'textfield', name : 'jdbc_url', fieldLabel: 'jdbc.url', width:480,
           		labelWidth: 150, margin: '5 5 5 10',  hidden:true,
            },
            //기타 수동입력 부분
              {
           		xtype: 'textfield', name : 'db_ip', fieldLabel: 'IP(Host Name)',
           		labelWidth: 150, allowBlank: false, margin: '5 5 5 10', 
            },{	
           		xtype: 'textfield', name : 'db_port', fieldLabel: 'Port',
           		labelWidth: 150, allowBlank: false, margin: '5 5 5 10',  
            },{	
          	 	xtype: 'textfield', name : 'db_sid', fieldLabel: 'SID(Service ID)',
           		labelWidth: 150, allowBlank: false, margin: '5 5 5 10', 
            },{	 
            	xtype: 'fieldcontainer', layout:'hbox', name : 'useridchk',margin: '5 5 5 10',
            	items:[{
            		xtype: 'textfield', name : 'db_user', fieldLabel: 'User ID', 
            		labelWidth: 150, allowBlank: false, width:305 
            	},{
		            xtype: 'checkbox', margin: '0 0 0 10',
		            boxLabel: '암호화사용', name:'checkbox1',
		            listeners: {
		            	 change: function (checkbox, newVal, oldVal) {
		                      	f.down('[name=db_encrypt]').setValue(newVal);
		                  }
            		}
		        }]
        	},{	
        		xtype: 'textfield', name : 'db_pawd', fieldLabel: 'User Password',
        		labelWidth: 150, inputType:'password', allowBlank: false, margin: '5 5 5 10', 
            },{
           		xtype: 'textfield', name : 'ping_query', fieldLabel: 'ping.query', width:480,
           		labelWidth: 150, margin: '5 5 5 10',  hidden:true,
            },{
                xtype: 'fieldcontainer', fieldLabel: '전문 관리',
            	labelWidth: 150, defaultType: 'radiofield',margin: '5 5 5 10',
                layout: 'hbox',
                items: [{
                        boxLabel  : '미사용',
                        width: 100,
                        checked: true,
                        name : 'radioaaa',
                        listeners: {
                        	 change: function (checkbox, newVal, oldVal) {
   		            		  if(newVal)
  		                      	f.down('[name=mciResult]').setValue(oldVal);

  		                  }
              		}
                    },{
                        boxLabel  : '사용',
                        width: 100,
                        name : 'radioaaa',
                        listeners: {
                        	 change: function (checkbox, newVal, oldVal) {
    		            	  if(newVal)
    		                   	f.down('[name=mciResult]').setValue(newVal);
    		              }
                		}
                    }]
            }],
		bbar : ['->',{    
			text : '실행',
			handler : function() {
				var form = f.getForm();
				form.setValues({
					db_name : f.down('[name=db_sid]').getValue()
				});
				form.submit({
					url:"/indigoesb/servlet/installCmd",
					
					failure:function(form,action){
						var msg = Ext.JSON.decode(action.response.responseText);
						if(msg.msg == 'OK'){
							loadLogin();
						}else{
						Ext.Msg.show({
							title:'경고',
							msg: 'DB 등록에 실패하였습니다.',
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.ERROR,
							});
						}
					}
				})	
			
			}
		}]
	});	
	return f;
} 

function initExtLayout(){
	var view = Ext.create('Ext.Viewport', { 
			layout: {
           	 type: 'vbox', align: 'center', pack: 'center'
            },
			items : [{
				title : '<div style="text-align:center;">Mesim ESB <%=version %> Install</div>',
				xtype: 'form', maxHeight: 400, minWidth: 500,
				bbar : [{
		            xtype: 'checkbox',
		            name: 'chk_info',
		            boxLabel: '라이센스 동의'
		        },'->',{
					text : '다음',
					handler : function() {
						if(!view.down('[name=chk_info]').getValue()){
							Ext.Msg.show({
								title:'경고',
								msg: '라이센스 동의를 해주세요.',
								buttons: Ext.Msg.OK,
								icon: Ext.Msg.WARNING,
							});
						}else{
							view.removeAll();
							view.add(viewSelectDb());
						}		
					}
				}],
				items:[{
					xtype : 'textarea', id :'message',
					name : 'message', anchor : '100%', height: 400,
					readOnly : true	
				}]
			}],
		});
	}

	$(document).ready(function() {
		Ext.onReady(function() {
			initExtLayout();
			Ext.getCmp('message').setValue($("#test").val());
		});
	});
</script>
</head>
<body>
<textarea id="test" style="display: none">Version <%=version%>, <%=releaseDate%>&#10;&#10;
Copyright (C) <%=copyright%>&#10;I agree with the license 
</textarea>
</body>
</html>
