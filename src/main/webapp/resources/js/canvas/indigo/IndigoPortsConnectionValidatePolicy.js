IndigoPortsConnectionValidationPolicy = draw2d.policy.port.PortFeedbackPolicy.extend({

    NAME : "IndigoPortsConnectionValidationPolicy",
    
    init:function(){
    	this._super();
    	//설정이 없는것은 모든 라우트와 연결이 가능하다고 판단
		// 소스 노드가 연결 가능 한 노드인지 확인. rule[type] = [연결 type 리스트]
		this.connectionRule = new Object();
		this.notConnectionRule = new Object();
		//endpoint
		/*this.rule['timer'] 			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when'];
		this.rule['cxfrs']			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['xslt']			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['cxf']			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['file'] 			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['process'] 		= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['bean'] 			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['log'] 			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['indigomq'] 		= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['jdbc'] 			= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['setbody'] 		= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
		this.rule['setheader'] 		= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when']; 
	*/	
		
		//route
		//this.rule['split'] 			= ['internal']; 
		this.connectionRule['choice'] 		= ['when','otherwise']; 
		//this.rule['when'] 			= ['internal']; 
		//this.rule['otherwise'] 		= ['internal']; 
		//this.rule['multicast'] 		= ['internal']; 
		//this.rule['aggregator'] 	= ['internal']; 
		//this.rule['routingslip']	= ['internal']; 
		//this.rule['recipientlist'] 	= ['internal']; 
		//this.rule['loadBalance'] 	= ['internal']; 

		//internal route              ['timer','xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when','otherwise'];
		//this.rule['internal'] 		= ['xslt','rest','webservice','file','process','bean', 'log', 'customuri','indigomq','jdbc','aggregator','multicast','setbody','setheader','split','when','otherwise']; 
	
//		this.interanlConnectionRequireNode = new Object();
//		this.interanlConnectionRequireNode = ['when','otherwise','multicast','split'];
    },
    
    onHoverEnter: function(canvas, sourcePort, targetPort){
    	if(!this.isValidateSourceNode(sourcePort,targetPort)){
			targetPort.setGlow(true, "#FF0000");
    	}else{
    		targetPort.setGlow(true, "#32FF00");
    	}
    },
    
    onHoverLeave: function(canvas, draggedFigure, hoverFiger){
    	hoverFiger.setGlow(false);
    },
    
    isValidateSourceNode : function (sourcePort, targetPort)
	{
    	var sourceFigure = sourcePort.getParent();
		var targetFigure = targetPort.getParent();
		
//		if(targetFigure instanceof ModelerGroupFigure || sourceFigure instanceof ModelerGroupFigure){
//			return true;
//		}else{
//			if(sourceFigure.getGroupBoxId() == null 
//	    			&& targetFigure.getGroupBoxId() != null){
//	    	
//	    		return false;
//	    	}else if(sourceFigure.getGroupBoxId() != null &&
//					sourceFigure.getGroupBoxId() != targetFigure.getGroupBoxId()){
//	    	
//				return false;
//	    	}
//		}
		
		//rule connection validate
    	var sourceFigureName = sourceFigure.componentType;
		var targetFigureName = targetFigure.componentType;
		
		if(this.connectionRule[sourceFigureName] != null){//연결 가능한 노드
			var len = this.connectionRule[sourceFigureName].length;
			for(var i=0; i<len; i++){
				tmp = this.connectionRule[sourceFigureName][i];
				if (targetFigureName  ==  tmp){
					return true;
				}
			}
			
			return false;
		}else if(this.notConnectionRule[sourceFigureName] != null){//연결 불가능한 노드
			var len = this.notConnectionRule[sourceFigureName].length;
			for(var i=0; i<len; i++){
				tmp = this.notConnectionRule[sourceFigureName][i];
				if (targetFigureName  ==  tmp){
					return false;
				}
			}
			
			return true;
		}else{
			//validation 설정이 없는것은 모든 연결이 가능하다고 판다
			return true;
		}
		
	},
	
	isDuplicateLine : function (sourcePort, targetPort)
	{
		var srcNodeId = sourcePort.getParent().id;
		
		for(var i=0;i<targetPort.getConnections().getSize();i++){
			tmpId = targetPort.getConnections().get(i).getSource().getParent().id;
			if (srcNodeId == tmpId){
				return false;
			}
		}
		
		return true;
	},
});