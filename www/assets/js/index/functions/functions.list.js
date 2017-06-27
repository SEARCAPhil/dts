/*--------------------------------------------------
| SAVE TO STORAGE
| save items to cache
|--------------------------------------------------*/

function __saveListToStorage(json,status){
	window.localStorage.setItem('cached_list_'+status,json);
}



function __getListFromStorage(status){

	//show from list only
	var json_data=window.localStorage.getItem('cached_list_'+status);

	try{
		__show_list(json_data,'.list-container');
		return json_data;
	}catch(e){}
}




/*-------------------------------------------------------------
| SHOW LIST
| show items in list section
|--------------------------------------------------------------*/

function __show_list(json,target){

	var data=JSON.parse(json)

	var baskets=(typeof data.baskets!='undefined')?data.baskets:[];
	var basket_count=baskets.length;

 	var html=`<!--LIST PAGE-->`;
	var x=0;
 	for(x=0; x<baskets.length;x++){
		 	html+=`	<!--list-->
		 	<div class="list `+baskets[x].status+`" data-list="`+baskets[x].id+`">
		 		<div class="col col-md-12">
			 		<h4>`+baskets[x].name+`</h4>

			 		<p>`+baskets[x].description+`</p>
			 	</div>

		 		<div class="col col-md-12 list-details" style="background:rgba(200,200,200,0.1);padding-top:10px;border-top:1px solid rgba(200,200,200,0.3);">
			 		<small>
			 			<p><b>Category :</b> `+baskets[x].category+`</p>
			 			<p><b>Author :</b>`+baskets[x].author.name+`</p>
			 			<p><b>Last Modified :</b>`+baskets[x].date_modified+`</p>
			 		</small>
			 	</div>

		 	</div>
		 <!--list-->
		`;	
 	}

 	if(x>=20){
 		html+=`<div class="list" data-role="none" style="background:none;">
	 		<span class="col col-xs-12 text-center show-more" data-category="`+data.category+`" onclick="loadMoreBaskets(this)"><a href="#" class="text-muted">More Baskets</a></span>
	 	</div>`;
	}

 	$(target).append(html)	

}




/*--------------------------------------------------------------
| GET LIST
| get baskets from remote server
|---------------------------------------------------------------*/
function __get_list(data,callback=function(){}){

	var status=data.status;
				
	__ajax_list(data,function(e){


		try{
			data=JSON.parse(e)

			if(typeof data.status!='undefined'){
				//save list to storage
				__saveListToStorage(e,status);

			}

			//update basket count
	 		var baskets=(typeof data.baskets!='undefined')?data.baskets:[];
	 		basket_count=baskets.length;

		 	//0 basket
		 	if(basket_count<=0){
		 		//$('#main-page').load('welcome.html')
		 		//$('.docker-menu-toggle-content').addClass('hide')
		 		$('#main-page').addClass('show')
		 		//$('.list-container').html('')

		 		//callback
		 		setTimeout(function(){
		 			callback(e)
		 		},300)

		 	}else{

		 		//clear section for page 1
		 		//this will prevent double entry of item in the list
				if(window.sessionStorage.getItem('basket_page')==1){
					$('.list-container').html('')
				}

		 		$('.docker-menu-toggle-content').removeClass('hide')
		 		__show_list(e,'.list-container');
		 			
		 		//callback
		 		setTimeout(function(){
		 			callback(e)
		 		},300)
		 	} 
		}catch(e){}


	},function(){

	})
}




/*--------------------------------------------------
| SEARCH LIST FROM REMOTE SERVER
| call search to remote via ajax
|--------------------------------------------------*/
function __search_list(data,callback=function(){},error_callback=function(){}){

	var status=data.status;
				

	__ajax_list_search(data,function(e){
		//callback
 		setTimeout(function(){
 			callback(e)
 		},300)
	},function(e){
		error_callback(e);
	})
}


