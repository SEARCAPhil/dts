
import { config as __config } from '../../config/app'
import { __ajax_basket_delete } from '../../assets/js/details/ajax/ajax.details'


function delete_basket(status){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		token:__config.session.token
	}
	 __ajax_basket_delete(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to delete this item.Please try again later.');

	 		},700);

	 	}else{
	 		//add lock logo in the list
	 		$('.list[data-list="'+id+'"]').fadeOut();

	 		//clear main page-content
	 		$('.main-page-content').html(' <center><i class="material-icons" style="font-size:68px;">delete_sweep</i><h4 class="text-muted">Deleted Successfully</h4></center> ')


	 	}

	 },function(){

	 });

	
}


$('#update_attachment_button').click(function(){
	delete_basket(this);
})