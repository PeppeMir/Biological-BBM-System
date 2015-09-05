var performGet = true; //trick ;)
var graphinterval=15;
var error=-1; //0 =c'è stato un errore

$(function () {
            $("#draggable1").draggable({
                grid: [10, 10],
                snap: ".ui-widget-header",
                snap: true
            });
            $("#draggable2").draggable({
                grid: [10, 10],
                snap: ".ui-widget-header",
                snap: true
            });
            $("#draggable3").draggable({
                grid: [10, 10],
                snap: ".ui-widget-header",
                snap: true
            });

});

var selectedSensor = -1; //default value is set as the first of the given list

$(function () {
   $("#sensors").change(function () {
       var current = $("#spinner").spinner("value");
       $("#spinner").spinner("value", current);
       $("#select-result").text($(this).val());
       selectedSensor = $(this).val();
   });
});

function updatePos(m, t, l) {
   if ((t != null) && (l != null) && performGet) { //the given pos is null if the sensor is never been relocated
   	$("#draggable" + m).css({top: t + "px", left: l + "px", position:'absolute'});
   }
}

$(document).ready(function () {
	
	$.post(
           "./php/GetThreshold.php?",
           function (data) { 
           		var q = data.split(",");
           		$( "#spinnertmin").spinner( "value",q[0]);
               $( "#spinnertmax").spinner( "value",q[1]);
               $( "#spinnerhmin").spinner( "value",q[2]);
               $( "#spinnerhmax").spinner( "value",q[3]);
           }
   );
   
   var drawdata = {
       labels: [],
       datasets: [{
           fillColor: "rgba(2,72,131,0.8)",
           strokeColor: "#000000",
           pointColor: "rgba(220,220,220,1)",
           pointStrokeColor: "#000000",
           data: []
       }, {
           fillColor: "rgba(15,105,96,0.5)",
           strokeColor: "#000000",
           pointColor: "rgba(151,187,205,1)",
           pointStrokeColor: "#000000",
           data: []
       }]
   }

   var optionsAnimation = {
       //Boolean - If we want to override with a hard coded scale
       scaleOverride: true,
       //** Required if scaleOverride is true **
       //Number - The number of steps in a hard coded scale
       scaleSteps: 10,
       //Number - The value jump in the hard coded scale
       scaleStepWidth: 10,
       //Number - The scale starting value
       scaleStartValue: 0,
       	scaleFontColor : "#000000",
       	   scaleGridLineColor : "#808080"
   }

   // Not sure why the scaleOverride isn't working...
   var optionsNoAnimation = {
       animation: false,
          scaleGridLineColor : "#5F5F5F",
       //Boolean - If we want to override with a hard coded scale
       scaleOverride: true,
       //** Required if scaleOverride is true **
       //Number - The number of steps in a hard coded scale
       scaleSteps: 20,
       //Number - The value jump in the hard coded scale
       scaleStepWidth: 10,
       //Number - The scale starting value
       scaleStartValue: 0
   }

   //Get the context of the canvas element we want to select
   var ctx = document.getElementById("Chart").getContext("2d");
   //ctx.canvas.width  = window.innerWidth;
   //ctx.canvas.height = window.innerHeight;
   

   var optionsNoAnimation = {
       animation: false,
       scaleFontColor : "#000000",
       scaleGridLineColor : "#5F5F5F"
   }

   var myNewChart = new Chart(ctx);
   myNewChart.Line(drawdata, optionsAnimation);

function doGraphPreparation(lines) {
               var arrayTemp = new Array();
               var arrayHum = new Array();
               var arrayXass = new Array();
               var quadruple;

               for (var i = 0; i < lines.length; i++) {
                   if (lines[i] == "")
                       continue;

                   quadruple = lines[i].split(",");
                   arrayXass.push(quadruple[1]);
                   arrayTemp.push(quadruple[2]);
                   arrayHum.push(quadruple[3]);
               }

               //bisogna fare tanti shift quanti sono i nuovi valori
               drawdata["datasets"][0]["data"] = arrayTemp;
               drawdata["datasets"][1]["data"] = arrayHum;

               drawdata.labels = arrayXass;
}

function doSensorListPreparation(slist)
{
	 var sensorList = new Array();
	 var posXList = new Array();
	 var posYList = new Array();
	 var batteryarray = new Array();
	 var statearray=new Array();
	 
	 var mySelect = $('#sensors');
	 var mySel = $('#dragsens');
	 
	 var arrayHum = new Array();
	 var arrayXass = new Array();
	 var upla;
	
	 for (var i = 0; slist != null && i < slist.length; i++) 
	 {
	     if (slist[i] == "")
	         continue;
	
	     upla = slist[i].split(",");
	     sensorList.push(upla[0]);
	     posXList.push(upla[1]);
	     posYList.push(upla[2]);
	     batteryarray.push(upla[3]);
	     statearray.push(upla[4]);
	     if (upla[4]==0) {error=upla[4];}
	     
	 }
	
	 if (selectedSensor == -1 && slist != null) 
	 {
	     selectedSensor = sensorList[0];
	 }
	 
	 mySelect.html("");
	 mySel.html("");
	 
	 if (slist == null)
	 {
		return;
	 }
	 
	 $.each(sensorList, function (val, text) {
	     if (text==selectedSensor) {
	         mySelect.append(
	             $('<option></option>').val(text).html(text).attr("selected","selected")
	         );
	     } else {
	         mySelect.append(
	             $('<option></option>').val(text).html(text)
	         );
	     }
	     
		  var classerr="";	     
	     var btrperc="B: ok";
	     if (parseFloat(batteryarray[sensorList.indexOf(text)]) < 2.2) {
	     	btrperc="B: ko";
	     	classerr="errorb";
	     }
	     
	     
	     if ((statearray[sensorList.indexOf(text)])==0) {
				classerr="error";
	     }
	     
	     mySel.append(
	         "<div id='draggable" + text + "' class='draggable ui-widget-content sensor "+classerr+"'>\
	         <p>S: " + text+" <br> " +btrperc+"</p> </div>"	         
	     );
	    
	     var spt = posYList[sensorList.indexOf(text) ];
	     var spl = posXList[sensorList.indexOf(text) ];
	     updatePos(text, posYList[sensorList.indexOf(text) ], posXList[sensorList.indexOf(text) ]); //update the sensor pos on the map
	     var d=$("#draggable" + text);
	     $("#draggable" + text).draggable({
	         grid: [10, 10],
	         snap: ".ui-widget-header",
	         snap: true,
			 drag: function() { performGet = false;},
	         stop: function () {
	             spt = d.position().top;
	             spl = d.position().left;

	             // //update the sensor pos on the server
	             $.post(
	                 "./php/UpdateSensorPos.php?", {
	                     sensorID: text,
	                     SensorPosX: spl, // X = left
	                     SensorPosY: spt // Y = top
	                 },
	                 function (data) { performGet = true; }
	             );
	         }
	     });
	 });
} //doSensorListPreparation



   setInterval(
       function () {
           $.post("./php/Getter.php?", {
               sensorID: selectedSensor,
               requestedNumOfRows: function (){if(graphinterval!=null){return graphinterval;}else{return 15;}},
           }, function (data) {
               var lines = data.split("\n");
					
					doGraphPreparation(lines);
					
           });
           myNewChart.Line(drawdata, optionsNoAnimation);
			
			if (performGet)
			{
				// getting the sensor-list (id,posX,posY)
				$.post("./php/SensorList.php", function (data) 
				{
					if (performGet)
					{
						var slist = (data != "") ? data.split("\n") : null;
						doSensorListPreparation(slist);
					}
				}
						);
			}
       },2000); //set interval
       
	   $( "#Deletebtn" ).click(function() 
		{	
      $.post("./php/DeleteSensor.php", {
               sensorID: selectedSensor
           }, function (data) 
		   {
				if (data == "Delete ok"){
					alert("The sensor has been deleted!");
					selectedSensor=-1;}
				else{
					alert("Something wrong during sensor deleting");}
           });
		});
		
Resetbtn	

		$( "#Resetbtn" ).click(function() 
		{	
      $.post("./php/UpdateSensorsState.php", function (data) 
		   {
				if (data == "ok")
					alert("The sensors state has been updated!");
				else
					alert("Something wrong during sensor state update");
           });
		});
	
		
	
}); //doc ready

