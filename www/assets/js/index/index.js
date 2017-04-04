
window.sdft={}
window.sdft.deviceInstance='desktop';

function changeDockerSize(){
	//get height of list
	var list_height=($('#item-docker-menu').height()+200) 
	//set docker height to full height
	document.querySelector('#docker-sidebar > .content').style.height=((list_height>(document.body.clientHeight+200)?list_height:document.body.clientHeight+200))+'px';	
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


function attachEventToList(){
	$('.list:not([data-role="none"])').click(function(){
		$('.list').removeClass('active');
		$(this).addClass('active')

		//load content
		loadDetailsPage(1,function(e){

		});

		//hide list for mobile
		if(window.sdft.deviceInstance=='mobile'){
			
			$('.docker-menu-toggle-content')[0].click()
		}


	});

}


function attachEventToMenu(callback){
	$('.main-menu li:not([data-role="none"])').click(function(){
		$('.main-menu li').removeClass('active');
		$(this).addClass('active')

		callback(this);
		

	});

}




function deviceReady(){
	console.log('device is ready . . .')

	//materialize
	$.material.init();

	//show docker
	docker.init();

	changeDockerSize();

	attachEventToMenu(function(e){

		if(e.id!='groups'){
			//hide ajax section
			$('.container-ajax').hide();
			//show main-page
			$('.container-main').show();
			//load list
			loadListContent(1,function(e){
				setTimeout(function(){
					changeDockerSize();	
					//materiaize input field in list
				    //materialize
					$.material.init();

					//attach list event
					attachEventToList()
				},500)
					
			});	
		}
		
	});
	
	$('.main-page-content').load('welcome.html')

	//show list after attachEventToMenu
	setTimeout(function(){
		$('.main-menu li:not([data-role="none"])')[0].click();
	},300)





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
