/*require _ajax.details.js*/
import { 
	__ajax_details, 
	__ajax_collaborators, 
	__ajax_notes, 
	__ajax_activities, 
	__ajax_routes, 
	__ajax_update_route, 
	__ajax_storage, 
	__ajax_post_attachments_comment, 
	__ajax_post_notes, 
	__ajax_notes_update, 
	__ajax_basket_update_description,
	__ajax_basket_update_keywords ,
	__ajax_post_attachments_link,
	__ajax_post_storage,
	__ajax_search
} from '../ajax/ajax.details'

import { __ajax_categories } from '../../basket/ajax/ajax.categories'
import { config as __config } from '../../../../config/app'
import { loadCheckListContent } from '../../index/core'
import { modal_ajax, loadDetailsInit  } from '../../index/functions/functions.list'
import { push_upload_notification } from '../../notifications/functions/functions.notifications'


// hack to make it available  to global scope
window.modal_ajax = modal_ajax 
window.download = download
window.preview = preview
window.updateNotes = updateNotes
window.saveUpdatedNotes = saveUpdatedNotes
window.notesCancelUpdate = notesCancelUpdate
window.update_basket_description = update_basket_description
window.update_basket_keywords = update_basket_keywords
window.split_keywords = split_keywords
window.reloadDetails = reloadDetails
window.uploadFileFromStorage = uploadFileFromStorage

function deviceReadyForMobile(){
	//save to window
	window.sdft.deviceInstance='mobile';


}


var selected=[]
var count = 0

function loadContent(callback){
	setTimeout(function(){
		$('#home').html('<div class="home-content"></div><div class="group-content"></div>');
		callback(this)
	},300)
}

function loadTopMenu(status){
	var publish_button='';
	var update_button='<li><button class="btn btn-xs btn-default" title="Reload page" onclick="reloadDetails()"><i class="material-icons">refresh</i></button></li>';

	if(status=='draft'){
		publish_button=`<li><button class="btn btn-xs btn-default" title="publish" data-toggle="modal" data-target="#myModal" href="publish.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)"><span><i class="material-icons">device_hub</i></span></button></li>`

 
	}else{
		$('.details-menu').html('')
	}

	if(status=='draft'||status=='open'){


 	 	//menu for xs devices
 	 	$('.top-menu-section-xs').html(`
 	 		<input type="file" name="files[]" class="content-menu-attachment-input" multiple/><ul class="nav navbar-header navbar-right pull-right top-menu">
	        <li class="dropdown">
 	 			<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown"><i class="material-icons">attachment</i> attach</button>
 	 			<!--atachment-menu-->
	 	 		<ul class="list-unstyled dropdown-menu">
					<li class="content-menu-attachment">
						<a href="#"><i class="material-icons" style="font-size:18px;">laptop</i><span> Upload from device</span></a>
					</li>
					<li data-toggle="modal" data-target="#myModal" class="visible-open">
						<a href="storage_file_selection.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)"><i class="material-icons" style="font-size:18px;">sd_storage</i><span> Select from storage</span></a>
					</li>
					<li>
						<div class="form-group">
							<span class="col col-md-9 col-xs-9"><input type="text" placeholder="Paste URL" class="form-control uploadFromLinkInput"></span>
							<span class="col col-md-3 col-xs-3">
								<a href="#" class="uploadFromLinkButton"><i class="material-icons">attachment</i></a>
							</span>
						</div>
					</li>
				</ul>
 	 		</li>

	        <li><button class="btn btn-xs btn-default" data-toggle="modal" data-target="#myModal" href="share.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" ><i class="material-icons">folder_shared</i> Share</button></li>
	        `+publish_button+` `+update_button+`
	  	 </ul>`)


 	 	//menu for md - lg devices
 	 	$('.top-menu-section-md').html(`
 	 		<ul class="nav navbar-nav navbar-right pull-right top-menu">
 	 		<li class="dropdown">
 	 			<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown"><i class="material-icons">attachment</i> attach</button>
 	 			<!--atachment-menu-->
	 	 		<ul class="list-unstyled dropdown-menu">
					<li class="content-menu-attachment">
						<a href="#"><i class="material-icons" style="font-size:18px;">laptop</i><span> Upload from device</span></a>
					</li>
					<li data-toggle="modal" data-target="#myModal" class="visible-open">
						<a href="storage_file_selection.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)"><i class="material-icons" style="font-size:18px;">sd_storage</i><span> Select from storage</span></a>
					</li>
					<li>
						<div class="form-group">
							<span class="col col-md-9 col-xs-9"><input type="text" placeholder="Paste URL" class="form-control uploadFromLinkInput"></span>
							<span class="col col-md-3 col-xs-3">
								<a href="#" class="uploadFromLinkButton"><i class="material-icons">attachment</i></a>
							</span>
						</div>
					</li>
				</ul>
 	 		</li>

 
	        <li><button class="btn btn-xs btn-default" data-toggle="modal" href="share.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)"><i class="material-icons">folder_shared</i> Share</button></li>
	        `+publish_button+` `+update_button+`
	  	 </ul>`);


 	 	var allowedFileType=['application/pdf','image/png','image/jpg','image/jpeg'];
 	 	//bind event to file selection
 	 	$('.content-menu-attachment-input').change(function(){
 	 		var files=this.files;

 	 		for(var x=0;x<files.length;x++){ 
 	 			
 	 			if(allowedFileType.indexOf(files[x].type)==-1){
 	 				alert(encodeURI(files[x].name)+' could not be uploaded. Invalid file type!')
 	 			}else{
 	 				var reference_time=new Date().getTime();
 	 				
 	 				$('.upload-section').append(`<div class="col col-md-12 attachments `+reference_time+`">
									<!--media-->
									<div class="media">
									  <div class="media-left">
									    <a href="#">
									      <div class="file-icon file-icon-default" style="background:rgb(180,180,180);"></div>
									    </a>
									  </div>
									  <div class="media-body">
									    <div class="row col-md-12"><span class="tags" style="background:rgb(200,200,200);">Uploading (<span class="progress-`+reference_time+`" data-parent="`+reference_time+`">0%</span>)</span></div>
									    <small>
										    <p></p>
											<p>`+encodeURI(files[x].name)+` </p><p><b>(`+(files[x].size/1000)+` KB)</b></p>
										</small>
										<button class="btn btn-default btn-xs cancel-`+reference_time+`"><i class="material-icons md-18 md-dark inactive">cancel</i> Cancel</button>
									  </div>
									</div>
								</div>`);

 	 				//upload
					uploadAttachment(files[x],'.progress-'+reference_time);

 	 			}
 	 		}
 	 	})

 	 	//insert from link
 	 	

 		$('.uploadFromLinkButton').on('click',function(e){
 			e.preventDefault();

 			var inputField = ($(this).parent().parent()[0].querySelector('input.uploadFromLinkInput'))
 			if(inputField.value.length>5){
 				$.mobile.loading('show'); 
 				
 				//add
 				uploadFileFromLink(inputField.value)
 				
 			}


 		})
 	
	}


	 	 	

}


