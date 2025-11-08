<%@page import="java.io.FileInputStream"%>
<%@page import="java.util.Properties"%>
<%@page import="com.indigo.web.common.IndigoWebConstants"%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="java.io.File"%>
<%@page import="javax.servlet.ServletContext"%>

<%
response.setHeader("Pragma","No-cache");
response.setDateHeader ("Expires", 0);
response.setHeader ("Cache-Control", "no-cache");

if(session == null || session.getAttribute(IndigoWebConstants.SESSION_LOGIN_USER_INFO) == null) {
	/* ServletContext context = request.getSession().getServletContext();
	String realFolder = context.getRealPath("WEB-INF/classes");
	File file = new File(realFolder,"jdbc.properties");
	Properties prop = new Properties();
	prop.load(new FileInputStream(file));
	if(prop.get("jdbc.install") != null){
		request.getRequestDispatcher("install.jsp").forward(request, response);
	}else{
		request.getRequestDispatcher("login.jsp").forward(request, response);
	} */
	
	request.getRequestDispatcher("/indexController?cmd=check-login&login_id=admin&login_pw=indigo1&dashboard=no").forward(request, response);
} else {
	response.sendRedirect(request.getContextPath() + "/indexController?cmd=intro");
}
%>