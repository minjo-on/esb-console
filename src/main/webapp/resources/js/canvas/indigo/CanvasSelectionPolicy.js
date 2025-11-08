CanvasSelectionPolicy = draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({

    NAME : "CanvasSelectionPolicy",
    
    /**
     * @constructor 
     * Creates a new selection policy
     */
    init: function(canvas)
    {
        this._super();
        
        // 복사한 figure를 담음
        this.oldSelectFigure = null;
        
        // 복사 command 객체를 담음
        this.copyCommand = null;
        
        this.selectFailed = true;
        
        this.canvas = canvas;
    },
    
    onRightMouseDown: function( figure, x, y, shiftKey, ctrlKey ){
    	var canvas = this.canvas;
    	var oldSelectFigure = this.oldSelectFigure;
    	
    	$.contextMenu({
            selector: 'body', 
            events:
            {  
                hide:function(){ $.contextMenu( 'destroy' ); }
            },
            callback: $.proxy(function(key, options) 
            {
               switch(key){
               case "addRoute":
            	   this.addRoute(canvas, x, y);
            	   break;
               case "errorHandler":
            	   this.addErrorHandler(canvas, x, y);
            	   break;
               case "addGroup":
            	   this.addGroup(x, y);
            	   break;
               case "removeGroup":
            	   this.removeGroup(figure);
                   break;
               case "copy":
            	   this.copy(canvas);
            	   break;
               case "paste":
            	   this.paste(canvas, x, y);
            	   break;
               case "delete":
            	   this.deleteFigure(figure);
            	   break;
               default:
                   break;
               }
            },this),
            x:x,
            y:y,
            items: 
            {
            	"addRoute": {
            		name: "Add Route"
            	},
            	"errorHandler": {
            		name: "Error Handler"
            	},
            	
            	//라우트로 대체
//            	"sep1":   "---------",
//                "addGroup": {
//                	name: "Add Group",
//                	disabled: function(key, opt) { 
//                		if(figure instanceof ModelerGroupFigure){
//                			return true;
//                		}
//                		
//                        return false;
//                    }
//                },
//                "removeGroup": {
//                	name: "Remove Group",
//                	disabled: function(key, opt) { 
//                		if(figure instanceof ModelerGroupFigure && figure.getAssignedFigures().getSize() > 0){
//                			return false;
//                		}
//                        return true;
//                    }
//                },
                "sep2":   "---------",
                "copy": {
                	name: "Copy"
                },
                "paste": {
                	name: "Paste",
                	disabled: function(key, opt) {
                		// 복사한 내용이 없으면 점멸상태
                        return !oldSelectFigure; 
                    }
                },
                "delete": {
                	name: "Delete",
                	disabled: function(key, opt) { 
                        return figure == null; 
                    }
                }
            }
        });
    },
    
    // 라우트 추가 기능
    addRoute: function(canvas, x, y) {
    	var routeFigure = new RouteFigure();
    	canvas.drawFigure(routeFigure, x, y);
    },
    
    // 에러 핸들러 추가 기능
    addErrorHandler: function(canvas, x, y) {
    	var componentConfigure = new Object();
    	componentConfigure["componentType"] = "errorHandler";
    	componentConfigure["alias"] = "Error Handler";
    	componentConfigure["tagName"] = "onException";
    	componentConfigure["useChild"] = "true";
    	
		var errorHandlerFigure = new ErrorHandlerFigure(componentConfigure);
		// 에러 핸들러에 필요한 파라미터를 세팅
    	errorHandlerFigure.getUserData().setData("exception", "java.lang.Exception");
    	errorHandlerFigure.getUserData().setData("redeliveryPolicy", "1");
    	errorHandlerFigure.getUserData().setData("continued", "true");
    	canvas.drawFigure(errorHandlerFigure, x, y);
    },
    
    // 복사
    copy: function(canvas) {
    	// canvas에서 선택한 모든 figure와 connection을 ArrayList로 생성
    	var selectFigures = canvas.getSelection().getAll();
    	this.oldSelectFigure = selectFigures;
    },
    
    // 붙여넣기
    paste: function(canvas, x, y) {
    	// copyCommand에 복사한 ArrayList로 객체 생성
    	this.copyCommand = new CopyCommand(canvas, this.oldSelectFigure);
    	// 현재 커서의 위치를 저장
    	this.copyCommand.setMoveXY(x, y);
    	// command 실행(붙여넣기)
	   	canvas.getCommandStack().execute(this.copyCommand);
    },
    
    addGroup:function(x, y){
    	var group = new ModelerGroupFigure("GROUP");
 	   
 	   	var command = null;
 	   	//group select error
 	    var selectFigures = this.canvas.getSelection().getAll();
 	    selectFigures.grep(function(figure){
 	    	return !(figure instanceof ModelerGroupFigure);
        });
 	    
 	   	if(selectFigures.getSize() > 0){
	 	   	//group size 계산
			var groupMinX = 0, groupMinY = 0, groupMaxX = 0, groupMaxY = 0;
			selectFigures.each(function(index, sizeFigure){
			   //0 일 때 초기값
			   if(index == 0){
				   groupMinX = sizeFigure.getX();
				   groupMinY = sizeFigure.getY();
				   groupMaxX = groupMinX+sizeFigure.getWidth();
				   groupMaxY = groupMinY+sizeFigure.getHeight();
			   }else{
				   if(groupMinX > sizeFigure.getX()){
	 			   groupMinX = sizeFigure.getX();
	 		   }else if(groupMaxX < sizeFigure.getX()){
	 			   groupMaxX = sizeFigure.getX() + sizeFigure.getWidth();
	 		   }
	 		   if(groupMinY > sizeFigure.getY()){
	 			   groupMinY = sizeFigure.getY();
	 		   }else if(groupMaxY < sizeFigure.getY()){
	 			   groupMaxY = sizeFigure.getY() + sizeFigure.getHeight();
	 		   }
			   }
			   return true;
		    });
			group.setX(groupMinX - 30);
			group.setY(groupMinY - 30);
			group.setWidth((groupMaxX - groupMinX) + 60);
			group.setHeight((groupMaxY - groupMinY) + 60);
			
			//커맨드 생성
			command = new draw2d.command.CommandGroup(this.canvas, selectFigures);
			 //그룹 컴포넌트 변경
			command.group = group;
 	   	}else{
 		   command = new draw2d.command.CommandAdd(this.canvas, group, x, y);
 	   	}
 	   	this.canvas.getCommandStack().execute(command);
    },
    
    removeGroup:function(figure){
    	var command = new draw2d.command.CommandUngroup(this.canvas, figure);
    	this.canvas.getCommandStack().execute(command);
    },
    
    deleteFigure:function(figure){
    	this.canvas.doDeleteFigure(figure);

    },
    
    onMouseWheel: function( wheelDelta, x, y, shiftKey, ctrlKey ) {
    	if(ctrlKey){
    		var zoomSize = this.canvas.getZoom();
    		if(wheelDelta > 0){
    			this.canvas.setZoom(zoomSize + 0.1);
    		}else{
    			this.canvas.setZoom(zoomSize - 0.1);
    		}
    		return false;
    	}
    }

}); 