import { __ajax_attachments_close } from '../../assets/js/details/ajax/ajax.details'
import { config as __config } from '../../config/app'

function close_attachment(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var category=($(window.modal.recentlySelected).attr('data-category'))==undefined?'Uncategorized':($(window.modal.recentlySelected).attr('data-category'));
	var data={
		id:id,
		token:__config.session.token
	}
	 __ajax_attachments_close(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to close this item.Please try again later.');

	 		},700);
	 	}else{
	 		//changed to open
	 		var htm=`
		 		<a href="update_attachment_status_open.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`" data-category="`+category+`">
		 			<i class="material-icons" style="font-size:18px;">lock_open</i><span>Open Attachment</span>
				</a>
	 		`;

	 		$(window.modal.recentlySelected).parent().html(htm)	
	 		$('.visible-open').parent().children('.visible-open').remove();

	 		//add closed sign
	 		$('.data-attachment-status[data-resources="'+id+'"]').html('<i class="material-icons text-muted visible-closed" style="font-size:18px;">lock</i>');
	 	}

	 },function(){

	 });

	
}


$('#update_attachment_button').click(function(){
	close_attachment(this);
})