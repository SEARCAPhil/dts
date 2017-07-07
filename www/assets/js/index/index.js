/*require functions.list.js*/
window.sdft={}
window.sdft.deviceInstance='desktop';

function changeDockerSize(parent){
	//get height of list
	//var list_height=($(parent).height()+200) 
	//set docker height to full height
	//document.querySelector('#docker-sidebar > .content').style.height=((list_height>(document.body.clientHeight+200)?list_height:document.body.clientHeight+200))+'px';	


	var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
	var physicalScreenHeight = window.screen.height * window.devicePixelRatio;

	document.querySelector('#docker-sidebar > section.content').style.height=window.screen.height+'px';
}


function deviceReadyForMobile(){
	//save to window
	window.sdft.deviceInstance='mobile';

}




/*-------------------------------------------------
| DETAILS PAGE TEMPLATE
| show details when an item in Basket List is click
|---------------------------------------------------*/

function loadDetailsPage(callback){
	//show loading
	$.mobile.loading('show');  

	//clear sending list
	window.sessionStorage.clear('sending_list');

	var html=`

		<style type="text/css">
			.attachments,.units{
				margin-bottom: 20px;
				padding-bottom:20px;
			}
			.attachments:not(:last-child),.units:not(:last-child){
				border-bottom: 1px solid rgba(230,230,230,0.4);
			}
		</style>

		<div class="details-content">
			<div class="col col-md-12 row details-menu">
				
			</div>

			<div class="col col-md-12 row">
				<div class="media">
				  <div class="media-left">
				    <a href="#">
				      <div class="media-circles"><img src="assets/images/user.png" width="100%;"></div>
				    </a>
				  </div>
				  <div class="media-body">
				    <h4 class="media-heading author-name"></h4>
				    <small>
					    <p class="department"></p>
						<p class="position"></p>
						</small>
				  </div>
				</div>
			</div>

			<br/>
			<p><b>Description</b></p>
			<p class="description"></p>


	
		  <!-- Nav tabs -->
		  <ul class="nav nav-tabs" role="tablist" style="max-height: 80px;">
		    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><i class="material-icons">folder_shared</i> Content</a></li>
		    <li role="presentation" id="activity-tab"><a href="#activities" aria-controls="activities" role="tab" data-toggle="tab">Activities</a></li>
		    <li role="presentation"><a href="#route" aria-controls="route" role="tab" data-toggle="tab"><i class="material-icons">settings</i></a></li>
		  </ul>

		  <!-- Tab panes -->
		  <div class="tab-content">
		    <div role="tabpanel" class="tab-pane active" id="home">

		    </div>

		    <div role="tabpanel" class="tab-pane row" id="activities" style="padding-top: 30px;">

		    </div>
		    <div role="tabpanel" class="tab-pane" id="route" style="padding-top: 30px;">
		    	<div class="basket_update_menu"></div>
		    	<div class="basket_status_menu"></div>
		    	<div class="basket_delete_menu"></div>
		    </div>
		  </div>
		</div>
		<div class="details-content-status"></div>
	`;
	$('.main-page-content').html(html)

	
	callback(this)

}


/*------------------------------------------------
| Show LIST
| Load Basket List 
|-------------------------------------------------*/

function loadListContent(data,callback){

	//remove attach and share options
	clearLoadTopMenu();

	__get_list(data,function(){
		callback(this)
	});
	
}



/*------------------------------------------------
| Show ACTIVITIES
|-------------------------------------------------*/

function loadActivityContent(data,callback){
	getActivities(data,function(){
		callback(this)
	});
	
}


/*------------------------------------------------
| Show SETTINGS
|-------------------------------------------------*/
function loadRouteContent(id){
	$('#route').load('routes.html');
}


function attachEventToList(){
	$('.list:not([data-role="none"])').off('click')
	$('.list:not([data-role="none"])').on('click',function(){ 

		try{
			if(window.sdft.uploading.length>0){
				if(!confirm('Some of your files will not be uploaded if you leave this basket.Do you wish to continue?')){
					return 0;
				}else{
					//clear pending
					window.sdft.uploading=[];
				}
			}
		}catch(e){

		}

		$('.list').removeClass('active');
		$(this).addClass('active')

		var element=this;


		//load content
		loadDetailsPage(function(e){
			if($(element).attr('data-list')!='undefined'){ 
				window.sdft.active=$(element).attr('data-list');
				loadDetailsInit('id='+$(element).attr('data-list')+'&token='+__config.session.token)	

			}
			
			$('#activity-tab').click(function(){
				loadActivityContent('id='+$(element).attr('data-list')+'&token='+__config.session.token,function(e){ 
					
				})
			})
		});

		//hide list for mobile
		if(window.sdft.deviceInstance=='mobile'){ 
			$('.docker-menu-toggle-content')[1].click()
		}


	});

}


function attachEventToMenu(callback){
	//$('.main-menu li:not([data-role="none"])').off('click');
	$('.main-menu li:not([data-role="none"])').on('click',function(){
		$('.main-menu li').removeClass('active');
		$(this).addClass('active')

		window.sdft.active_category=$(this).attr('data-status');
		callback(this);
	});

}	




