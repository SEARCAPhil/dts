import { __ajax_basket_open } from '../../assets/js/details/ajax/ajax.details'
import { config as __config } from '../../config/app'
import { loadDetailsInit  } from '../../assets/js/index/functions/functions.list'

function loadBasketCloseMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Close</h3>
		<div>
			<p><i class="material-icons">info</i> Changing the status of the basket accordingly allow/prevent users to do any unappropriate action. </p>
			<p> <button class="btn btn-default" href="update_basket_status_close.html" data-target="#myModal" data-toggle="modal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><a href="#">Close</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function open_basket(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		status:'open',
		token:__config.session.token
	}
	 __ajax_basket_open(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to opene this item.Please try again later.');

	 		},700);
	 	}else{
	 		//changed to close
	 		loadBasketCloseMenu(id,'.basket_status_menu',function(e){})

	 		//remove lock logo in the list
	 		$('.list[data-list="'+id+'"]').removeClass('closed');

	 		//force reload
			loadDetailsInit('id='+window.sdft.active+'&token='+__config.session.token)
	 	}

	 },function(){

	 });

	
}

$('#update_attachment_button').click(function(){
	open_basket(this);
})