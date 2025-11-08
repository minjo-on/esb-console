<%@ page language="java" pageEncoding="utf-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.indigo.web.common.Utils"%>
<%@page import="com.indigo.web.common.Base64"%>
<%@page import="java.util.Properties"%>
<%@page import="java.io.File"%>
<%@page import="javax.servlet.ServletContext"%>
<%@page import="java.io.FileInputStream"%>

<%
	ServletContext context = request.getSession().getServletContext();
	String realFolder = context.getRealPath("WEB-INF/classes");
	File file = new File(realFolder,"indigo.properties");
	Properties prop = new Properties();
	prop.load(new FileInputStream(file));
	String version = prop.get("imcVersion").toString();
%>

<HTML>
<HEAD>
<script src="resources/jquery-1.11.3.min.js"></script>
<script src="resources/aes/aes.js"></script>
<script src="resources/aes/pbkdf2.js"></script>
<script src="resources/aes/AesUtil.js"></script>
<title>+++ Mesim ESB <%=version %> +++</title>
<link rel="stylesheet" href="resources/css/style.css">
<style type="text/css">
.login_input {
	padding: 2 0 0 0;
	font-size: 12px;
	/* background-color: white; */
	background-color: transparent !important;
	border: none;
    /* border-bottom: 1px; */
    border-bottom: 1px #575757 dotted;
}

/* input:-webkit-autofill { 
	-webkit-box-shadow: 0 0 0px 1000px #F3F2F2 inset; 
}  */
</style>
<script type="text/javascript">
$(document).ready(function(){
	init();
	checkInvalidPassword();
});
    function init(){
        document.loginForm.j_username.focus();
        document.loginForm.j_username.select();
    }
    
    function login() {
    	if(isBlank(document.loginForm.j_username.value)) {
    		alert("로그인 아이디를 입력하세요.");
    		document.loginForm.login_id.focus();
    		return false;
    	} else if(isBlank(document.loginForm.j_password.value)) {
    		alert("비밀번호를 입력하세요.");
    		document.loginForm.login_pw.focus();
    		return false;
    	}
    	encryptionAes();
//     	document.loginForm.submit();
    }
    
    function isBlank(val){
    	if (val==null || val.split(' ').join('') == '')
    		return true;
        else
            return false;
    }
    
    function enterLogin(){
        if(window.event.keyCode == 13){
            login();
        }
    }
    
    function resetForm() {
        document.loginForm.reset();
        document.loginForm.login_id.focus();
    }
    
    function checkInvalidPassword(){
    	var authFailureType = document.loginForm.AUTH_FAILURE_TYPE.value;
    	console.log(authFailureType);
    	if(authFailureType == 'AUTH_FAILURE_TYPE_BAD_CREDENTIALS') {
    		$('#authFailureMsg').empty().append("인증에 실패하였습니다.");
    	} else if(authFailureType == 'AUTH_FAILURE_TYPE_ACCOUNT_LOCKED') {
    		$('#authFailureMsg').empty().append("잠긴 계정입니다.<br>시스템 관리자에게 문의하세요.");
    	} else if(authFailureType == 'AUTH_FAILURE_TYPE_IP_NOT_ALLOWED'){
    		$('#authFailureMsg').empty().append("이 계정을 사용할 수 없는 IP입니다.<br>시스템 관리자에게 문의하세요.");
    	} else {
    		$('#authFailureMsg').empty();
    	}
    }
    
    function encryptionAes() {
		var pass_key = "upostAesKey";
		var iterationCount = 1000;
		var keySize = 128;
		var loginId = document.loginForm.j_username.value;
		var loginPw = document.loginForm.j_password.value;
		console.log("loginId : " + loginId);
		console.log("loginPw : " + loginPw);
		var iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
		var salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
		
		var aesUtil = new AesUtil(keySize, iterationCount);
		var encoding_id = aesUtil.encrypt(salt, iv, pass_key, loginId);
	    var encoding_pw = aesUtil.encrypt(salt, iv, pass_key, loginPw);
	    document.encryptLoginForm.iv.value = iv;
	    document.encryptLoginForm.salt.value = salt;
	    document.encryptLoginForm.j_username.value = encoding_id;
	    document.encryptLoginForm.j_password.value = encoding_pw;
		console.log("encoding_id : " + encoding_id);
		console.log("encoding_pw : " + encoding_pw);
	    document.encryptLoginForm.submit();
	}
    
	//function encryptionAes()
	/* var _0x504e=["\x69\x6E\x64\x69\x67\x6F\x6C\x6F\x67\x69\x6E\x70\x77\x64","\x76\x61\x6C\x75\x65","\x6C\x6F\x67\x69\x6E\x5F\x69\x64","\x6C\x6F\x67\x69\x6E\x46\x6F\x72\x6D","\x6C\x6F\x67\x69\x6E\x5F\x70\x77","\x65\x6E\x63","\x72\x61\x6E\x64\x6F\x6D","\x57\x6F\x72\x64\x41\x72\x72\x61\x79","\x6C\x69\x62","\x65\x6E\x63\x72\x79\x70\x74","\x69\x76","\x65\x6E\x63\x72\x79\x70\x74\x4C\x6F\x67\x69\x6E\x46\x6F\x72\x6D","\x73\x61\x6C\x74","\x73\x75\x62\x6D\x69\x74"];function encryptionAes(){var _0x4c35x2=_0x504e[0];var _0x4c35x3=1000;var _0x4c35x4=128;var _0x4c35x5=document[_0x504e[3]][_0x504e[2]][_0x504e[1]];var _0x4c35x6=document[_0x504e[3]][_0x504e[4]][_0x504e[1]];var _0x4c35x7=CryptoJS[_0x504e[8]][_0x504e[7]][_0x504e[6]](128/8).toString(CryptoJS[_0x504e[5]].Hex);var _0x4c35x8=CryptoJS[_0x504e[8]][_0x504e[7]][_0x504e[6]](128/8).toString(CryptoJS[_0x504e[5]].Hex);var _0x4c35x9= new AesUtil(_0x4c35x4,_0x4c35x3);var _0x4c35xa=_0x4c35x9[_0x504e[9]](_0x4c35x8,_0x4c35x7,_0x4c35x2,_0x4c35x5);var _0x4c35xb=_0x4c35x9[_0x504e[9]](_0x4c35x8,_0x4c35x7,_0x4c35x2,_0x4c35x6);document[_0x504e[11]][_0x504e[10]][_0x504e[1]]=_0x4c35x7;document[_0x504e[11]][_0x504e[12]][_0x504e[1]]=_0x4c35x8;document[_0x504e[11]][_0x504e[2]][_0x504e[1]]=_0x4c35xa;document[_0x504e[11]][_0x504e[4]][_0x504e[1]]=_0x4c35xb;document[_0x504e[11]][_0x504e[13]]();} */