function updatethreshold(){// //update the sensor threshold
       $.post(
           "./php/UpdateThreshold.php?", {
               t_min:$( "#spinnertmin").spinner( "value" ),
               t_max:$( "#spinnertmax").spinner( "value" ),
               h_min:$( "#spinnerhmin").spinner( "value" ),
               h_max:$( "#spinnerhmax").spinner( "value" ),
           },
           function (data) { ; }
       );
}	
	
$(function() {

 	
	
	var spinner = $( "#spinner" ).spinner();
	$( "#spinner" ).on( "spinstop", function( event, ui ) {graphinterval=spinner.spinner( "value" );} );
    spinner.change(function() {
      graphinterval=spinner.spinner( "value" );
    });

    spinner.spinner({
      min: 5,
      max: 250,
      step: 1,
      start: 15,
      numberFormat: "n"
    });
     
     var spthreshold=$( "#spinnertmax, #spinnertmin,#spinnerhmax, #spinnerhmin" ).spinner();
    spthreshold.spinner({
      step: 1,
      start: 15,
      numberFormat: "n"
    });
 	spthreshold.on( "spinstop", function( event, ui ) {
 		updatethreshold();});
  spthreshold.change(function() {
		updatethreshold();
    }); 
  }); 

  
    
    
    
$(document).ready(function ($) {

    $('[data-popup-target]').click(function () 
	{
        $('html').addClass('overlay');
        var activePopup = $(this).attr('data-popup-target');
        $(activePopup).addClass('visible');
			$.post("./php/History.php", function (data) {
				$(".popup-content").html(data);
			})
    });

    $('.popup-exit').click(function () {
        clearPopup();
    });

/*    $('.popup-overlay').click(function () {
        clearPopup();
    });
*/
    function clearPopup() {
        $('.popup.visible').addClass('transitioning').removeClass('visible');
        $('html').removeClass('overlay');

        setTimeout(function () {
            $('.popup').removeClass('transitioning');
        }, 200);
    }
});
        