function clearLoadTopMenu(){
	$('.top-menu-section-xs').html('');
	$('.top-menu-section-md').html('');
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

function loadBasketOpenMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Open</h3>
		<div>
			
			<p><i class="material-icons">info</i> Changing the status of the basket accordingly allow/prevent users to do any unappropriate action. </p>
			<p> <button class="btn btn-default" data-toggle="modal" href="update_basket_status_open.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><a href="#">Open</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function loadBasketCloseMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Close</h3>
		<div>
			<p><i class="material-icons">info</i> Changing the status of the basket accordingly allow/prevent users to do any unappropriate action. </p>
			<p> <button class="btn btn-default" href="update_basket_status_close.html" data-target="#myModal" data-toggle="modal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><a href="#">Close</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function loadBasketForbidden(target){
	$(target).html(`
		<h3 class="text-danger">Forbidden</h3>
		<div>
			<p><i class="material-icons">info</i> Sorry, you cannot change the status of this basket.</p>
		</div><hr/><br/>`)
}


function loadBasketDeleteMenu(id,target,callback=function(e){}){
	$(target).html(`<h3 class="text-danger">Delete</h3>
		    	<div class="alert alert-danger">
			    	<p><i class="material-icons">info</i> This section allows you to remove the basket and its content including logs and other related activities.Please proceed with caution.</p>
			    	<p> <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" href="trash.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><span>Remove</span></button> </p>
			   </div>`)
	callback(target);
}

function loadBasketUpdateMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Update</h3>
		<div>
			
			<p class="text-muted"><i class="material-icons">shopping_basket</i> Update description of this basket.</p>
			<p> <button class="btn btn-default" data-toggle="modal" data-target="#myModal" href="update_basket_description.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><a href="#">Update</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function bindEventToAttachmentMenu(){
	$('.content-menu-attachment').click(function(){
		$('.content-menu-attachment-input').click();
	})
}

function showMoreDescription(el){
	var target=$(el).attr('data-target');
	var content=$(el).attr('data-content');
	$(target).text(content);
}

function loadNoteTextArea(){
	$('.note-textarea-section').html(`<textarea rows="5" placeholder="Write notes here" class="form-control notes-main-textarea"></textarea>
		    		<button class="btn btn-danger pull-right add-note-button">POST</button><br/><br/>`)
	$('.add-note-button').off('click',saveNotes)
	$('.add-note-button').on('click',saveNotes)
}

function unloadNoteTextArea(){
	$('.note-textarea-section').html('')
}

