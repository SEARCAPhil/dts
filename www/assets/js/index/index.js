
window.sdft={}
window.sdft.deviceInstance='desktop';

function changeDockerSize(){
	//get height of list
	var list_height=($('#item-docker-menu').height()+30) 
	//set docker height to full height
	document.querySelector('#docker-sidebar > .content').style.height=(list_height>(document.body.clientHeight+100)?list_height:document.body.clientHeight+100)+'px';	
}


function deviceReadyForMobile(){
	//save to window
	window.sdft.deviceInstance='mobile';

}

function loadDetailsPage(id,callback){
	$('.main-page-content').load('details.html',function(){
		callback(this)
	});	
}



function loadListContent(id,callback){
	$('.item-docker-menu-content').load('list.html',function(){
		callback(this)
	});
}

function loadActivityContent(id){
	$('#activities').load('activities.html');
}

function loadRouteContent(id){
	$('#route').load('routes.html');
}


function attachEventToMenu(){
	$('.main-menu li:not([data-role="none"])').click(function(){
		$('.main-menu li').removeClass('active');
		$(this).addClass('active')
	});

}

function attachEventToList(){
	$('.list:not([data-role="none"])').click(function(){
		$('.list').removeClass('active');
		$(this).addClass('active')
	});

}


function deviceReady(){
	console.log('device is ready . . .')

	//materialize
	$.material.init();

	//show docker
	docker.init();

	changeDockerSize();

	attachEventToMenu();
	
	//load content
	loadDetailsPage(1,function(e){

	});

	//load list
	loadListContent(1,function(e){
		setTimeout(function(){
			changeDockerSize();	
			//materiaize input field in list
		    //materialize
			$.material.init();

			//attach list event
			attachEventToList()
		},300)
			
	});

	//loadActivityContent(1)

	//loadRouteContent(1)


	$('.docker-menu-toggle-content').click(function(e){
		var itemCssDefaultDisplay=window.getComputedStyle($('#item-docker-menu')[0]).display

		
		if(itemCssDefaultDisplay=='none'){
			$('#main-page').removeClass('show');
			$('#main-page').addClass('hide');
			document.querySelector('#item-docker-menu').classList.remove('hide');
			document.querySelector('#item-docker-menu').classList.add('show');
		}else{
			$('#main-page').removeClass('hide');
			$('#main-page').addClass('show');
			document.querySelector('#item-docker-menu').classList.remove('show');
			document.querySelector('#item-docker-menu').classList.add('hide');
		}
	})


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
		}else{}
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
