import { getParentCategories } from '../../assets/js/basket/functions/functions.categories'
import { config as __config } from '../../config/app'
import { __ajax_attachments_category_update } from '../../assets/js/details/ajax/ajax.details'

function change_attachment_category(e){

	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		category:window.selectedCategory,
		token:__config.session.token
	}

	

	//console.log($('.parent-category-selector')[1].options.selectedIndex)

	//filter selected category text
	//[0] is hidden -default for RFP etc..
	////if($('.parent-category-selector')[1].options.selectedIndex==0) return 0;

	//show loading
	$.mobile.loading('show'); 

	 __ajax_attachments_category_update(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to update category.Please try again later.');

	 		},700);

	 	}else{

	 		let oldCategoryIndex = window.sdft.details.checklist.indexOf($('.category[data-resources="'+data.id+'"]').html())

	 		if(oldCategoryIndex!=-1){
	 			window.sdft.details.checklist.splice(oldCategoryIndex,1)	
	 		}

	 		$('.category[data-resources="'+data.id+'"]').html(result.category)
	 		window.sdft.details.checklist.push(result.category)


	 	}


	 },function(){

	 });

}

setTimeout(function(){
  var category = $(window.modal.recentlySelected).attr('data-category')
  var id = $(window.modal.recentlySelected).attr('data-resources');

  //update-category in modal
 // $('.recent-category').html(category);

  getParentCategories(window.sdft.category,'.parent-category-selector');

  $('#update_attachment_button').click(function(){
    change_attachment_category(this);
  })
},300);