function getDetails(data,callback){
	
	//clear menu
	clearLoadTopMenu();

	//clear update menu
	$('.basket_update_menu').html('')

 	 __ajax_details(data,function(e){

 	
 	 	try{

 	 		var data=JSON.parse(e)
 	 		window.sdft.category=data.details.category;
 
 	 		//console.log(data)
 	 	}catch(e){
 	 		$('.main-page-content').html(`
 	 			<center>
					<h3 class="text-muted"><i class="material-icons" style="font-size: 5em;">signal_wifi_off</i></h3>
					<h3>No Content Available</h3>
					<p>The basket you are viewing is currently unavailable due to connection issue or broken content.Please make sure you have privilege to view this link. If error persist, please contact IT support.</p>
				</center>`);
 	 	}

 	 	var attachments=(typeof data.details.attachments!='undefined')?data.details.attachments:[];
		
		loadTopMenu(data.details.status)

		bindEventToAttachmentMenu()



		if(data.details.status=='open'){
			loadBasketCloseMenu(data.details.id,'.basket_status_menu',function(e){})
			loadBasketUpdateMenu(data.details.id,'.basket_update_menu',function(e){})
			//delete menu
			loadBasketDeleteMenu(data.details.id,'.basket_delete_menu',function(e){})
			//comment section
			loadNoteTextArea()

		}else if(data.details.status=='closed'){
			loadBasketForbidden('.basket_update_menu')
			//clear comment section
			unloadNoteTextArea()
			//loadBasketOpenMenu(data.details.id,'.basket_status_menu',function(e){})
		}else{

		}

		//publish menu
		if(data.details.status=='draft'){
			loadPublishButton(data.details.id,'.details-menu');
			loadBasketUpdateMenu(data.details.id,'.basket_update_menu',function(e){})
			//delete menu
			loadBasketDeleteMenu(data.details.id,'.basket_delete_menu',function(e){})
		}

		

 	 	window.sdft.details=data.details;
 	 	
 	 	//author
 	 	$('.author-name').text(data.details.author.name);
 	 	$('.position').text(data.details.author.position);
 	 	$('.department').text(data.details.author.department);

 	 	
 	 	//keywords
 	 	var keywords=split_keywords(data.details.keywords)
 	 	
 	 	window.sdft.keywords=data.details.keywords
 	 	$('.keywords-section').html(keywords)

 	 	

 	 	//description
 	 	var description=data.details.description;
 	 	if(description.length>600) description=description.substr(0,600)+' <a href="#" data-target=".description" data-content="'+data.details.description+'" onclick="showMoreDescription(this);"><small><u>read more</u></small></a>';
 	 	$('.description').html(description);





 	 	//template
 	 	var html=`<div class="col col-md-12 upload-section row" style="margin-bottom:30px;padding-top:20px;"></div><div class="col col-md-12 attachment-section row">`;

 	 	//attachments

 	 	//no attachments
 	 	if(attachments.length<=0){
 	 		html+='<center class="text-muted no-available-data"><h3><i class="material-icons" style="font-size:48px;">phonelink_off</i> </h3><h3>No Available Data</h3><p>Please make sure that someone uploaded a file for viewing </p></center>';
 	 	}
	window.sdft.details.checklist = window.sdft.details.checklist||[]
 for(var x=0;x<attachments.length;x++){

 	 		var type=attachments[x].files.type;
 	 		var category=attachments[x].files.category==null?'Uncategorized':attachments[x].files.category;
 	 		var file_name=attachments[x].files.name;
 	 		var size=attachments[x].files.size;
 	 		var categoryTagClass=''
 	 		if(category=='Uncategorized'){
 	 			categoryTagClass='default';
 	 		}
 	 		
 	 		//add to checklist
 	 		window.sdft.details.checklist.push(category)

	 	 	html+=`<!--attachments-->
						<div class="col col-md-12 attachments `+attachments[x].files.status+` attachments-`+attachments[x].files.id+`">
						`
				if(data.details.status!='closed'){			
					html+=`<div class="attachments-menu-section dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
									<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
								</a>
								<ul class="list-unstyled dropdown-menu pull-right">
									<li data-resources="`+attachments[x].files.id+`" onclick="download(this)">
										<a href="#"><i class="material-icons" style="font-size:18px;">file_download</i> <span>Download</span></a>
									</li>`

									if(attachments[x].files.status=='open'){
										html+=`
										<li data-resources="`+attachments[x].files.id+`" data-toggle="modal" data-target="#myModal" class="visible-open">
											<a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`">
												<i class="material-icons">remove_circle</i> <span>Remove</span>
											</a>
										</li>
										<li data-resources="`+attachments[x].files.id+`" class="visible-open" data-toggle="modal" data-target="#myModal">
											<a href="attachment_category.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
										</li>
							
										`
									}

									

									//link is for creator only
									if(attachments[x].files.status=='open'&&attachments[x].author.id==__config.session.uid){
										html+=`
										<li data-resources="`+attachments[x].files.id+`" class="visible-open" data-toggle="modal" data-target="#myModal">
											<a href="storage_link.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`"><i class="material-icons" style="font-size:18px;">link</i><span> Get Link</span></a>
										</li>
										`
									}


									if(attachments[x].files.status=='open'){
										html+=`
											<li data-resources="`+attachments[x].files.id+`" data-toggle="modal" data-target="#myModal">
												<a href="update_attachment_status.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">lock</i><span>Close Attachment</span>
											</li>
											`
									}else{
										//remove from specs
										// Users are not allowed to re open attachments
										/*html+=`
											<li data-resources="`+attachments[x].files.id+`" data-toggle="modal" data-target="#myModal">
										 		<a href="update_attachment_status_open.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`" data-category="`+category+`">
										 			<i class="material-icons" style="font-size:18px;">lock_open</i><span>Open Attachment</span>
												</a>
											</li>
								 		`;*/
									}



									html+=`
								</ul>
							</div>`
				}
							
					html+=`		<!--media-->
							<div class="media">
							  <div class="media-left">
							    <a href="#">
							      <div class="file-icon file-icon-default" data-type="`+type+`"></div>
							    </a>
							  </div>
							  <div class="media-body">
							    <p><b>`+file_name+`</b>
							    <small>
									 `

									if(attachments[x].files.status=='closed'){
										html+=`<span class="data-attachment-status" data-resources="`+attachments[x].files.id+`"><i class="material-icons text-muted visible-closed" style="font-size:18px;">lock</i></span>`;
									}else{
										html+=`<span class="data-attachment-status" data-resources="`+attachments[x].files.id+`"></span>`;	
									}

									html+=
									`
								</small></p>
								<div class="row col-md-12">
									<span class="tags `+categoryTagClass+`"  data-resources="`+attachments[x].files.id+`" onclick="this.style.width=this.style.width!='auto'?'auto':'150px';this.style.height=this.style.height!='auto'?'auto':'32px';download(this);">
											<span><i class="material-icons" style="font-size:18px;">file_download</i></span>
									
									<span class="category" data-resources="`+attachments[x].files.id+`">`+category+`</span>
									</span>

									<span class="btn btn-default btn-sm" style="margin: 0;height: 34px;margin-left: 10px;padding-top: 8px;" data-resources="`+attachments[x].files.id+`" onclick="preview(this)">Preview</span>
								</div>
								<small class="row col-md-12"><p>`+attachments[x].files.date_modified+`</p></small>
								<div class="col">
									<details  class="col col-md-12">
										<summary>File Info</summary>
										<div class="col col-md-12 row" style="border-left:3px solid #009688;">
											<small class="row col-md-12">
												<!--<div class="col col-md-2 col-xs-2 col-lg-1"><div class="media-circles circle-md"><img src="`+attachments[x].author.image+`" width="100%;"></div></div>-->
												<div class="col col-md-8 col-xs-10">
													<p><b>Author : `+attachments[x].author.name+`</b></p>
									    			<p class="text-danger"><b>File name : </b>`+file_name+` &emsp;</p>
									    			<p><b>File Type :</b> <b>`+type+`</b></p>
									    			<p><b>Size :</b> <b>`+(size/1000)+` KB</b></p>
												</div>
									    		
									    	</small>
										</div>	
									</details>

								
									<details class="col col-md-12">
										<summary><small><i class="material-icons md-18">comment</i>Comments <span class="text-danger">${attachments[x].comments.length>0?'('+attachments[x].comments.length+')':''}</span></small></summary>
										<div class="row comments-section" data-resources="`+attachments[x].files.id+`" style="border-left:3px solid #009688;">
											`
											for(var y=0;y<attachments[x].comments.length;y++){
												html+=appendComment(attachments[x].comments[y].id,attachments[x].comments[y].profile_name,attachments[x].comments[y].comment)
											}

									html+=		`
										</div>
										
										<div class="col col-md-12"><br/>
											<hr/>
											<div class="col-md-12">
												<div class="circle" style="float:left;width:35px;height:35px;background:#009688;text-align:center;color:#fff;border-radius:50%;margin-right:10px;overflow:hidden;">
													<img src="assets/img/user.png" width="100%"/>
												</div>
												<small>
													<p><a href="#">${__config.session.fullName}</a><br/><span class="text-muted">${__config.session.position}</span></p>
												</small>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<input type="text" placeholder="Type your comment here" class="form-control comment-section-textarea" data-resources="`+attachments[x].files.id+`"/>
												</div>
											</div>
										</div>

									</details>
								
								</div>
							  </div>
							</div>
						</div>
					<!--/attachments-->`;
		}

		html+='<div class="expand-attachments-section text-center" onclick="console.log(this.parentNode.style.maxHeight=\'none\');this.parentNode.removeChild(this);"><div class="col col-xs-12 text-center align-center">Some items collapsed.Show all attachments &raquo;</div></div></div>';
 	 	//load view
 	 	$('.home-content').html(html);


 	 	//checklist
 	 	
 	 	setTimeout(()=>{
			loadCheckListContent('id='+window.sdft.details.category+'&token='+__config.session.token,function(e){
				window.sdft.details.checklistAll=[]
				let htm =''
				
				for(var x=0;x<e.categories.length;x++){
					window.sdft.details.checklistAll.push(e.categories[x])
					htm += `
						<div class="col col-md-12"
							<div class="form-group">
				              <div class="checkbox">
				                <label>
				                  <input type="checkbox" disabled ${window.sdft.details.checklist.indexOf(e.categories[x].category)!=-1?'checked="checked"':''}><span class="checkbox-material"><span class="check"></span></span> ${e.categories[x].category}
				                </label>
				              </div>
				            </div>
				         </div>
					`	
				}
				
				$('.todo-section').html(htm)
			})
		},700)














 	 	//allow comment
 	 	bindEventToCommentInput()

 	 	//show more section
 	 	try{
	 	 	if(parseInt(window.getComputedStyle($('.attachment-section')[0]).getPropertyValue('height'))>=690){
	 	 			$('.expand-attachments-section').show();	
	 	 	}
	 	 }catch(e){}

 	 	callback(e)
 	 	
 	 },function(e){
 	 	//hide content and show error
 	 	$('.main-page-content').html('<center class="text-muted no-available-data"><h3><i class="material-icons" style="font-size:48px;">phonelink_off</i> </h3><h3>No Available Data</h3><p>Please make sure the data you are viewing is available and not broken</p></center>')
 	 });



}

function bindEventToCommentInput(){
	$('.comment-section-textarea').off('keyup',comment)
	$('.comment-section-textarea').on('keyup',comment)
}

function comment(e){
	let targ = e.target
	let val = e.target.value
	let id = e.target.getAttribute('data-resources')

	let data={
		token: __config.session.token,
		id: id,
		comment:val,
	}

	if(e.keyCode===13){

		__ajax_post_attachments_comment(data,function(e){

			var data=JSON.parse(e)

			//success
			if(data.id){
				
				$(`.comments-section[data-resources="${id}"]`).append(appendComment(id,__config.session.fullName,val))
				targ.value = ''
			}else{
				alert('Unable to process request. Please try again later')
			}

			

		},function(){
			alert('Unable to process request. Please try again later')
		})
		
	}
}

function appendComment(id,uploader,val){
	let initial = uploader.charAt(0).toUpperCase()
	let htm =`
	<div class="col col-md-12">
		<div class="col-md-12">
			<hr/>
			<!--menu-->
			<a href="#" class="dropdown-toggle pull-right" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
				<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
			</a>
			<ul class="list-unstyled dropdown-menu pull-right">
				<li data-resources="rem" data-toggle="modal" data-target="#myModal" class="visible-open">
					<a href="remove_attachment_comment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">
						<i class="material-icons">remove_circle</i> <span>Remove</span>
					</a>
				</li>
			</ul>

			<div class="circle" style="float:left;width:20px;height:20px;background:rgb(60,60,60);text-align:center;color:#fff;border-radius:50%;margin-right:10px;">
				${initial}
			</div>
			<p class="text-muted" style="font-size:10px;">
				${uploader}<br/>
				${new Date().getUTCMonth()} / ${new Date().getUTCDate()} / ${new Date().getUTCFullYear()}
			</p>
		</div>
		<div class="col col-md-12">
			<small>
				${val}
			</small>
		</div>
	</div>
	`

	return htm
}


function getCollaborators(data,callback){
	//empty collaborator first
	window.sdft.collaborators=[];

 	 __ajax_collaborators(data,function(e){
 	 	var data=JSON.parse(e)


 	 	//assign collaborators to window
 	 	window.sdft.collaborators=data.collaborators;

 	 	var htm=`<div class="col col-md-12 row" style="margin-bottom: 20px;position:relative;">
					<br/><br/>
					<span class="content-header" style="width:170px;padding-top:20px;"><i class="material-icons" style="width:24px;">groups</i> Collaborators</span>
					<span class="collaborators-menu"></span>
				</div>
				<div class="col col-xs-12 row sendingList"></div>
				<div class="row"><div class="container-fluid collaborators-list">`
		

 	 	//empty collaborators
 	 	if(data.collaborators.length<=0){
	 	 	htm+=`
	 	 	<div class="col col-md-12">
	 	 		<center class="text-muted">
	 	 			<h3><i class="material-icons" style="font-size:48px;">local_mall</i> </h3>	 	 			
	 	 			<h3	>Share this basket to someone</h3><p>Start adding contacts to start collaboration </p>
	 	 		</center>
	 	 	</div>
	 	 	`;
	 	 }



 	 	for(var x=0;x<data.collaborators.length;x++){

 	 		var checked='';

 	 		if(data.collaborators[x].read_only){
 	 			checked='checked="checked"';
 	 		}

 	 		htm+=`<!--details-->
				<div class="content-more-details collaborators" data-resources="`+data.collaborators[x].collaborator_id+`">
					<span href="remove_collaborator.html" data-toggle="modal" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+data.collaborators[x].collaborator_id+`"  style="position:absolute;right:5px;width:10px;height:10px;">x</span>
					<small>
						<span><i class="material-icons md-24">account_circle</i></span>
						<span style="font-size:smaller;"> &nbsp;<b>`+data.collaborators[x].name+`</b></span>
						<p class="text-muted" style="font-size:smaller;"> &nbsp;`+data.collaborators[x].department+`</p>
					</small>
					<!--<div class="ajax-span-container">
						<small>
							<div class="checkbox">
				                <label>
				                  <input type="checkbox" `+checked+`><span class="checkbox-material"><span class="check"></span></span> Read-only
				                </label>
				              </div> 
				             </small>
					</div>-->
					
				</div>
				<!--/details-->

				
			`;
 	 	}

 	 	htm+=`</div></div>`

 	 	//load view
 	 	$('.group-content').html(htm);

 	 	$('.collaborators').click(function(e){
 	 		console.log($(this).children('div.ajax-span-container').slideToggle('fast'))
 	 	})

 	 	/*-------------
 	 	| Callback
 	 	|--------------*/
 	 	callback(e)


 	 	
 	 },function(e){

 	 });

 }


function getActivities(data,callback){

	 __ajax_activities(data,function(e){
	 	var data=JSON.parse(e);

		var html=``;

		var activities=(typeof data.activities!='undefined')?data.activities:[];

		for(var x=0; x<activities.length; x++){
			html+=`
			<!--details-->
				<div class="col col-md-12 col-xs-12 activities" style="margin-bottom: 20px;">
					<small>
						<!--<div class="col col-md-1 col-lg-1 col-xs-3 hidden-xs"><div class="media-circles circle-md"><img src="assets/img/user.png" width="100%;"></div></div>-->
						<div class="col col-md-8 col-xs-12 col-sm-9 col-md-11">
							<p><b>`+activities[x].name+`</b></p>
							<p class="text-danger">`+activities[x].logs+`</p>
							<p>`+activities[x].date_created+`</p>
						</div>
						
					</small>
				</div>
			<!--/details-->`;	
		}
		

		$('#activities').html(html)

	 },function(){
	 	$('#activities').html('<center class="text-muted"><h3>No Recent Activities</h3><p>System detected that nothing has changed in this basket ever since.</p></center>')
	 });

}



function getNotes(data,callback){

	 __ajax_notes(data,function(e){
	 	var data=JSON.parse(e);
	 	$('#notes-section').html('')
		

		var notes=(typeof data.notes!='undefined')?data.notes:[];

		for(var x=0; x<notes.length; x++){
			//allow to modify if the requestor is the owner of the notes
			if(notes[x].uid==__config.session.uid) notes[x].hasOptions=true
			appendNotes(notes[x],window.sdft.details.status)	
		}
	

	 },function(){
	 	$('#activities').html('<center class="text-muted"><h3>Empty Notes</h3></center>')
	 });

}



function appendNotes(notes,status,callback=function(){}){
	var n=notes.notes.replace(/[\n]/g,'<br/>');

	var html=`
			<!--details-->
				<div class="col col-md-12 col-xs-12 activities" style="margin-bottom: 20px;">
					<small>
						<!--<div class="col col-md-1 col-lg-1 col-xs-3 hidden-xs"><div class="media-circles circle-md"><img src="assets/img/user.png" width="100%;"></div></div>-->
						<div class="col col-xs-12 col-sm-9 col-md-11">
							<p><b>${notes.name}</b><span class="pull-right"><u>${notes.date_modified}</u></span></p>
							<p class="text-muted notes" id="notes-${notes.id}">${n}</p>
						</div>
						
					</small>`

					//options
					if(notes.hasOptions&&status=='open'){

						html+=`
							<div class="notes-menu-section dropdown pull-right visible-open">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
								</a>
								<ul class="list-unstyled dropdown-menu pull-right">
									<li data-resources="${notes.id}" data-toggle="modal" data-target="#myModal" class="visible-open">
										<a href="remove_notes.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="${notes.id}">
											<i class="material-icons">remove_circle</i> <span>Remove</span>
										</a>
									</li>
									<li data-resources="${notes.id}" class="visible-open">
										<a href="#" data-role="none" onclick="updateNotes(event,this)" data-notes-menu-id="${notes.id}" data-resources="${notes.id}" data-content="${notes.notes}"><i class="material-icons" style="font-size:18px;">edit</i><span>Update</span></a>
									</li>
								</ul>
							</div>
						`

					}

		html+=`	</div>
			<!--/details-->`;	
	$('#notes-section').prepend(html)

	callback(notes)
}

function updateNotes(e,el){
	var id=$(el).attr('data-resources')
	var n=$(el).attr('data-content').replace(/[\n]/g,'<br/>');

	$(`#notes-${id}`).html(`<div class="text-area-update"><textarea rows="10" class="form-control" data-resources="${id}" data-content="${n}" autofocus>${$(el).attr('data-content')}</textarea><button class="btn btn-xs btn-default pull-right" onclick="saveUpdatedNotes(event,this)">Update</button> <button class="btn btn-xs btn-default pull-right notes-cancel-button" onclick="notesCancelUpdate(event,this)">Cancel</button></div>`)
	$.material.init()
}

function notesCancelUpdate(e,el){
	var parent=$(el).parent()
	var oldValue=$(parent[0].children[0]).children()[0].getAttribute('data-content')
	parent.parent().html(oldValue.replace(/[\n]/g,'<br/>'))
}


function saveNotes(){
	var textarea=$('.notes-main-textarea')
	var note={
		name:__config.session.fullName,
		hasOptions:true,
		token:__config.session.token,
		id:window.sdft.active
	}
	if(textarea.val().length>0){
		note.notes=textarea.val()
		note.date_modified=''

		__ajax_post_notes(note,function(e){
 	 	
	 	 	try{
	 	 		var data=JSON.parse(e)

	 	 		if(data.id){
	 	 			note.id=data.id	 		
					appendNotes(note,'open',function(){
						textarea.val('')
					})	
	 	 		}

	 	 	}catch(e){

	 	 	}
		})
	}
}

function saveUpdatedNotes(e,el){
	var parent=$(el).parent()
	var textArea=$(parent[0].children[0]).children()[0]
	var id=textArea.getAttribute('data-resources')

	var note={
		notes:$(textArea).val(),
		token:__config.session.token,
		id:window.sdft.active,
		note_id:id
	}

	__ajax_notes_update(note,function(e){
	 	var data=JSON.parse(e);
	 	
	 	if(data.id){
	 		parent.parent().html($(textArea).val().replace(/[\n]/g,'<br/>'))
	 		//change data-content in menu
	 		document.querySelector(`a[data-notes-menu-id="${note.note_id}"]`).setAttribute('data-content',note.notes)
	 	}else{
	 		alert('Unable to process request. Please try again later')	
	 	}
	 	
	 },function(){
	 	alert('Unable to process request. Please try again later')
	 });

	
}


function getCategories(data,callback=function(){}){
	__ajax_categories(data,function(e){
		callback(JSON.parse(e))
	},function(){

	});
}

function appendColaborators(data,target){
	var htm=`<!--details-->
				<div class="content-more-details collaborators">
					<span style="position:absolute;right:5px;width:10px;height:10px;">x</span>
					<small>
						<span><i class="material-icons">account_circle</i></span>
						<span style="font-size:smaller;"> &nbsp;<b>ssss</b></span>
						<p class="text-muted" style="font-size:smaller;"> &nbsp;ssss</p>
					</small>
					<div class="ajax-span-container">
						<small>
							<div class="checkbox">
				                <label>
				                  <input type="checkbox"><span class="checkbox-material"><span class="check"></span></span> Read-only
				                </label>
				              </div> 
				        </small>
					</div>
					
				</div>
				<!--/details-->`

	$('.group-content').append(htm)
}

function uploadAttachment(file,target){

	if(window.sdft.uploading==null) window.sdft.uploading=[];

	window.sdft.uploading.push(target);

	//create form data
	var formData = new FormData();
	formData.append('file',file);
	formData.append('token',__config.session.token);
	formData.append('id',window.sdft.active);
	
	var xhr = new XMLHttpRequest();


	var parent=$(target).attr('data-parent');
	var fileType=file.type.split('/')[1];
	var fileName=file.name;
	var size=(file.size/1000)+'KiB';

	//cancel onclick
	$('.cancel-'+parent).on('click',function(){
		xhr.abort();
		$(this).text('canceled')
	})



	xhr.upload.addEventListener('progress',function(e){
		var total=(e.loaded/e.total)*100;
		$(target).html(Math.round(total)+'%')

		if(total===100){
			var index=window.sdft.uploading.indexOf(target);
			window.sdft.uploading.splice(index,1);

			var fullName=__config.session.fullName.length<=0?__config.session.firstName+' '+__config.session.lastName:__config.session.fullName

			//show attachment
 			append_attachment(fullName,parent,'null',fileName,fileType,file.type,size)
			//removed old
			$('.'+parent).remove();


 	 		
		}




	})

	xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) {
            var data=JSON.parse(xhr.responseText);

            var category=data.category==null?'Uncategorized':data.category;
            


			if(data.id!='undefined'){
				$('.tags-'+parent).attr('data-resources',data.id)

				//append to menu section
				append_attachment_menu(data.id,category,parent)
				

				//removed no data content
				$('.no-available-data').hide();


			}else{
				//failed to upload
				alert('Unable to upload file.Please try again later.')

				//remove section
				$('#attachment-menu-'+parent).parent().slideUp();
			}

			


			//send notification to socket
			push_upload_notification({basket_id:window.sdft.active,file_id:data.id,message:'create',details:window.sdft.details});
					
			
			

			
        }
    };

	xhr.open(__config.endpoint.basket.attachments.post.method, __config.endpoint.basket.attachments.post.url, true );
	xhr.send(formData);

}



