ModelerComponentValidation = Class.extend({

    NAME : "ModelerComponentValidation",
    
    init:function(){
    	//설정이 없는것은 모든 라우트와 연결이 가능하다고 판단
		// 소스 노드가 연결 가능 한 노드인지 확인. rule[type] = [연결 type 리스트]
		this.accessChild = new Object();
		
		
		this.accessParent = new Object();
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
		this.accessChild['choice'] 		= ['when','otherwise']; 
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
		
		this.accessParent['when']		= ['choice'];
		this.accessParent['otherwise']	= ['choice'];
    },
    
    validateChild: function(parentType, childType){
    	var accessChildRules = this.accessChild[parentType];
    	var accessParent = this.accessParent[childType];

    	var accessValidation =false;
    	
    	//정의 안된것은 우선은 무조건 true
    	if(accessChildRules == null && accessParent == null){
    		accessValidation = true;
    	}
    	
    	//자식 노드 비교
    	$(accessChildRules).each(function (key, value){
    		if(value == childType){ 
    			accessValidation = true;
    			return false;
    		}
    	});
    	
    	//부모 노드 비교
    	$(accessParent).each(function (key, value){
    		if(value == parentType){ 
    			accessValidation = true;
    			return false;
    		}
    	});
    	
    	
    	return accessValidation;
    }
});