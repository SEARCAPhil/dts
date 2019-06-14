
import { config as __config } from '../../config/app'
import { __ajax_contact_search } from '../../assets/js/basket/ajax/ajax.categories'
import { __ajax_contacts } from '../../assets/js/groups/ajax/ajax.groups'
import { __ajax_basket_collaborator_post } from '../../assets/js/details/ajax/ajax.details'

var searchTimeout;
window.removeFromsendingList = removeFromsendingList
window.addToSendingList = addToSendingList
window.saveCollaborators = saveCollaborators



function saveCollaborators(){
	var data = {
		id:window.sdft.active,
		token:__config.session.token,
		collaborators:window.sessionStorage.getItem('sending_list')
	}

	//show loading
	$.mobile.loading('show');

	 __ajax_basket_collaborator_post(data,function(e){
	 		var result=JSON.parse(e);
	 	
	 		$('#myModal').modal('hide');

		 	if(result.status!=200){
		 		setTimeout(function(){ 
		 			 
		 			alert('Unable to save item.Please try again later.');

		 		},700);

		 	}else{
		 		//hide save button
		 		$('.collaborators-menu').html('<i class="material-icons text-success">check_circle</i>');

		 		//add resources to the new collaborators
		 		for(let oldId in result.saved){
		 			var old=$('.collaborators-sent-item[data-old-resources="'+oldId+'"]');
		 			old.attr('data-resources',result.saved[oldId]);
		 			old.addClass('collaborators');

		 			var close_button=old.children('.remove-collaborators-button-sent-item');
		 			close_button.attr('onclick','modal_ajax(event,this)');
		 			close_button.attr('href','remove_collaborator.html');
		 			close_button.attr('data-toggle','modal');
		 			close_button.attr('data-role','none');
		 			close_button.attr('data-target','#myModal');
		 			close_button.attr('data-resources',result.saved[oldId]);
		 		}

		 		setTimeout(function(){
					//apend to collaborators
			 		$('.collaborators-list').append($('.sendingList').html());

			 		//clear sending list
			 		$('.sendingList').html('') 	
			 		//
			 		window.sessionStorage.removeItem('sending_list')		
		 		},600)


		 	}
	 },function(){
	 	alert('Unable to save the data.Please try again later.');
	 })	
}

/**
*Collaborators
*/
function loadCollaboratorSaveButton(target){
	var htm=`<span title="update" class="btn btn-danger pull-right" onclick="saveCollaborators()"><i class="material-icons md-18">update</i> Save</span>`;
	$(target).html(htm)
}

function addToSendingList(element){
	var name=$(element).attr('data-name');
	var department=$(element).attr('data-department');
	var id=$(element).attr('data-resources');

	//add to session storage

	if(window.sessionStorage.getItem('sending_list')==null){
		var list={}
		list.data={}
		list.data[id]=encodeURIComponent(name)
		list.count=1;
		window.sessionStorage.setItem('sending_list',JSON.stringify(list));	
	}else{
		var list=JSON.parse(window.sessionStorage.getItem('sending_list'));
		list.data[id]=encodeURIComponent(name)
		list.count++;
		window.sessionStorage.setItem('sending_list',JSON.stringify(list));	
	}


	$(element).parent().parent().fadeOut();
	var htm=`<!--details-->
				<div class="content-more-details collaborators collaborators-sent-item" data-old-resources="`+id+`">
					<span class="remove-collaborators-button-sent-item" onclick="removeFromsendingList(this);" data-resources="`+id+`" style="position:absolute;right:5px;width:10px;height:10px;">x</span>
					<small>
						<span><i class="material-icons md-24">account_circle</i></span>
						<span style="font-size:smaller;"> &nbsp;<b>`+name+`</b></span>
						<p class="text-muted" style="font-size:smaller;"> &nbsp;`+department+`</p>
					</small>
					
				</div>
				<!--/details-->

				
			`;

	$('.sendingList').css({marginBottom:'50px',background:'rgba(250,250,250,0.3)',paddingTop:'10px'}).append(htm)

	//load save button
	loadCollaboratorSaveButton('.collaborators-menu');
}