function append_attachment(fullName,parent,id,fileName,fileTypeIcon,fileType,size){

			//show in uploaded section
			$('.attachment-section').prepend(`<div class="col col-md-12 attachments">
							<div class="attachments-menu-section dropdown" id="attachment-menu-`+parent+`"></div>
							<!--media-->
							<div class="media">
							  <div class="media-left">
							    <a href="#">
							      <div class="file-icon file-icon-default" data-type="`+fileType+`"></div>
							    </a>
							  </div>
							  <div class="media-body">
							  	<p><b>`+fileName+`</b></p>
							    <!--<p><b>`+fullName+`</b></p>
							    <small>
								    <p></p>
									<p>`+__config.session.position+`<i class="material-icons text-muted visible-closed" style="font-size: 18px; display: none;">lock</i></p>
								</small>-->
								<div class="row col-md-12">
									<span class="tags tags-`+parent+`" style="background:rgb(200,200,200);height:auto;" data-resources="`+id+`" onclick="download(this);">
								
								 		<span><i class="material-icons" style="font-size:18px;">file_download</i></span>
								 		<span class="category tags-`+parent+`" data-resources="`+id+`" >Uncategorized</span>
								 	</span>
								 </div>
								
								<div class="col col-md-12 row">
									<br/>	
									<details>
										<summary>More Details</summary>
										<div class="col col-md-12 content-more-details">
											<small>
												<div class="col col-md-12">
													<p><b>Author :</b> `+fullName+`</p>
									    			<p class="text-danger"><b>File Name :</b>`+fileName+` <span class="file-icon file-icon-xs" data-type="`+fileTypeIcon+`"></span></p>
									    			<p><b>File Type :</b> <b>`+fileType+`</b></p>
									    			<p><b>Size :</b> <b>`+size+` KiB</b></p>
												</div>
									    		
									    	</small>
										</div>	
									</details>
								</div>
							  </div>
							</div>

						</div>`)
}