function deviceReady(){
	console.log('device is ready . . .')

	

	//materialize
	$.material.init();

	//show docker
	docker.init();

	//change docker size
	changeDockerSize('#item-docker-menu');


	attachEventToMenu(function(e){
		//clear basket paging
		window.sessionStorage.setItem('basket_page',1)



		
		/*-----------------------------------------------
		| Autohide Docker Sidebar
		| Hide sidebar whenever a menu is click.This is only 
		| applicable in mobile
		|------------------------------------------------*/
		if(window.sdft.deviceInstance=='mobile'){
			$('#docker-sidebar').removeClass('docker-toggle-open');
		}


		if((e.id!='groups')&&(e.id!='new')){
			//hide ajax section
			$('.container-ajax').hide();
			$('.container-notifications').hide();
			//show main-page
			$('.container-main').show();

			//read from storage
			__getListFromStorage($(e).attr('data-status'));



			//load list
			loadListContent({token:__config.session.token,page:1,status:$(e).attr('data-status')},function(e){

				/*----------------------------------------------------------
				| Show no content available if no count is 0
				| This should only applied for small and medium devices
				|----------------------------------------------------------*/

				if(e.basket_count<=0){
					$('.list-container').html(`
		 	 			<div class="col col-xs-12 col-md-12 visible-xs visible-sm" style="background:rgb(255,255,255);border-radius:5px;"><center>
							<h3 class="text-muted"><i class="material-icons" style="font-size: 5em;">local_mall</i></h3>
							<h4>No Content Available</h4>
							<p class="text-muted"><small>Your basket list is empty.Please create a new one.</small></p>
						</center><br/><br/></div>`)
				}else{
					//remove then reinsert search in DOM
					$('.search-section').remove();
				 	$('.list-container').prepend(`<!--search and page-->
						<div class="list search-section" data-role="none"><br/>

							<div class="col col-md-12"><input type="text" class="form-control search-box" onkeyup="searchList(event,this)" placeholder="SEARCH"  data-role="none"/></div>
							
						</div>`);
				}



				/*-----------------------------------------------
				| Show List section only if it is hidden
				| This is only applicable for mobile device
				|------------------------------------------------*/
				if(!$('#item-docker-menu').hasClass('show')&&window.sdft.deviceInstance=='mobile'&&e.basket_count>0){
					$('.docker-menu-toggle-content')[0].click()
				}


				setTimeout(function(){
					//changeDockerSize('#item-docker-menu');	
					//materiaize input field in list
				    //materialize
					$.material.init();

					//attach list event
					attachEventToList()


				},300)


				/*--------------------------------------------------
				| Autoload more baskets in list
				| click showmore button when scrolled down
				|--------------------------------------------------*/
				$(window).scroll(function() {

					//if show more is present
					if($('.show-more')[0]!=undefined){ 
	  					if(($('.show-more')[0].offsetTop-$(window).scrollTop())<500){
	  						$('.show-more')[0].click()
	  					}
	  				}
				});
								

					
			});	
		}
		
	});
	

	/*--------------------------------------------------------------
	| Autoload welcome page
	|---------------------------------------------------------------*/
	$('.main-page-content').load('welcome.html')


	/*--------------------------------------------------------------
	| Autoclick recent menu
	|---------------------------------------------------------------*/
	setTimeout(function(){
		$('.main-menu li:not([data-role="none"])')[0].click();
	},300)


	/*--------------------------------------------------------------
	| Toggle list section when .docker-menu-toggle-content is click
	|---------------------------------------------------------------*/
	toggleDocker()


}

/*--------------------------------------------------
| Toggle list section
| click showmore button when scrolled down
|--------------------------------------------------*/
function toggleDocker(){

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

	/*------------------------------------------------
	| DESKTOP INIT DETECTION
	| Load function if deviceinstance is non-mobile
	|-------------------------------------------------*/


	//notification socket
	window.sdft.socket={}

	setTimeout(function(){ 


		if(window.sdft.deviceInstance=='desktop'){
			$(document).ready(function(){				
				deviceReady();
			});
		}else{

			/*------------------------------------------------
			| Load mbile settings
			|-------------------------------------------------*/

			//change docker size
			changeDockerSize('#item-docker-menu');

			//prevent overflow in docker sidebar
			document.querySelector('#docker-sidebar > section.content').style.overflowY='scroll';
			document.querySelector('#docker-sidebar > section.content').style.overflowX='hidden';

		}

	},300)

	

	
	

}


function deviceOffline(){
	$('.offline-status-bar').show();
}

function deviceOnline(){
	$('.offline-status-bar').hide();
}

document.addEventListener("offline",deviceOffline,false);
document.addEventListener("online",deviceOnline,false);
window.addEventListener('orientationchange', function(){
    changeDockerSize('#item-docker-menu');

});


/*------------------------------------------------
| SIGNOUT
| clear all datainside localStorage
|-------------------------------------------------*/

function signOut(){
	window.localStorage.clear();
}