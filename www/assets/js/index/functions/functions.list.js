function __saveListToStorage(json,status){
	window.localStorage.setItem('cached_list_'+status,json);
}

function __getListFromStorage(status){


	//show from list only
	var json_data=window.localStorage.getItem('cached_list_'+status);

	try{
		__show_list(json_data,'.list-container');
		return json_data;
	}catch(e){

	}
}

function __show_list(json,target){

	var data=JSON.parse(json)

	var baskets=(typeof data.baskets!='undefined')?data.baskets:[];
	var basket_count=baskets.length;

 	var html=`<!--search and page-->
			<!--<div class="list" data-role="none"><br/><br/>
				<div class="col col-md-12"><label>Page :  1/15</label></div>
				<div class="col col-md-12"><input type="number" class="form-control" min="1" value="1"  data-role="none"/></div>

				<div class="col col-md-12"><input type="text" class="form-control" placeholder="Looking for ?"  data-role="none"/></div>
				
			</div>-->

		`;

 	for(var x=0; x<baskets.length;x++){
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

 	html+=`<div class="list" data-role="none" style="background:none;">
 		<span class="col col-xs-12 text-center" data-category="`+data.category+`" onclick="loadMoreBaskets(this)"><a href="#" class="text-muted">More Baskets</a></span>
 	</div>`;


 	$(target).append(html)	


}

function __get_list(data,callback=function(){}){

	var status=data.status;

	__ajax_list(data,function(e){


		try{
			data=JSON.parse(e)

			if(typeof data.status!='undefined'){
				//save list to storage
				__saveListToStorage(e,status);

			}

			//updatebasket count
	 		var baskets=(typeof data.baskets!='undefined')?data.baskets:[];
	 		basket_count=baskets.length;

		 	//0 basket
		 	if(basket_count<=0){
		 		//$('#main-page').load('welcome.html')
		 		//$('.docker-menu-toggle-content').addClass('hide')
		 		$('#main-page').addClass('show')
		 		//$('.list-container').html('')
		 	}else{

		 		//clear section for page 1

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






function modal_ajax(event,e){
	event.preventDefault()

	var page=('modal/'+$(e).attr('href'))
	
	$($(e).attr('data-target')).load(page);

	window.modal={}
	window.modal.recentlySelected=e;
}


//show more baskets
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

		//hide loading
		$(element).html('')
	},700);
}