function append_attachment_menu(id,category,parent){

	var htm=`<a href="#" class="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
					<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
				</a>
				<ul class="list-unstyled dropdown-menu pull-right">
					<li data-resources="`+id+`" data-toggle="modal" data-target="#myModal" class="visible-open">
						<a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">
							<i class="material-icons">remove_circle</i> <span>Remove</span>
						</a>
					</li>
					<li data-resources="`+id+`" class="visible-open" data-toggle="modal" data-target="#myModal">
						<a href="attachment_category.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
					</li>
					<li data-resources="`+id+`" data-toggle="modal" data-target="#myModal">
						<a href="update_attachment_status.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><i class="material-icons" style="font-size:18px;">lock</i><span>Close Attachment</span>
					</li>
				</ul>`
	$('#attachment-menu-'+parent).html(htm);
}

function getStorageList(data,callback){

	 __ajax_storage(data,function(e){
	 	var data=JSON.parse(e);
	 	callback(data)
	 },function(){
	 	//$('#activities').html('<center class="text-muted"><h3>Empty Notes</h3></center>')
	 });

}


function getRoutes(data,callback){
	 __ajax_routes(data,function(e){
	 	var data=JSON.parse(e);
	 	callback(data)
	 },function(){
	 	//$('#activities').html('<center class="text-muted"><h3>Empty Notes</h3></center>')
	 });
}

