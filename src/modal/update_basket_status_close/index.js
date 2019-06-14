import { __ajax_basket_close } from '../../assets/js/details/ajax/ajax.details'
import { config as __config } from '../../config/app'
import { loadDetailsInit  } from '../../assets/js/index/functions/functions.list'

function loadBasketOpenMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Open</h3>
		<div>
			
			<p><i class="material-icons">info</i> Changing the status of the basket accordingly allow/prevent users to do any unappropriate action. </p>
			<p> <button class="btn btn-default" data-toggle="modal" href="update_basket_status_open.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><a href="#">Open</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}


function close_basket(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		status:'close',
		token:__config.session.token
	}
	 __ajax_basket_close(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to close this item.Please try again later.');

	 		},700);
	 	}else{
	 		//changed to open
	 		//!!!removed from the specs
	 		// the user must not be able to open a basket that is already closed
	 		loadBasketOpenMenu(id,'.basket_status_menu',function(e){})

	 		//add lock logo in the list
	 		$('.list[data-list="'+id+'"]').addClass('closed');


	 		//force reload
			loadDetailsInit('id='+window.sdft.active+'&token='+__config.session.token)


	 	}

	 },function(){

	 });

	
}

$('#update_attachment_button').click(function(){
	close_basket(this);
})