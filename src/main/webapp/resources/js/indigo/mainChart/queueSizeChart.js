var queueSizeChart = {

		chart:null,
		
		createChart:function(){
			queueSizeChart.chart = AmCharts.makeChart( "queuechart_ex", {
				  "type": "serial",
				  "theme": "none",
				  "valueAxes": [{
					  	"maximum": 20000,
				        "stackType": "regular",
				        "axisAlpha": 0.3,
				        "gridAlpha": 0
				    }],
				    "dataProvider": [],
				    "graphs": [{
//				        "lineColor": "#000",
				    	"lineColor": "#999999",
				        "lineThickness": 2,
//				        "dashLength": 3,
				        "fillAlphas": 1,
//				        "type": "step",
				        "type": "column",
				        /*"labelText": "MSG : [[value]] ",*/
				        "labelPosition": "right",
				        "valueField": "size",
				    }, {
				        "fillAlphas": 0.6,
				        "lineAlpha": 0,
				        "lineColor": "#F0F2F7",
				        "type": "column",
				        "showBalloon": false,
				        "valueField": "s",
				        "fixedColumnWidth": 60,
				    }, 
//				    {
//				        "fillAlphas": 0.6,
//				        "lineAlpha": 0,
//				        "lineColor": "#FDB300",
//				        "showBalloon": false,
//				        "type": "column",
//				        "valueField": "w",
//				        "fixedColumnWidth": 60,
//				    }, {
//				        "fillAlphas": 0.6,
//				        "lineAlpha": 0,
//				        "lineColor": "#FF634D",
//				        "showBalloon": false,
//				        "type": "column",
//				        "valueField": "e",
//				        "fixedColumnWidth": 60,
//				    }
				    ],
				    "rotate": true,
				    "categoryField": "name",
				    "categoryAxis": {
				    	"gridPosition": "start",
				        "axisAlpha": 0,
				        "gridAlpha": 0,
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});
		},
		update : function(){
			IndigoAjax.request({
				url: 'queueController?cmd=indigomq-jmx-list',
				params: {'server_no':'1','mbeanType':'Queue'},
				success: function(response) {
					var data = Ext.JSON.decode(response.responseText);
					var value = 0;
					for(var i = 0; i < data.mbeanlist.length; i++){
						value += data.mbeanlist[i].QueueSize;
					}
					queueSizeChart.chart.dataProvider = [{
						"name": '',
				        "size":value,
				        "s": 20000,
//				        "w": 6666,
//				        "e": 6667,
				    }];
					$("#queuechartCount").text(value);
					queueSizeChart.chart.validateData();
				}
			});
		},
		
		updateDemo:function(){
			var value = queueSizeChart.getRandom(2000, 5000);
			queueSizeChart.chart.dataProvider = [{
				"name": '',
		        "size":value,
		        "s": 6666,
//		        "w": 6666,
//		        "e": 6667,
		    }];
			$("#queuechartCount").text(value);
			queueSizeChart.chart.validateData();
		},
		
		getRandom: function(value, min){
			return Math.round(Math.random() * value) + min;
		},
		
		
		initHistoryPopup:function(){
			var chartColumns = [];
			for(var i = 0; i < serverCount; i++){
				chartColumns.push({
		    		"field": "ESB"+(i+1),
			        "title": "ESB#"+(i+1)
			    });
		    }
			
			var gridColumns = [];
			gridColumns.push({
				field:'timestamp',
				align:'center',
				width: '200',
				formatter:'gridFormatterHistoryPopupDate',
				title:'시간'
			});
			for(var i = 0; i < serverCount; i++){
				gridColumns.push({
					"formatter":"gridFormatterThousandsSeparator",
		    		"field": "ESB"+(i+1),
			        "title": "ESB#"+(i+1)+" 저장소"
			    });
		    }
			gridColumns.push({
				formatter:'gridFormatterThousandsSeparator',
				field:'total',
				title:'합계'
			});
			
				
			var popup = new HistoryPopupSupport({
				componentName:'brokerMonitor',
				allServer: true,
				dataColumns: 'size',
				chartColumns: chartColumns,
				gridColumns: gridColumns,
				parseChartRowData:function(data){
					var chartData = {};
					var serverData = null;
					for(var i = 0; i < data.length; i++){
						serverData = data[i];
						chartData["timestamp"] = serverData.timestamp;
						chartData["ESB"+serverData.serverNo] = serverData.size;
					}
					return chartData;
					
				},
				parseGridRowData:function(data){
					var gridRow = {};
					var serverData = null;
					var totalSize = 0;
					for(var i = 0; i < data.length; i++){
						serverData = data[i];
						gridRow["timestamp"] = serverData.timestamp; 
						gridRow["ESB"+serverData.serverNo] = serverData.size;
						
						totalSize += serverData.size;
					}
					gridRow["total"] = totalSize; 
					return gridRow;
				}
			});
			
			popup.loadData(formatDate(new Date(), 'yyyy-MM-dd'));
		}

};

