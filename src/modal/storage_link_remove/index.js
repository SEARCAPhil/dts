import { __ajax_attachments_link_delete } from '../../assets/js/details/ajax/ajax.details'
import { config as __config } from '../../config/app'

function remove_attachment_link(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		token:__config.session.token
	}
	 __ajax_attachments_link_delete(data,function(e){
	 	var result=JSON.parse(e);
	 	$(window.modal.recentlySelected).parent().parent().parent().parent().slideUp();
	 	$('#myModal').modal('hide');

	 	if(result.id<=0||typeof result.id=='undefined'){
	 		setTimeout(function(){ 
	 			alert('Sorry!Unable to handle request.Please try again later.');
	 		},700);
	 	}else{
	 		setTimeout(function(){ 
		 		$('#myModal > div.modal-dialog >div.modal-content').html('<center style="padding:10px;"><h4 class="text-success"><i class="material-icons md-24">check</i> Removed successfully!</h4></center>')	
		 		$('#myModal').modal('show');
		 	},1000);

		 	setTimeout(function(){ 
		 		$('#myModal').modal('hide');
		 	},3000);
	 	}

	 },function(){

	 });

	
}


$('#remove_attachment_link_button').click(function(){
  remove_attachment_link(this);
})