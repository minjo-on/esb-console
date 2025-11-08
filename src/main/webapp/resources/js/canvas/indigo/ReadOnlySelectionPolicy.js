ReadOnlySelectionPolicy = draw2d.policy.canvas.ReadOnlySelectionPolicy.extend({
	NAME:"ReadOnlySelectionPolicy",
	
	init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },
    
    onInstall: function(canvas)
    {
        this._super(canvas);
        _canvas = canvas;
        canvas.getAllPorts().each(function(i,port){
            port.setVisible(false);
        });
    },
    
    onUninstall: function(canvas)
    {
        canvas.getAllPorts().each(function(i,port){
            port.setVisible(true);
        });

        this._super(canvas);
    },
    
    /*onMouseMove: function(canvas, x, y, shiftKey, ctrlKey){
    	//console.log(canvas);
    	var figures = canvas.figures.data;
    	var tip = Ext.create('Ext.tip.ToolTip', {
			trackMouse:true,
		    target:figures[0],
		    html: 'test',
		});
    	
    	for(var i=0;i<figures.length;i++){
    		if((figures[i].x < x && x < figures[i].x + figures[i].width) && (figures[i].y < y && y < figures[i].y + figures[i].height)){
    			console.log(tip.isVisible());
    			if(tip.isVisible()){
    				tip.hide();
    			}
    			tip.showAt([420+figures[i].x,220+figures[i].y]);
    			console.log(tip.isVisible());
    			return;
    		}
    	}
    	
    	for(var i=0;i<figures.length;i++){
    		if(!((figures[i].x < x && x < figures[i].x + figures[i].width) && (figures[i].y < y && y < figures[i].y + figures[i].height))){
    			if(tip.isVisible()){
    				tip.hide();
    			}
    			return;
    		}
    	}
    },*/
    
    onDoubleClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
    	/*var id = figure.userData.id;
    	var componentType = figure.userData.componentType;
    	$.ajax({
			url : "serviceMonitorController?cmd=monitor-managerment-jmx-component-attr",
			type : "post",
			dataType : "json",
			data : "server_no="+figure.canvas.server_no+"&serviceName="+figure.canvas.serviceName+"&id="+id+"&componentType="+componentType,
			success : function( msg ) {
				//var msg = Ext.JSON.decode(response.responseText);
		    	if(msg.resultMsg == 'NOTEXIST'){
		    		Ext.Msg.show({
    					title:'서비스 현황',
    					msg: 'processors에 없는 컴포넌트입니다.',
    					buttons: Ext.Msg.OK,
    					icon: Ext.Msg.WARN
    				});
		    		return;
		    	}
		    	
		    	Ext.define('attrGrid',{
		    		extend:'Ext.grid.property.Grid',
		    		alias:'widget.attrGrid',
		    		renderTo:Ext.getBody(),
		    		nameColumnWidth:250,
		    		source:{
		    			ExchangesCompleted:msg.ExchangesCompleted,
		    			ExchangesFailed:msg.ExchangesFailed,
		    			ExchangesTotal:msg.ExchangesTotal,
		    			LastProcessingTime:msg.LastProcessingTime,
		    			MaxProcessingTime:msg.MaxProcessingTime,
		    			MeanProcessingTime:msg.MeanProcessingTime,
		    			MinProcessingTime:msg.MinProcessingTime,
		    			TotalProcessingTime:msg.TotalProcessingTime
		    		},
		    		listeners:{
		    			beforeedit:function(grid){
		    				return false;
		    			}
		    		}
		    	})
		    	
		    	var dialog = new Ext.Window({
		    		id:'attrDialog',
		    		title:'서비스 현황 - '+id,
		    		width:500,
		    		height:300,
		    		bodyStyle:"background-color: white",
			        bodyPadding:"0 0 0 0",
			        bodyStyle:{"border":"0px"},
			        resizable: false,
			        modal: true,
			        layout:'fit',
			        items:[{
			        	xtype:'attrGrid'
			        }]
		    	});
		    	
		    	dialog.show();
			},
			error : function(xhr, ajaxOptions, thrownError) {
			}
		});*/
    	
    }
});