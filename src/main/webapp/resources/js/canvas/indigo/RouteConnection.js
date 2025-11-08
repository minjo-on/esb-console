/**
 * @class MyConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
RouteConnection= draw2d.Connection.extend({
	
	NAME:"RouteConnection",
	
    init:function()
    {
      this._super();
      this.testSuccessCount = 0;
      this.testErrorCount = 0;
      this.setStroke(1);
      this.setRouter(new draw2d.layout.connection.SplineConnectionRouter());
      this.setTargetDecorator(this.craeteArrowDecorator());   
      this.setColor("#B8B8B7");
    },
    
    craeteArrowDecorator:function(){
    	var deco =  new draw2d.decoration.connection.ArrowDecorator();
        deco.setDimension(15,10);
        deco.setBackgroundColor("#B8B8B7"); 
        
        return deco;
    },
    
    setTestResult:function(isSuccess){
    	this.setStroke(4);
    	if(isSuccess){
    		this.setColor("#32EE0E");
    	}else{
    		this.setColor("#FF0000");
    	}
    },
    
    initTestResult:function(){
		this.testSuccessCount = 0;
	    this.testErrorCount = 0;
	    
	    if(this.testSuccessResultLabel !=null){
	    	this.testSuccessResultLabel.setText("");
	    	this.testSuccessResultLabel.setVisible(false);
	    }
	    if(this.testErrorResultLabel != null){
	    	this.testErrorResultLabel.setText("");
	    	this.testErrorResultLabel.setVisible(false);
	    }
	    if(this.labelRect != null){
	    	this.labelRect.setVisible(false);
	    }
	},
    
    setTestLabel:function(figure, successCount, failCount, meanProcessorTime){
    	if(this.labelRect == null){
    		this.createLabel();
		}else{
			this.labelRect.setVisible(true);
			this.testSuccessResultLabel.setVisible(true);
		    this.testErrorResultLabel.setVisible(true);
		    this.meanProcessorTimeLabel.setVisible(true);
		}
    	
    	var labelText = '성공:'+successCount;
    	this.testSuccessResultLabel.setText(labelText);
    	
    	labelText = '에러:'+failCount;
    	this.testErrorResultLabel.setText(labelText);
    	
    	labelText = '평균처리시간:'+meanProcessorTime+" ms";
    	this.meanProcessorTimeLabel.setText(labelText);
    },
    
    createLabel: function(){
    	this.labelRect =  new draw2d.shape.basic.Rectangle({x:0,y:00,width:110,height:59,bgColor:'#ffffff', alpha:0.7});
		this.labelRect.setColor("#FFFFFF");
		
		this.testSuccessResultLabel = new draw2d.shape.basic.Label({cssClass: "modeler-label"});
		this.testSuccessResultLabel.setColor("#32BD2A");
        this.testSuccessResultLabel.setFontColor("#32BD2A");
        this.testSuccessResultLabel.setFontSize(11);
        this.testSuccessResultLabel.setBold(true);
        
        this.testErrorResultLabel = new draw2d.shape.basic.Label({cssClass: "modeler-label"});
		this.testErrorResultLabel.setColor("#DA2121");
        this.testErrorResultLabel.setFontColor("#DA2121");
        this.testErrorResultLabel.setFontSize(11);
        this.testErrorResultLabel.setBold(true);
        
        
        this.meanProcessorTimeLabel = new draw2d.shape.basic.Label({cssClass: "modeler-label"});
		this.meanProcessorTimeLabel.setColor("#807e7e");
        this.meanProcessorTimeLabel.setFontColor("#807e7e");
        this.meanProcessorTimeLabel.setFontSize(11);
        this.meanProcessorTimeLabel.setBold(true);
        
        this.labelRect.add(this.testSuccessResultLabel, new draw2d.layout.locator.XYRelPortLocator(5,5));
        this.labelRect.add(this.testErrorResultLabel, new draw2d.layout.locator.XYRelPortLocator(5,32));
        this.labelRect.add(this.meanProcessorTimeLabel, new draw2d.layout.locator.XYRelPortLocator(5,59));
        
        this.add(this.labelRect, new draw2d.layout.locator.ManhattanMidpointLocator());
    },
    
    setColorByProcessTime:function(processTime){
    	
    }
});
