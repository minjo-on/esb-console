indigoDialog = {
		closeDialog: function(){
			$('#dashBoardDialog').modal("hide");
			$('#dashBoardDialogBody').empty();
		},
		
		openDialog: function(option){
			var title = option.title;
			var iconClass = option.iconClass;
			var body = option.body;
			var loadHtml = option.loadHtml;
			var width = option.width;
			var height = option.height;
			var callback = option.callback;
			var closeCallback = option.closeCallback;
			
			$('#dashBoardDialogTitle').text(title);
			$('#dashBoardDialogIcon').removeClass();
			$('#dashBoardDialogIcon').addClass(iconClass);

			if(width){
				$('#dashBoardDialog .modal-dialog').width(width);
			}else{
				$('#dashBoardDialog .modal-dialog').width("900");
			}
			
			if(height){
				$('#dashBoardDialog .modal-dialog').height(height);
			}
			
			$('#dashBoardDialog').on("shown.bs.modal", function(e){
				if(callback){
					callback();
				}
				$('#dashBoardDialog').unbind('shown.bs.modal');
			});
			
			if(body){
				$('#dashBoardDialogBody').append(body);
				$('#dashBoardDialog').modal("show");
			}
			
			if(loadHtml){
				$('#dashBoardDialogBody').load(loadHtml, function(){
					$('#dashBoardDialog').modal("show");
				});
			}
			
			if(closeCallback){
				$('#dashBoardDialog').on('hidden.bs.modal', function (e) {
					closeCallback();
					$('#dashBoardDialog').unbind('hidden.bs.modal');
				});
			}
		}
};