
import { config as __config } from '../../config/app'
import { __ajax_notes_delete } from '../../assets/js/details/ajax/ajax.details'


function remove_notes(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var note={
		id:window.sdft.active,
		note_id:id,
		token:__config.session.token
	}

	$(window.modal.recentlySelected).parent().parent().parent().parent().slideUp();


	__ajax_notes_delete(note,function(e){
 	 	
	 	 	try{
	 	 		var data=JSON.parse(e)

	 	 		if(data.id){
	 	 			setTimeout(function(){ 
				 		$('#myModal > div.modal-dialog >div.modal-content').html('<center style="padding:10px;"><h4 class="text-success"><i class="material-icons md-24">check</i> Removed successfully!</h4></center>')	
				 		$('#myModal').modal('show');
				 	},1000);

				 	setTimeout(function(){ 
				 		$('#myModal').modal('hide');
				 	},3000);
	 	 		}

	 	 	}catch(e){
	 	 		$(window.modal.recentlySelected).parent().parent().parent().parent().slideDown();
	 	 		alert('Something went wrong. Please try again later!')
	 	 	}
		},function(){
			$(window.modal.recentlySelected).parent().parent().parent().parent().slideDown();
			alert('Something went wrong. Please try again later!')
		})

	
	 	
}

$('#remove_notes_button').click(function(){
	remove_notes(this);
})