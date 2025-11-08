<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.indigo.web.common.IndigoWebConstants"%>
<%@page import="com.indigo.web.common.Utils"%>
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

<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    
    <!-- browser tab icon & title-->
    <link rel="shortcut icon" href="resources/img/favicon.ico">
    <title>+++ Mesim ESB <%=version %> +++</title>
    
    <!-- commons -->
    <script src="resources/common.js"></script>
    <script src="resources/js/indigo/util/convert.js"></script>
   	
   	<!-- ext include -->
	<%@include file="index.html"%>
	
   	<!-- #### CSS #### -->
   	
    <!-- indigo custom -->
    <link rel="stylesheet" href="resources/css/indigo.css">
	<link rel="stylesheet" href="resources/css/indigoDashboard.custom.css">
	<link rel="stylesheet" href="resources/IndigoESBWebConsoleCustom.css">
    <link rel="stylesheet" href="resources/css/buttonSegment.css"> 
    
    <!-- code mirror -->
    <link rel="stylesheet" href="resources/codemirror/codemirror.css">
    <link rel="stylesheet" href="resources/codemirror/addon/merge/merge.css">
    
    <!-- icon -->
    <link rel="stylesheet" href="resources/fonts/font-awesome-4.5.0/css/font-awesome.css">
	
	<!-- 메인화면 에이전트, 어댑터 현황 테마 css -->
	<link rel="stylesheet" href="resources/css/theme/cartoon.css" />
	<link rel="stylesheet" href="resources/css/theme/default.css" />
	<link rel="stylesheet" href="resources/css/theme/red.css" />
	<link rel="stylesheet" href="resources/css/theme/fancy-blue.css" />
	<link rel="stylesheet" href="resources/css/theme/gray.css" />
	
	<!-- 브로커 관리 사용 공간 모니터링 bootstrap css -->
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
	<link type="text/css" rel="stylesheet" href="resources/bootstrap/css/KAdmin.css">
    
    
    <!-- #### SCRIPT #### -->
    
    <!-- ext validation -->
	<script src="resources/js/ext_ux/validation.js"></script>
    
    <!-- jquery -->
    <script src="resources/jquery-1.11.3.min.js"></script>
    
    <!-- bootstrap -->
    <script src="resources/bootstrap/js/bootstrap.min.js"></script>
    
    <!-- amchar -->
    <script src="resources/amcharts_3.14.2/amcharts/amcharts.js"></script>
    <script src="resources/amcharts_3.14.2/amcharts/gauge.js"></script>
    <script src="resources/amcharts_3.14.2/amcharts/pie.js"></script>
    <script src="resources/amcharts_3.14.2/amcharts/serial.js"></script>
    <script src="resources/amcharts_3.14.2/amcharts/xy.js"></script>
    <script src="resources/js/indigo/mainChart/queueSizeChart.js"></script>
    
    <!-- codmirror -->
    <script src="resources/codemirror/codemirror.js"></script>
    <script src="resources/codemirror/mode/xml/xml.js"></script>
    <script src="resources/codemirror/mode/css/css.js"></script>
	<script src="resources/codemirror/mode/javascript/javascript.js"></script>
	<script src="resources/codemirror/mode/htmlmixed/htmlmixed.js"></script>
	<script src="resources/codemirror/diff_match_patch.js"></script>
    <script src="resources/codemirror/addon/dialog/dialog.js"></script>
    <script src="resources/codemirror/addon/search/searchcursor.js"></script>
	<script src="resources/codemirror/addon/search/search.js"></script>
	<script src="resources/codemirror/addon/scroll/annotatescrollbar.js"></script>
	<script src="resources/codemirror/addon/search/matchesonscrollbar.js"></script>
	<script src="resources/codemirror/addon/search/jump-to-line.js"></script>
	<script src="resources/codemirror/addon/merge/merge.js"></script>
	
	<!-- draw2d -->
	<script src="resources/js/canvas/draw2d_v6.1.40/shifty.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/raphael.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/rgbcolor.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/StackBlur.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/canvg.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/Class.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/json2.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/draw2d.js"></script>
	<script src="resources/js/canvas/draw2d_v6.1.40/pathfinding-browser.min.js"></script>
	
	<!-- draw2d custom-->
	<script src="resources/js/canvas/indigo/CanvasSelectionPolicy.js"></script>
	<script src="resources/js/canvas/indigo/CopyCommand.js"></script>
	<script src="resources/js/canvas/indigo/CopyInterceptorPolicy.js"></script>
	<script src="resources/js/canvas/indigo/IndigoInputPort.js"></script>
	<script src="resources/js/canvas/indigo/IndigoModelerCanvas.js"></script>
	<script src="resources/js/canvas/indigo/IndigoOutputPort.js"></script>
	<script src="resources/js/canvas/indigo/IndigoPortsConnectionValidatePolicy.js"></script>
	<script src="resources/js/canvas/indigo/ModelerFigureUserData.js"></script>
	<script src="resources/js/canvas/indigo/ModelerGroupFigure.js"></script>
	<script src="resources/js/canvas/indigo/ModelerSelectionFeedbackPolicy.js"></script>
	<script src="resources/js/canvas/indigo/RightBottomLocator.js"></script>
	<script src="resources/js/canvas/indigo/RouteConnection.js"></script>
	<script src="resources/js/canvas/indigo/RouteGroupInputLocator.js"></script>
	<script src="resources/js/canvas/indigo/ReadOnlySelectionPolicy.js"></script>
	<script src="resources/js/canvas/indigo/figure/ModelerFigure.js"></script>
	<script src="resources/js/canvas/indigo/figure/ComponentFigure.js"></script>
	<script src="resources/js/canvas/indigo/figure/ComponentGroupFigure.js"></script>
	<script src="resources/js/canvas/indigo/figure/RouteFigure.js"></script>
	<script src="resources/js/canvas/indigo/figure/ModelerFigureTitle.js"></script>		
	<script src="resources/js/canvas/util/ModelerComponentValidation.js"></script>
	<script src="resources/js/canvas/util/commonutil.js"></script>
	        
	        
	<script src="resources/aes/aes.js"></script>
	<script src="resources/aes/pbkdf2.js"></script>
	<script src="resources/aes/AesUtil.js"></script>
	
	<!-- 커스텀 컨트롤러 추가 -->
	<script src="resources/FileTransferManager.js"></script>
	<!-- <script src="resources/siteCustomConfig.js"></script> -->
	<script src="resources/AtbConfig.js"></script>
    <script src="resources/DbSelectManager.js"></script>