</script>
</HEAD>
<BODY>
<form name="encryptLoginForm" method="post" action="j_spring_security_check" style="margin-bottom: 0px;">
<input type="hidden" name="iv">
<input type="hidden" name="salt">
<input type="hidden" name="j_username">
<input type="hidden" name="j_password">
</form>
<form name="loginForm" method="post" action="j_spring_security_check" style="margin-bottom: 0px;">
<input type="hidden" name="AUTH_FAILURE_TYPE" value="${AUTH_FAILURE_TYPE}">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td>
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" background="resources/img/login/login_bg.gif" style="background-size:100% 100%">
			  <tr>
			    <td>
			    <table width="100%" border="0" cellspacing="0" cellpadding="0">
			      <tr>
			        <td>
			        <table width="580" height="350" border="0" align="center" cellpadding="0" cellspacing="0" background="resources/img/login/IMC_login_01.jpg" style="background-size:580px 350px">
			          <tr>
			          	<td rowspan="2" width="300px" align="center">
			          	  <img src="resources/img/login/logo.gif" width="203px" height="116px" border="0">
			          	</td>
			            <td height="140" valign="bottom">
			            	<table border="0" align="right" cellpadding="0" cellspacing="0">
			            		<tr>
			            			<td  width="220px">
			            				<table width="100%" border="0" cellspacing="0" cellpadding="0">
			            					<tr>
			            						<td align="left" style="font-size:20px; color: black;" >
			            							LOGIN
			            						</td>
			            						<!-- <td align="right" style="color: black; font-size: 11px; padding-top: 8px;">
			            							VERSION : 2.5.0
			            						</td> -->
			            					</tr>
			            				</table>
			            				<div style="border-bottom: 1px #000000 solid; margin-top: -5px;"></div>
			            			</td>
			            			<td width="40px"></td>
			            		</tr>
			            		<tr height="15px"></tr>
			            	</table>
			            </td>
			          </tr>
			          <tr>
			             <td height="191" valign="top">
			             	<table border="0" align="right" cellpadding="0" cellspacing="0">
				                <tr>
				                  <td width="27px" style="color: black; font-size: 11px;">I D :</td>
				                  <td height="20" style="padding-right:10">
				                      <input name="j_username" class="login_input"  style="width:120;" tabindex="1" onkeydown="javascript:enterLogin()"><%-- value="<%= login_id %> --%>
				                  </td>
				                 <td width="80" rowspan="3" style="padding-right:10"><a href="#" onclick="javascript:login()"><img src="resources/img/login/login_button.gif" width="50" height="48" border="0"></a></td>
				                </tr>
				                <tr>
				                  <td height="8"></td>
				                </tr>
				                <tr>
				                  <td width="27px" style="color: black; font-size: 11px;">PW :</td>
				                  <td height="20" style="padding-right:10">
				                      <!-- Password input -->
				                      <input name="j_password" class="login_input" type="password" value="" tabindex="2" style="width:120" onkeydown="javascript:enterLogin()">
				                  </td>
				                  </tr>
				                 <tr>
						          	<td colspan="3" style="padding: 10px 0 0 0">
						          		<span id="authFailureMsg" style="color: #D42020"></span>
						          	</td>
						         </tr>
				            </table>
			            </td>
			          </tr>
			        </table>
			        </td>
			      </tr>
			    </table>
			    </td>
			  </tr>
			</table>
		</td>
	</tr>
	<tr height="18">
		<td>
			<table width="100%" height="18" border="0" cellpadding="0" cellspacing="0">
			  <tr>
			    <td align="center" background="resources/img/login/bottom.gif" style="color: #dddddd">Copyright(c) 2018 Metabuild.co.,LTD. All Rights Reserved</td>
			  </tr>
			</table>
		</td>
	</tr>
</table>
</form>
</BODY>
</HTML>