function setCurrentRoute(data,callback){
	 __ajax_update_route(data,function(e){
	 	var data=JSON.parse(e);
	 	callback(data)
	 },function(){
	 	//$('#activities').html('<center class="text-muted"><h3>Empty Notes</h3></center>')
	 });
}

function bindBtnRoute(){
	$('.btn-route').off('click')
	$('.btn-route').on('click',function(){
		let data ={
			token:__config.session.token,
			id: $(this).attr('data-resources'),
			action: $(this).attr('data-action')
		}

		setCurrentRoute(data,function(e){


			if(e.id<1){
				alert('Unable to upload file required. Pleas try again later')
				return 0;
			}

			if(data.action=='in'){

				$('.basket-route-btn-section').html(`<button class="btn btn-danger pull-right btn-route" data-resources="${data.id}" data-action="out"> <i class="material-icons">call_made</i> Basket OUT</button><br/>`)
			}else{
				$('.basket-route-btn-section').html(`<button class="btn btn-danger pull-right btn-route" data-resources="${data.id}" data-action="in"> <i class="material-icons">call_received</i> Received </button><br/>`)	
			}


			//add to view
			$('.route-section').prepend(`
				<p><b><div class="route-icon ${data.action=='in'?'active':''}"></div>${(data.action=='in'?'IN':'OUT')} : 
						</b><a href="#">${__config.session.fullName}</a> &emsp;<span class="text-muted">Just Now</span></p>
			`)

			setTimeout(()=>{ bindBtnRoute() },700);
		})

	})
}


