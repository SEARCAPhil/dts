import { __ajax_attachments_close } from '../../assets/js/details/ajax/ajax.details'
import { config as __config } from '../../config/app'



function open_attachment(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var category=($(window.modal.recentlySelected).attr('data-category'))==undefined?'Uncategorized':($(window.modal.recentlySelected).attr('data-category'));
	var data={
		id:id,
		token:__config.session.token,
		status:'open'
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
	 			<li data-resources="`+id+`" data-toggle="modal" data-target="#myModal">
			 		<a href="update_attachment_status.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"  data-category="`+category+`">
			 			<i class="material-icons" style="font-size:18px;">lock</i><span>Close Attachment</span>
					</a>
				</li>
	 		`;

	 		
	 		$(window.modal.recentlySelected).parent().parent().append(`<li data-resources="`+id+`" data-toggle="modal" data-target="#myModal" class="visible-open">
											<a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">
												<i class="material-icons">remove_circle</i> <span>Remove</span>
											</a>
										</li>
										<li data-resources="`+id+`" data-toggle="modal" data-target="#myModal" class="visible-open">
											<a href="attachment_category.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
										</li>`);

	 		$(window.modal.recentlySelected).parent().parent().append(htm)
	 		$(window.modal.recentlySelected).parent().children(window.modal.recentlySelected).remove();	

	 		//remove closed sign
	 		$('.data-attachment-status[data-resources="'+id+'"]').html('');
	 	}

	 },function(){

	 });

	
}




$('#update_attachment_button').click(function(){
	open_attachment(this);
})