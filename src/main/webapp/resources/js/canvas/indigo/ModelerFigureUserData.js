
ModelerFigureUserData = Class.extend({
	NAME : "ModelerFigureUserData",
    
	init : function(componentConfigure, useAutoId)
    {
		this.componentType	= componentConfigure.componentType;
    	this.alias = componentConfigure.alias;
    	if(useAutoId){
    		this.id = this.alias+"_"+getComponentSeq(this.componentType);
    	}
    	this.params = {};
    },
    
    setDataFromHtml: function(routeInfoInputHtml){
    	//input ID에 해당하는 변수를 생성하여 데이터를 넣는다
    	var inputHtml =  routeInfoInputHtml.find('input');
    	for(var i = 0 ; i < inputHtml.length; i++){
    		var formId = $(inputHtml[i]).attr('id');
    		
    		if(formId == "id"){
    			this.id = $(inputHtml[i]).val();
    		}
    		this.params[formId] = $(inputHtml[i]).val();
    	}
    	
    	//select ID에 해당하는 변수를 생성하여 데이터를 넣는다
    	var selectHtml = routeInfoInputHtml.find('select');
    	for(var i = 0 ; i < selectHtml.length; i++){
    		var formId = $(selectHtml[i]).attr('id');
    		//eval("this."+formId+"='"+$(selectHtml[i]).val()+"';");
    		
    		this.params[formId] = $(selectHtml[i]).val();
    	}
    	
    	//textarea ID에 해당하는 변수를 생성하여 데이터를 넣는다
    	var textareaHtml = routeInfoInputHtml.find('textarea');
    	for(var i = 0 ; i < textareaHtml.length; i++){
    		var formId = $(textareaHtml[i]).attr('id');
    		this.params[formId] = $(textareaHtml[i]).val();
    	}
    },
    
    setHtmlInputData: function(routeInfoInputHtml){
    	//input ID에 해당하는 데이터를 동적변수로 찾아서  input value로 세팅한다
    	var inputHtml =  routeInfoInputHtml.find('input');
    	for(var i = 0 ; i < inputHtml.length; i++){
    		var formId = $(inputHtml[i]).attr('id');
    		//$(inputHtml[i]).val(eval("this."+formId));
    		
    		if(this.params[formId] != null){
    			$(inputHtml[i]).val(this.params[formId]);
    		}
    	}
    	
    	//select ID에 해당하는 데이터를 동적변수로 찾아서  select value로 세팅한다
    	var selectHtml = routeInfoInputHtml.find('select');
    	for(var i = 0 ; i < selectHtml.length; i++){
    		var formId = $(selectHtml[i]).attr('id');
    		//var value = eval("this."+formId);
    		
    		var value = this.params[formId];
    		if(value != null){
    			$(selectHtml[i]).val(value);
    		}
    	}
    	
    	//textarea ID에 해당하는 데이터를 동적변수로 찾아서  select value로 세팅한다
    	var textareaHtml = routeInfoInputHtml.find('textarea');
    	for(var i = 0 ; i < textareaHtml.length; i++){
    		var formId = $(textareaHtml[i]).attr('id');
    		if(this.params[formId] != null){
    			$(textareaHtml[i]).val(this.params[formId]);
    		}
    		//$(textareaHtml[i]).val(params[formId]);
    	}
    },
    
    getMessageRouteName: function(){
    	return alias;
    },
    
    setPersistentAttributes: function(memento){
    	//서블리에서 넘어온 json 데이터를 key는 변수명 value는 데이터 값으로 넣는다
    	this.id = memento.id;
    	this.params = memento.params;
    	// split 컴포넌트일 경우 split 해야할 컴포넌트 정보를 생성
    	if(this.componentType == 'split') {
    		this.splitBeanId = memento.splitBeanId;
    		this.splitQueryId = memento.splitQueryId;
    		this.splitExpression = memento.splitExpression;
    	}
    },
    
    setData: function(key, value){
    	this.params[key] = value;
    },
    
    getData: function(key){
    	return this.params[key];
    },
    
    removeData: function(key) {
    	delete this.params[key];
    }
});
