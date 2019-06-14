
import { config as __config } from '../../config/app'
import { __ajax_basket_collaborator_delete } from '../../assets/js/details/ajax/ajax.details'

function removeFromCollaboratorsList(element){
	//show loading
	$.mobile.loading('show');


	var id=($(window.modal.recentlySelected).attr('data-resources'))

	var data={
		id:id,
		token:__config.session.token
	}


	 __ajax_basket_collaborator_delete(data,function(e){
	 		var result=JSON.parse(e);
	 	
	 		$('#myModal').modal('hide');

		 	if(result.status!=200){
		 		setTimeout(function(){ 
		 			 
		 			alert('Unable to delete this item.Please try again later.');

		 		},700);

		 	}else{
		 		console.log($(element));
		 		$('.collaborators[data-resources="'+id+'"]').slideUp();

		 	}
	 },function(){
	 	alert('Unable to save the data.Please try again later.');
	 })	
}

$('#update_attachment_button').click(function(){
	removeFromCollaboratorsList(this);
})