<style type="text/css">
.custom-glyph-button .x-btn-icon-el {
    font-size: 16px !important;
    vertical-align: middle !important; /* Better for vertical alignment */
}

.x-column-header {
	background-image:url('resources/images/grid/column-header-bg.gif') !important;
}

.searchRadius .x-form-trigger-wrap .x-form-text{
border-radius: 3px !important;
}

.indigoInput .x-btn-wrap{
height: 24px;
padding: 3px 0px 0px 3px;
}
.x-image-view{
    font: 11px Arial, Helvetica, sans-serif;
}
.x-image-view .thumb{
    /* padding:3px;
    */
    
	 background-color: #f3f3f3;
	 padding:2px;
	 border-bottom:1px solid #d0d0d0;
	 text-align:left;
	 vertical-align: middle;
}
.x-image-view .thumb-img{
	width:37px; 
	height:30px; 
	padding-right:7px;
	vertical-align: middle;
}

.x-image-view .thumb-wrap{
    float: left;
    margin: 4px;
    margin-right: 0;
    padding: 5px;
}
.x-image-view .thumb-wrap span{
    display: block;
    overflow: hidden;
    text-align: center;
    width: 76px; /* for ie to ensure that the text is centered */
}
.x-image-view .x-item-selected .thumb {
    background:#8db2e3;
}
.x-image-view .loading-indicator {
    font-size:8pt;
    background-image:url(../../resources/images/default/grid/loading.gif);
    background-repeat: no-repeat;
    background-position: left;
    padding-left:20px;
    margin:10px;
}

.adaptor-menu-db{
	background-image: url('./resources/img/bean/dbcp.png') !important;
	background-size: 16px;
}

.adaptor-menu-mq{
	background-image: url('./resources/img/bean/mq.png') !important;
	background-size: 16px;
}

.adaptor-menu-pro{
	background-image: url('./resources/img/bean/custombean.png') !important;
	background-size: 16px;
}

.adaptor-menu-sch{
	background-image: url('./resources/img/bean/cxf.png') !important;
	background-size: 16px;
}

.adaptor-menu-network{
	background-image: url('./resources/img/bean/cxfrs.png') !important;
	background-size: 16px;
}

.cell-red{
	color : red !important;
}
.cell-red:hover{
	text-decoration: underline;
}
.cell-green{
	color : green !important;
}
.cell-green:hover{
	text-decoration: underline;
}
.cell-blue{
	color: #146eb4 !important
}
.cell-blue:hover, .click-blue {
	color: #ED7B20 !important; 
	text-decoration: underline;
}

.font-normal:hover, .notH-font-normal{
	font-weight: normal;
}

.my-disabled-panel {
     opacity: .80;
    -moz-opacity: .80;
    filter: alpha(opacity=80);
    color: black;
 }

.row-hend .x-grid-cell{
	cursor:pointer;
}

