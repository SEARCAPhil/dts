function __saveListToStorage(json,status){
	window.localStorage.setItem('cached_list_'+status,json);
}

function __show_list(json,target){

	var data=JSON.parse(json)

	var baskets=(typeof data.baskets!='undefined')?data.baskets:[];
	var basket_count=baskets.length;

 	var html=`<!--search and page-->
			<div class="list" data-role="none"><br/><br/>
				<div class="col col-md-12"><label>Page :  1/15</label></div>
				<div class="col col-md-12"><input type="number" class="form-control" min="1" value="1"  data-role="none"/></div>

				<div class="col col-md-12"><input type="text" class="form-control" placeholder="Looking for ?"  data-role="none"/></div>
				
			</div>

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

 	//append to target
 	$(target).html(html)
}

function __get_list(data,callback=function(){}){

	//status
	var status=data.status;

	__ajax_list(data,function(e){
		var data={}
		var json_data=e;
		
		try{data=JSON.parse(e)}catch(e){}

		if(typeof data.status!='undefined'){
			//save list to storage
			__saveListToStorage(json_data,status);
		}else{

			//use data from local storage
			data=JSON.parse(window.localStorage.getItem('cached_list_'+status));
			json_data=window.localStorage.getItem('cached_list_'+status);
		}





	 	var baskets=(typeof data.baskets!='undefined')?data.baskets:[];
	 	var basket_count=baskets.length;


		

	 	//0 basket
	 	if(basket_count<=0){
	 		//$('#main-page').load('welcome.html')
	 		$('.docker-menu-toggle-content').addClass('hide')
	 		$('#main-page').addClass('show')
	 		$('.list-container').html('')
	 	}else{
	 		$('.docker-menu-toggle-content').removeClass('hide')

	 		__show_list(json_data,'.list-container');
	 			

	 		//callback
	 		setTimeout(function(){
	 			callback(e)
	 		},300)
	 	} 


	 	

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