function removeFromsendingList(element){
	var id=$(element).attr('data-resources');
	//remove from view
	$(element).parent().slideUp("fast");

	if(window.sessionStorage.getItem('sending_list')!=null){
		var list=JSON.parse(window.sessionStorage.getItem('sending_list'));
		//set value to null
		list.data[id]=null;
		list.count--;
		window.sessionStorage.setItem('sending_list',JSON.stringify(list));
	}

	console.log(list.count<0)
	if(list.count<0){
		$('.collaborators-menu').html('');
	}
	console.log(window.sessionStorage.getItem('sending_list'))

}



function searchPeople(param,page=1,target,callback=function(e){}){
	var html="<br/><br/>";

	__ajax_contact_search('param='+param+'&page=1',function(e){

			var data=JSON.parse(e);

			if(data.status==200){

				var contacts=(typeof data.contacts !='undefined')?data.contacts:[];
				var html=`<br/><br/>`;
			

				for(var x=0; x<contacts.length;x++){ 
					html+=`

						<!--contacts-->
						<div class="col col-md-12 col-xs-12 groups phone-book">
							<div class="col col-md-10 col-sm-10 col-xs-9"  style="margin-top:10px;">
								<small class="text-muted">
									<p><b>`+contacts[x].name+`</b></p>

								</small>
							</div>

							<div class="col col-md-2 col-sm-2 col-xs-3">
								<button class="btn btn-default btn-xs" data-name="`+contacts[x].name+`" data-department="`+contacts[x].department+`" data-resources="`+contacts[x].id+`" onclick="addToSendingList(this);"><i class="material-icons md-18">add</i></button>
							</div>
						</div>
						<!--contacts-->	`;
				
				}


				$(target).html(html)

			}else{
				alert('Unable to search contacts')	
			} 

			setTimeout(function(){callback()},300)

		},function(e){

		})
}



function get_contact_list(page,target,callback=function(){}){

	__ajax_contacts('page='+page,function(e){
		//success
		var data=JSON.parse(e);

		var contacts=(typeof data.contacts !='undefined')?data.contacts:[];
		var html=``;

		var contact_count=0;

		for(let value in contacts){
			contact_count++;
			html+=`	<div class="col col-md-12 text-muted"><br/>
						<div class="col col-md-12 row">`
				for(var x=0; x<contacts[value].length;x++){ 
					console.log(contacts[value][x])
					if(contacts[value][x].name.length>1){
						html+=`


								<!--contacts-->
								<div class="col col-md-12 col-xs-12 groups phone-book">

									<div class="col col-md-10 col-sm-10 col-xs-9"  style="margin-top:10px;">
										<small>
											<p><b>`+contacts[value][x].name+`</b></p>
											<!--<p class="text-muted">`+contacts[value][x].department+`</p>
											<p class="text-muted">`+contacts[value][x].position+`</p>-->
										</small>
									</div>

									<div class="col col-md-2 col-sm-2 col-xs-3">
										<span data-name="`+contacts[value][x].name+`" data-department="`+contacts[value][x].department+`" data-resources="`+contacts[value][x].id+`" onclick="addToSendingList(this);" style="cursor:pointer;"><i class="material-icons md-28">add_box</i></span>
									</div>

									

								</div>
								<!--contacts-->	`;
						}
				}

			html+=`</div></div>`;
			
		}

		if(contact_count==10){

			html+=`<div class="col col-md-12 text-center text-muted" style="background:rgb(250,250,250);padding:4px;margin-top:20px;margin-bottom:20px;"  onclick="show_more_contacts(this)">Show more</div>`
		}
			
		$(target).append(html)
		callback(e,contact_count)
	});
}


$('#people-search').keyup(function(){
	clearTimeout(searchTimeout);

	var parent = this;
	searchTimeout=setTimeout(function(){
		
		//must not be empty
		if($(parent).val().length<1){
			$('.contact-search').hide()
			$.mobile.loading('hide')
			$('.contact-list').show();
		}else{
			//do searching
			searchPeople($(parent).val(),1,'.contact-search',function(e){
				$.mobile.loading('hide')
			})
		}

	},700)

	//hide list
	$('.contact-list').hide();

	//show loading

	$('.contact-search').show().html('Loading . . .')

	//show mobile loading
	$.mobile.loading('show')
})



//get contact list
$.mobile.loading('show');
get_contact_list(1,'.contact-list');

