
import { config as __config } from '../../config/app'
import { __ajax_basket_publish } from '../../assets/js/details/ajax/ajax.details'



function loadBasketCloseMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Close</h3>
		<div>
			<p><i class="material-icons">info</i> Changing the status of the basket accordingly allow/prevent users to do any unappropriate action. </p>
			<p> <button class="btn btn-default" href="update_basket_status_close.html" data-target="#myModal" data-toggle="modal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><a href="#">Close</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function loadPublishButton(id,target){

	$(target).html(`<div class="col col-md-12 container-fluid">
					<button type="button" class="btn btn-default pull-right" data-toggle="modal" href="publish.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">
						<a>
							<i class="material-icons">device_hub</i> Publish</a>
					</button>
				</div>
				<div class="col col-md-12"><hr/></div>`);
 
}

function loadUnpublishButton(id,target){

	$(target).html(`<div class="col col-md-12 container-fluid">
					<button type="button" class="btn btn-default pull-right" data-toggle="modal" href="unpublish.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">
						<a>
							<i class="material-icons">visibility_off</i> Unpublish</a>
					</button>
				</div>
				<div class="col col-md-12"><hr/></div>`);
 
}

function publish_basket(status){
	
	var id=window.sdft.active;
	var data={
		id:id,
		status:status,
		token:__config.session.token
	}
	 __ajax_basket_publish(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to publish this item.Please try again later.');

	 		},700);
	 	}else{
	 		//changed to close
	 		loadBasketCloseMenu(id,'.basket_status_menu',function(e){})

	 		if(status=='draft'){
	 			loadPublishButton(id,'.details-menu');
	 		}else{
	 			//changed button to unpublish
	 			loadUnpublishButton(id,'.details-menu');
	 		}
	 		

	 	}

	 },function(){

	 });
}


$('#update_attachment_button').click(function(){
  publish_basket('open');
})


export {
  publish_basket
}