
//get categories
function getParentCategories(id=null,target=null){

	//prevent NaN values
	if(isNaN(id)) return 0;

	window.selectedCategory=id

	__ajax_categories({token:__config.session.token,id:id},function(e){
		var data=JSON.parse(e)
		var categories=(typeof data.categories!='undefined')?data.categories:[];

		var htm=``;

		for(var x=0; x<categories.length;x++){
			htm+='<option value="'+categories[x].id+'" class="subcategory">'+categories[x].name+'</option>'
		}

		//empty result
		if(categories.length<=0) return 0;

		//parent
		if(id==null){
			
			$('.parent-category-selector').append(htm)
			
		}else{	

			htm='<option value="0">Select (All default)</option>'+htm
			//get children
			$(target).parent().children('.subcategory-section').html(`<div><select class="form-control parent-category-selector">`+htm+`</select><div class="subcategory-section"><div></div>`);


		}

		attachEventToCategorySelector();


	},function(){

	});
}

function getCategories(data,callback=function(){}){
	__ajax_categories(data,function(e){
		callback(JSON.parse(e))
	},function(){

	});
}



function getSub(){
	 getParentCategories(parseInt($(this).val()),this);
}

function attachEventToCategorySelector(){
	$('.parent-category-selector').off('change',getSub)
	setTimeout(function(){
		$('.parent-category-selector').on('change',getSub)
	},300)	
}


function attachEventToBasketButton(){
	$('#create').on('click',function(){
		if(($('#basket_name').val()).length<=0) return 0;
		if(($('#description').val()).length<=0) return 0;
		if(window.selectedCategory==null){ alert('Please select category'); return 0;}

		__ajax_post_basket({token:__config.session.token,basket_name:$('#basket_name').val(),description:$('#description').val(),keywords:$('#keywords').val(),category:window.selectedCategory},function(e){
			var data=JSON.parse(e)
			if(typeof data.id!='undefined'){
				$.mobile.loading('show')
				//proceed to draft
				$('#draft-menu').click();

				//clear main page content
				$('.main-page-content').html(`
					<center>
						<p>
							<i class="material-icons" style="font-size: 5em;">inbox</span>
						</p>
						<h3>Please select a basket on the list.</h3>
					</center>
					`);
			}

		},function(){

		});
		
	})
}