function getStorage(page=1,storage='personal'){

	 var target

	 //target
	if(storage=='personal'){

		 target = $('.personal-storage-section')
		 $('.shared-storage-section').hide()
	}else{
		target = $('.shared-storage-section')
		$('.personal-storage-section').hide()
	}

	 getStorageList({storage:storage,token:__config.session.token,page:page},function(data){

		//clear al on first load
		if(page==1){
			//reset
			selected=[]
			count=0

			$(target).html('')
			$(target).show()

			$('.selected-count').html('')
			$('.selected-count').parent().attr('disabled','disabled')


			if(!data.files||data.files.length<1){
				$(target).html('<center style="border-left:1px solid #ccc;" class="text-muted"><i class="material-icons md-36">desktop_mac</i><h3>Empty Storage</h3></center>')	
			}
		}

	 	for(var x=0;x<data.files.length;x++){

	 		$(target).append(`
	 			 <span class="form-group">
                    <span class="checkbox">
                      <label style="color:rgb(100,100,100);">
                        <input type="checkbox" data-resources="${data.files[x].id}" class="storage-file-selection-checkbox"><span class="checkbox-material"><span class="check"></span></span>
                        &emsp;<div class="file-icon file-icon-xs" data-type="${data.files[x].type}"></div> 
                         <small>${data.files[x].original_filename} (${(data.files[x].size/1000)}kb) <span class="badge">${data.files[x].name}</span></small>
                      </label>
                    </span>
                  </span>
                    <hr/>
	 		`)

	 		//next page
	 		if(x==19){
	 			$(target).append(`<div class="text-center" onclick="showMoreFilesFromPersonalStorage(event,this,${page},${storage})"><a href="#">Show more<br/><i class="material-icons">expand_more</i></a></div>`)
	 		}
	 	}

	 	//allow option selection
	 	bindStorageFileSelection()

	 	$('#add_attachment_storage_button').on('click',uploadFileFromStorage)
	 	
	 })

}

function selectStorageFile(){

	 		var id = this.getAttribute('data-resources')

	 		if(this.checked){
	 			selected[id] = id
	 			count++
	 		}else{
	 			 selected.splice(selected.indexOf(id),1)
	 			 count--
	 		}


	 		if(count<1){
	 			$('.selected-count').html('')
	 			$('.selected-count').parent().attr('disabled','disabled')
	 			return 0
	 		}

	 		$('.selected-count').parent().removeAttr('disabled')

	 		$('.selected-count').html(`(${count} selected)`)
}

function bindStorageFileSelection(){
	 	//file selection
	 	$('.storage-file-selection-checkbox').off('change',selectStorageFile)
	 	$('.storage-file-selection-checkbox').on('change',selectStorageFile)
}

function bindStorageSelection(){
	$('.storage-selector').on('click',function(){
		selected = []
		count = 0
		$('#add_attachment_storage_button').off('click',uploadFileFromStorage)
		getStorage(1,$(this).attr('data-storage'))
		$('.storage-selector').removeClass('active')
		$(`.storage-selector[data-storage="${$(this).attr('data-storage')}"]`).addClass('active')
		$('.search-storage-section').hide()
	})
}

var timeout

function bindStorageSearch(){
	

	$('.storage-search-input').on('keyup',function(){

		if($(this).val().length<3) return 0

			var value = $(this).val()

			$('.personal-storage-section').hide()
			$('.shared-storage-section').hide()
			$('.search-storage-section').show()

			clearTimeout(timeout)
			timeout=setTimeout(function(){
				
				//clear
				$('.search-storage-section').html('')

				//search
				__ajax_search({param:value,token:__config.session.token},function(e){
					var data=JSON.parse(e);
					var htm=''
					//show results
					for(var x=0;x<data.files.length;x++){

				 		htm +=(`
				 			 <span class="form-group">
			                    <span class="checkbox">
			                      <label style="color:rgb(100,100,100);">
			                        <input type="checkbox" data-resources="${data.files[x].id}" class="storage-file-selection-checkbox"><span class="checkbox-material"><span class="check"></span></span>
			                        &emsp;<div class="file-icon file-icon-xs" data-type="${data.files[x].type}"></div> 
			                         <small>${data.files[x].original_filename} (${(data.files[x].size/1000)}kb) <span class="badge">${data.files[x].name}</span></small>
			                      </label>
			                    </span>
			                  </span>
			                    <hr/>
				 		`)
				 	}

				 	if(!data.files||data.files.length<1){
						htm=('<center style="border-left:1px solid #ccc;" class="text-muted"><p><i class="material-icons md-36">search</i> Not found in storage</p></center>')	
					}


				 	
					 	$('.search-storage-section').html(htm)

					 	bindStorageFileSelection()

					 	$('#add_attachment_storage_button').off('click',uploadFileFromStorage)

					 	$('#add_attachment_storage_button').on('click',uploadFileFromStorage)
				


		

		

				},function(){

				})	




			},1000)

			
				
	})
}

