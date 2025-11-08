<%@ page language="java" pageEncoding="utf-8"%>
<%--                             -*- Mode: Html -*- 
;; error.jsp --- 
;; Author          : Sang-Woo Han
;; Created On      : Fri Aug 31 20:18:57 2007
;; Last Modified By: Sang-Woo Han
;; Last Modified On: Tue Sep 18 13:24:46 2007
;; RCS             : $Id: error.jsp,v 1.1 2012/02/16 02:43:09 seo0859 Exp $
;; PVCS            : $Revision: 1.1 $
;; 
;; Copyright (C) Metabuild CO., LTD. R&D Center. 2007
;; 
;;
;; 
 --%>
<%@ page isErrorPage="true"%>
<HTML>
<HEAD>
<!-- 
<STYLE>
body {
	margin: .8em;
	font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #454545;
}
</STYLE>
 -->
</HEAD>
<BODY>
	<table border="0" width="100%" height="150px" style="margin-top: 100px;">
		<tr height="10px;">
			<td></td>
		</tr>
		<tr height="80px;" align="center">
			<td><img src="resources/img/error.png"></td>
		</tr>
		<tr height="60px;" align="center">
			<td><font>주소가 정확하지 않거나, 페이지에 에러가 발생하였습니다.<br /> 
			동일한 문제가 지속적으로 발생할 경우 관리자에게 문의 주시길 바랍니다.</font>
			</td>
		</tr>
	</table>

</BODY>
</HTML>
