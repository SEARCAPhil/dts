function __get_list(data,callback=function(){}){

	__ajax_list(data,function(e){
		var data=JSON.parse(e)
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
				 	<div class="list" data-list="`+baskets[x].id+`">
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

	 	//0 basket
	 	if(basket_count<=0){
	 		$('#main-page').load('welcome.html')
	 	}else{
	 		$('.list-container').html(html)	

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