function uploadFileFromStorage(){

	var files = selected
	var fullName = __config.session.fullName.length<=0?__config.session.firstName+' '+__config.session.lastName:__config.session.fullName

	//clean files
	var filesToUpload = []
	for(var f in files){
		if(f!='null') filesToUpload.push(f)
	}
	 __ajax_post_storage({storage:'personal',token:__config.session.token,basket_id:window.sdft.active,ids:JSON.stringify(filesToUpload)},function(e){

	 	var data=JSON.parse(e);

	 	for(var x=0;x<data.files.length;x++){
	 		//show attachment
			var parent = new Date().getTime();
			//append attachment
			append_attachment(fullName,parent,data.files[x].id,data.files[x].filename,data.files[x].type,data.files[x].type,data.files[x].size)
			//append to menu section
			append_attachment_menu(data.files[x].id,'Uncategorized',parent)
			//send notification to socket
			try{ push_upload_notification({basket_id:window.sdft.active,file_id:data.files[x].id,message:'create',details:window.sdft.details}); }catch(e){}
	 	}

	 },function(){
	 	alert('Unable to upload file required. Pleas try again later')
	 });
}



function uploadFileFromLink(url){

	
	var fullName = __config.session.fullName.length<=0?__config.session.firstName+' '+__config.session.lastName:__config.session.fullName

	 __ajax_post_attachments_link({token:__config.session.token,basket_id:window.sdft.active,url:url},function(e){

	 	var data = {}
	 	try{ data=JSON.parse(e); }catch(e){}

	 	if(data.files>0){

			//show attachment
			var parent = new Date().getTime();
			//append attachment
			append_attachment(fullName,parent,data.details.id,data.details.original_filename,data.details.type,data.details.type,data.details.size)
			//append to menu section
			append_attachment_menu(data.details.id,'Uncategorized',parent)
	 	}else{
	 		alert('Sorry, Unable to attach file. You dont have enough privilege to use the link you provided.')
	 	}
	 	
		
		
	 },function(){
	 	alert('Sorry, Unable to attach file. You dont have enough privilege to use the link you provided.')
	 })

	

}

function showMoreFilesFromPersonalStorage(e,el,page,storage){
	getStorage(page+1,storage)
	el.remove()

}


function update_basket_description(description,callback=function(e){}){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		description:description,
		token:__config.session.token
	}

	__ajax_basket_update_description(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to update this basket.Please try again later.');

	 		},700);

	 	}else{
	 		callback(e)
	 	}

	 },function(){
	 	alert('Unable to update this basket.Please try again later.');
	 });
}

function update_basket_keywords(keywords,callback=function(e){}){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		keywords:keywords,
		token:__config.session.token
	}

	__ajax_basket_update_keywords(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to update this basket.Please try again later.');

	 		},700);

	 	}else{
	 		callback(e)
	 	}

	 },function(){
	 	alert('Unable to update this basket.Please try again later.');
	 });
}


function reloadDetails(){
	//force reload
	loadDetailsInit('id='+window.sdft.active+'&token='+__config.session.token)
}

function preview (target) {
	var id=($(target).attr('data-resources'))
	var top = window.screen.height - 300;
  top = top > 0 ? top/2 : 0;
            
	var left = window.screen.width - 400;
  left = left > 0 ? left/2 : 0;
	let win = window.open(__config.endpoint.basket.attachments.preview.url+'?id='+id+'&token='+__config.session.token, "_blank", "width=400,height=300" + ",top=" + top + ",left=" + left);
	win.moveTo(left, top);
	win.focus()
}

function download(target){ 
	if(window.sdft.deviceInstance!='mobile'){
		//download for desktop
		download_desktop(target);
	}else{
		//download for mobile
		download_mobile(target);
	}
}


function download_desktop(target){
	var id=($(target).attr('data-resources'))
	window.open(__config.endpoint.basket.attachments.url+'?id='+id+'&token='+__config.session.token);
}

function download_mobile(target){
	var id=($(target).attr('data-resources'))
	var fileTransfer = new FileTransfer();
	var uri=encodeURI(__config.endpoint.basket.attachments.url+'?id='+id+'&token='+__config.session.token);

	var ref = cordova.InAppBrowser.open(uri, '_system', 'location=yes');
	/*var fileTransfer = new FileTransfer();
   var uri = encodeURI(uri);
   var filename = uri.split("/").pop();
   //var fileURL = cordova.file.externalRootDirectory + filename+'.pdf';
     var fileURL='cdvfile://localhost/persistent/'+ id;
     console.log(cordova.file.dataDirectory)

   fileTransfer.download(
      uri, fileURL, function(entry) {

      	

      	entry.file(function(file) {

      		var reader=new FileReader();

	      	reader.onload=function(e){
	      		var fileTypeSubstr=e.target.result.substr(0,50);
	      		if(fileTypeSubstr.toLowerCase().indexOf('pdf')>-1){
	      			window.open(entry.toURL()+'.pdf',"_system","location=yes");
	      		}else{
	      			uri
	      		}
	      	}

	      	reader.readAsText(file)

      	})
      	

        // alert("download complete: " + entry.toURL());
      },
        
      function(error) {
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
        
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );*/

	

}





function split_keywords(keywords){
	var keywordsEl=''
	keywords.split(',').forEach((val,index)=>{
		keywordsEl+=` <span class="badge">${val}</span> `
 	})

 	return keywordsEl
}


export {
	deviceReadyForMobile,
	split_keywords,
	download_mobile,
	download_desktop,
	reloadDetails,
	download,
	update_basket_keywords,
	update_basket_description,
	showMoreFilesFromPersonalStorage,
	uploadFileFromLink,
	uploadFileFromStorage,
	bindStorageSearch,
	bindStorageFileSelection,
	getStorage,
	bindBtnRoute,
	bindEventToAttachmentMenu,
	bindEventToCommentInput,
	uploadAttachment,
	appendColaborators,
	getCategories,
	saveUpdatedNotes,
	notesCancelUpdate,
	updateNotes,
	loadBasketCloseMenu,
	loadBasketDeleteMenu,
	loadBasketForbidden,
	loadBasketOpenMenu,
	loadBasketUpdateMenu,
	loadContent,
	loadNoteTextArea,
	loadPublishButton,
	loadTopMenu,
	loadUnpublishButton,
	clearLoadTopMenu,
	getDetails,
	getCollaborators,
	getActivities,
	getRoutes,
	getNotes,
	bindStorageSelection
}


