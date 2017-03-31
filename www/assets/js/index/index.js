
window.sdft={}
window.sdft.deviceInstance='desktop';

function changeDockerSize(){
	//get height of list
	var list_height=($('#item-docker-menu').height()+30) 
	//set docker height to full height
	document.querySelector('#docker-sidebar > .content').style.height=(list_height>(document.body.clientHeight+100)?list_height:document.body.clientHeight+100)+'px';	
}

function deviceReady(){
	console.log('device is ready . . .')



	//materialize
	$.material.init();

	//show docker
	docker.init();



	changeDockerSize();
	
	//load content
	loadContent(1);

}

function deviceReadyForMobile(){
	//save to window
	window.sdft.deviceInstance='mobile';

}


function loadContent(id){
	$('#home').load('content.html');
}




function init(){
	
	document.addEventListener("deviceready",deviceReady,false);
	document.addEventListener("deviceready",deviceReadyForMobile,false);

	//-----------------------------------
	// DESKTOP DETECTION
	// Load function if deviceinstance is non-mobile
	//----------------------------------
	setTimeout(function(){ 
		if(window.sdft.deviceInstance=='desktop'){
			$(document).ready(function(){
				
				deviceReady();
			});
		}
	},300)

	

	
	

}


/*function deviceOffline(){
	$('.offline-status-bar').show();
}

function deviceOnline(){
	$('.offline-status-bar').hide();
}

document.addEventListener("offline",deviceOffline,false);
document.addEventListener("online",deviceOnline,false);

*/

window.addEventListener('orientationchange', function(){
    changeDockerSize()
});