.indigo-pointer{
	cursor:pointer;
}

.indigo-pointer:hover{
	background-color: #ECB478 !important;
}

.indigo-pointer:hover .x-tree-node-text{
	color: #FFFFFF;
}

.indigo-sub-treemenu .x-grid-cell-inner.x-grid-cell-inner-treecolumn{
	padding:0px;
	font-size: false;
}
.indigo-main-grid .x-grid-cell-inner{
color:#7D7B7B;
padding:5px;
}
/* glyph color */
.x-btn-default-toolbar-small .x-btn-glyph{
    color: #FE6900 !important;
}
.x-btn-default-small .x-btn-glyph{
 	color: #FE6900 !important; 
}
.x-menu-item-glyph{
    color: #FE6900 !important;
}
.glyphIconBtnRed .x-btn-glyph {
    color: red !important;
}
.glyphIconBtnGreen .x-btn-glyph {
    color: green !important;
}
/* glyph color */

.indigo-cursor{
	cursor:pointer
}

.indigo_required {
	text-align: right;
	padding-right: 30px;
	background: transparent url(resources/img/bullet_star.png) no-repeat right;
}

.x-toolbar-default {
    background-color: #f1f1f1 !important;
    background-image: -webkit-linear-gradient(top,#f1f1f1,#f1f1f1) !important;
}
.legendFieldSet .x-tool-toggle {
	background-image: url(resources/img/icon1.png) !important;
	width: 6px; height: 14px;
    background-position: 0 -255px !important; /*the minus sign*/
}

.legendFieldSet.x-fieldset-collapsed .x-tool-toggle {
    background-position: 0 -240px !important; /*the plus sign*/
}
.north_color{
	/* color: #ffffff */
	color: #a7a9ac
}

.north_login{
	color: #FFCC00;
	cursor: pointer;
	/* color: #F57F20 */
}

.indigo_fieldLabel_right{
	text-align: right;
	padding-right: 30px;
}

.indigo_fieldLabel_left{
	text-align: left;
	margin: 0;
	padding: 0;
	border: 0;
	height: 22px;
	line-height: 22px;
	font: normal 11px/13px tahoma,arial,verdana,sans-serif;
}

.othreRow .x-grid-cell{
	vertical-align: middle; height: 30px;
	 border-left: 1px;
}
.customTab > div{
	/* background-image: -webkit-linear-gradient(top,#F57E20,#F57E20) !important;
	background-image: url(resources/img/batang.png) !important; */
}
.titleBullet{
	/* background-image: url(resources/img/bullet_green.gif) !important;
	background-size: 16px; */
	background-image: url(resources/img/icon1.png) !important;
	width: 6px; height: 14px;
}
.select-file{
	background-image: url(resources/img/toolbar/image_add.png) !important;
	background-size: 16px;
}
.upload{
	background-image: url(resources/img/toolbar/Upload.png) !important;
	background-size: 16px;
}
.download{
	background-image: url(resources/img/download.png) !important;
	background-size: 16px;
}
.folder{
	background-image: url(resources/img/toolbar/Folder.png) !important;
	background-size: 16px;
}
.modify{
	background-image: url(resources/img/toolbar/Modify.png) !important;
	background-size: 16px;
}
.update{
	background-image: url(resources/img/toolbar/OK.png) !important;
	background-size: 16px;
}
.edit{
	background-image: url(resources/img/icon/edit.gif) !important;
	background-size: 16px;
}
.control{
	background-image: url(resources/img/icon/Wrench.png) !important;
	background-size: 16px;
}
.dbcp{
	background-image: url(resources/img/icon/Database.png) !important;
	background-size: 16px;
}
.db{
	background-image: url(resources/img/icon/dbcp.png) !important;
	background-size: 16px;
}
.jms{
	background-image: url(resources/img/icon/mq.png) !important;
	background-size: 16px;
}
.text{
	background-image: url(resources/img/icon/Text.png) !important;
	background-size: 16px;
}
.delete{
	background-image: url(resources/img/toolbar/Trash.png) !important;
	background-size: 16px;
}
.deploy{
	background-image: url(resources/img/toolbar/Update.png) !important;
	background-size: 16px;
}
.start{
	background-image: url(resources/img/toolbar/Play.png) !important;
	background-size: 16px;
}
.stop{
	background-image: url(resources/img/toolbar/Stop.png) !important;
	background-size: 16px;
}
.ok{
	background-image: url(resources/img/toolbar/OK.png) !important;
	background-size: 16px;
}
.cancel{
	background-image: url(resources/img/toolbar/No.png) !important;
	background-size: 16px;
}
.refresh{
	background-image: url(resources/img/toolbar/arrow_refresh.png) !important;
	background-size: 16px;
}
.search{
	background-image: url(resources/img/toolbar/Find.png) !important;
	background-size: 16px;
}

.back{
	background-image: url(resources/img/toolbar/Back.png) !important;
	background-size: 16px;
}

.add{
	background-image: url(resources/img/toolbar/Create.png) !important;
	background-size: 16px;
}
.test_img{
	background-image: url(resources/img/title_panel_top.png) !important;
	background-size: 755px 50px;
	background-repeat:no-repeat;
	background-color: #ED7B20 !important;
}
.copy{
	background-image: url(resources/img/toolbar/Copy.png) !important;
	background-size: 16px;
}
.bload{
	background-image: url(resources/img/toolbar/Copy.png) !important;
	background-size: 16px;
}
.restart{
	background-image: url(resources/img/menu/resourceConfig.png) !important;
	background-size: 16px;
}
.request{
	background-image: url(resources/img/icon/test.gif) !important;
	background-size: 16px;
}
.transmit{
	background-image: url(resources/img/icon/Message.png) !important;
	background-size: 16px;
}

.header_child_title{
	font-size: 13px;
    font-weight: normal;
    top: 22px!important;
    padding-left: 7px;
}
.header_child_title_w{
	font-size: 15px;
    font-weight: bold;
    top: 13px !important;
    /* left: 145px !important; */
    /* padding-left: 7px; */
    color: #FEFDFD;
}     

.header_child_title_w_over{
	font-size: 15px;
    font-weight: bold;
    top: 13px !important;
    color: #FEFDFD;
    cursor:pointer;
    text-decoration: underline;
}

.header_img{
	width: 5px;
    height: 20px;
    background-position: center center;
    top: 14px !important;
    left: 12px !important;
}

.header_title{
	margin: 0px 0px 0px 15px;
    font-size: 26px;
    font-weight: bold;
}
.header_title_w{
	margin: 0px 0px 0px 15px;
    font-size: 20px;
    font-weight: bold;
    color: #FEFDFD;
    top: 8px !important;
    left: 25px !important;
}
.x-custom-trigger {
    background: url(resources/img/custom_trigger.gif) !important;
    height:34px !important;
}
.myContainer {
    border-radius: 4px;
    border: 2px solid #E5E5E5 !important;
}
.indigo-border-radius input{
	 border-radius: 20px;
}
.checkNotValidation .x-form-required-field.x-form-text{
border-color: #c30;
}
.checkValidation .x-form-required-field.x-form-text{
border-color: green;
}

.x-tool-img{
height:16px;
}		

/**main
* error graph color
**/
.progress .progress-bar.progress-bar-danger {
  background-color: #999999 !important;
  height: 10px; 
}
/**main
* graph bar
**/
.progress.progress-sm {
  height: 10px;
  margin-top: 5px;
}
/**main
* notify success box
**/
.alert-success{
	color: #686B68;
	background-color: #FFFFFF;
	border-color:#F0F2F7;
}
.alert-info {
	color: #686B68;
	background-color: #FFFFFF;
	border-color:#F0F2F7;
}

/**main
* main Box radius 
**/
.panel {
  border-radius: 5px !important;
}
.portlet {
  border-radius: 5px !important;
}
.portlet.box > .portlet-header {
    border-top-right-radius: 5px !important;
    border-top-left-radius: 5px !important;
}
.portlet .portlet-body {
    border-bottom-right-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
}
ul.todo-list li {
	border: 1px solid;
	border-color: #F0F2F7;
} 
.alignRight .x-boundlist-item{
    text-align: right;
}

/* .t input{
	margin-left: 15px;
}

.tttt{
	margin-top: 11px;
	margin-left: -16px;
} */
</style>
<script type="text/javascript">
var dashboardParam = '<%=request.getParameter("cmd")%>';
var dashboardStatus = '<%=request.getParameter("status_cd")%>';
var dashboardInid = '<%=request.getParameter("in_id")%>';
var dashboardPdAlias = '<%=request.getParameter("pd_alias")%>';
var dashboardPdName = '<%=request.getParameter("pd_name")%>';
var dashboardPdid = '<%=request.getParameter("pd_id")%>';

var dashboardStaDate = '<%=request.getParameter("sta_date")%>';
var dashboardStaHour = '<%=request.getParameter("sta_hour")%>';
var dashboardStaMin = '<%=request.getParameter("sta_min")%>';

var dashboardEndDate = '<%=request.getParameter("end_date")%>';
var dashboardEndHour = '<%=request.getParameter("end_hour")%>';
var dashboardEndMin = '<%=request.getParameter("end_min")%>';
</script>
</head>
<body>
<form name="form"></form></body>
</html>