/*--------------------------------------------------
| Show more baskets in the list
| load next page
|--------------------------------------------------*/
function loadMoreBaskets(element){


	var status=$(element).attr('data-category')

	//loading
	$(element).html('<img src="assets/images/spinner.gif"/>')

	//get page
	if(window.sessionStorage.getItem('basket_page')==null){
		var nextPage=2
		window.sessionStorage.setItem('basket_page',1)	
	}else{
		var nextPage=parseInt(window.sessionStorage.getItem('basket_page'))+1;
		window.sessionStorage.setItem('basket_page',nextPage);
	}

		//hide loading
	$(element).remove()
		
	setTimeout(function(){

		//load list
		loadListContent({token:__config.session.token,page:nextPage,status:status},function(e){
			setTimeout(function(){
				changeDockerSize('#item-docker-menu');	
				//materiaize input field in list
			    //materialize
				$.material.init();

				//attach list event
				attachEventToList()

				//autoclick list for desktop
				if(window.sdft.deviceInstance=='desktop'){
					//$('.list:not([data-role="none"])')[0].click();
				}else{
					//if show list page is hidden -> show list
					var itemCssDefaultDisplay=window.getComputedStyle($('#item-docker-menu')[0]).display;

					if(itemCssDefaultDisplay=='none'&&($('.list:not([data-role="none"])')[0]!='undefined')){
						//$('.docker-menu-toggle-content')[0].click()
					}

				}



			},300)
				
		});	


	},700);
}


/*--------------------------------------------------
| SEARCH LIST FROM SERVER
| look items in the remote server
|--------------------------------------------------*/
function loadSearchResultsFromServer(param,status){
	$('.search-help-text').html(`<div class="col col-md-12">
			<small class="data-role="none"><a href=""><i class="material-icons">search</i>searching from server . . .</a></small>
		</div>`);

		//show loading bar
		$.mobile.loading('show');

		var data='param='+param+'&token='+__config.session.token+'&status='+status;
		 __search_list(data,function(result){

		 			//remove list
					$('.list[data-role!="none"]').remove();


		 		__show_list(result,'.list-container');

				setTimeout(function(){
					//attach list event
					attachEventToList()
				},800)
		 },function(e){
		 	$('.search-help-text').html(`<div class="col col-md-12">
				<small class="data-role="none"><a href=""><i class="material-icons">search</i>unable to connect to server . . .	</a></small>
			</div>`);
		 })
}



/*--------------------------------------------------
| SEARCH LIST
| search items in cache and detect user's keyboard interaction
| look in the remote server when enter key is pressed
|--------------------------------------------------*/
function searchList(event,element){

	var status=window.sdft.active_category;
	var json_data=window.localStorage.getItem('cached_list_'+status);
	var data=JSON.parse(json_data);

	var value=$(element).val();

	var __data={}
	__data=data;

	//empty data.baskets
	var __res=[];

	for (var i = 0; i<data.baskets.length; i++) { 
		if(data.baskets[i].name.indexOf(value)>-1){
			__res.push(data.baskets[i]);
			
		}
	}

	__data.baskets=__res;

	//remove list
	$('.list[data-role!="none"]').remove();

	//add show more from server

	var htm=`<div class="list search-help-text" style="background:none;box-shadow:none;"><br>

		<div class="col col-md-12">
			<small class="data-role="none"><a href=""><i class="material-icons">keyboard_return</i>press enter key or click this link to load more results from server</a></small>
		</div>
		
	</div>`;

	$('.list-container').append(htm)



	__show_list(JSON.stringify(__data),'.list-container');

	setTimeout(function(){
		//attach list event
		attachEventToList()

		//remove search link
		$('.search-help-text').off('click')

		$('.search-help-text').on('click',function(){
			loadSearchResultsFromServer(value,status)
		})


	},800)



	/*--------------------------------------------------
	| CALL search to remote server
	|--------------------------------------------------*/

	if(value.length<1) return false;

	//press enter key
	if(event.keyCode==13||event.which==13){
		
		loadSearchResultsFromServer(value,status)

	}


	
}






/*--------------------------------------------------
| MODAL
| dynamic modal popup
|--------------------------------------------------*/
function modal_ajax(event,e){
	event.preventDefault()

	var page=('modal/'+$(e).attr('href'))
	
	$($(e).attr('data-target')).load(page);

	window.modal={}
	window.modal.recentlySelected=e;
}






/*--------------------------------------------------
| LOAD details
| load content including cllaboratrs
|--------------------------------------------------*/
function loadDetailsInit(data){
	    
	loadContent(function(){
		//load details
		getDetails(data,function(){
			//load groups after loading details
			 getCollaborators(data,function(){

			 });
		});
	});
}

