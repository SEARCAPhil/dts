/*require _ajax.details.js*/

function deviceReadyForMobile(){
	//save to window
	window.sdft.deviceInstance='mobile';

}


 	
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
 	 	$('.top-menu-section-xs').html(`<input type="file" name="files[]" class="content-menu-attachment-input" multiple/><ul class="nav navbar-nav navbar-right pull-right top-menu">
	        <li><button class="btn btn-xs btn-default content-menu-attachment"><i class="material-icons">attachment</i> attach</button></li>
	        <li><button class="btn btn-xs btn-default" data-toggle="modal" data-target="#myModal" href="share.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" ><a style="color:rgba(250,250,250,0.5);"><i class="material-icons">folder_shared</i> Share</a></button></li>
	        `+publish_button+` `+update_button+`
	  	 </ul>`)


 	 	//menu for md - lg devices
 	 	$('.top-menu-section-md').html(`<ul class="nav navbar-nav navbar-right pull-right top-menu">
	        <li><button class="btn btn-xs btn-default content-menu-attachment"><i class="material-icons">attachment</i> attach</button></li>
	        <li><button class="btn btn-xs btn-default" data-toggle="modal" href="share.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)"><a style="color:rgba(250,250,250,0.5);"><i class="material-icons">folder_shared</i> Share</a></button></li>
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
			<p> <button class="btn btn-default" data-toggle="modal" data-target="#myModal"><a href="update_basket_status_open.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">Open</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function loadBasketCloseMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Close</h3>
		<div>
			<p><i class="material-icons">info</i> Changing the status of the basket accordingly allow/prevent users to do any unappropriate action. </p>
			<p> <button class="btn btn-default" data-toggle="modal" data-target="#myModal"><a href="update_basket_status_close.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">Close</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}


function loadBasketDeleteMenu(id,target,callback=function(e){}){
	$(target).html(`<h3 class="text-danger">Delete</h3>
		    	<div class="alert alert-danger">
			    	<p><i class="material-icons">info</i> This section allows you to remove the basket and its content including logs and other related activities.Please proceed with caution.</p>
			    	<p> <button class="btn btn-danger" data-toggle="modal" data-target="#myModal"><span href="trash.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">Remove</span></button> </p>
			   </div>`)
	callback(target);
}

function loadBasketUpdateMenu(id,target,callback=function(e){}){
	$(target).html(`
		<h3>Update</h3>
		<div>
			
			<p class="text-muted"><i class="material-icons">shopping_basket</i> Update description of this basket.</p>
			<p> <button class="btn btn-default" data-toggle="modal" data-target="#myModal"><a href="update_basket_description.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">Update</a></button> </p>
		</div><hr/><br/>`)
	callback(target);
}

function bindEventToAttachmentMenu(){
	$('.content-menu-attachment').click(function(){
		$('.content-menu-attachment-input').click();
	})
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
		}else if(data.details.status=='closed'){
			loadBasketOpenMenu(data.details.id,'.basket_status_menu',function(e){})
		}else{

		}

		//publish menu
		if(data.details.status=='draft'){
			loadPublishButton(data.details.id,'.details-menu');
			loadBasketUpdateMenu(data.details.id,'.basket_update_menu',function(e){})
		}

		//delete menu
		loadBasketDeleteMenu(data.details.id,'.basket_delete_menu',function(e){})

 	 	
 	 	
 	 	//author
 	 	$('.author-name').text(data.details.author.name);
 	 	$('.position').text(data.details.author.position);
 	 	$('.department').text(data.details.author.department);

 	 	

 	 	//description
 	 	var description=data.details.description;
 	 	if(description.length>200) description=description.substr(0,100)+' <a href="#">read more</a>';
 	 	$('.description').html(description);





 	 	//template
 	 	var html=`<div class="col col-md-12 upload-section row" style="margin-bottom:30px;padding-top:20px;"></div><div class="col col-md-12 attachment-section row">`;

 	 	//attachments

 	 	//no attachments
 	 	if(attachments.length<=0){
 	 		html+='<center class="text-muted no-available-data"><h3><i class="material-icons" style="font-size:48px;">phonelink_off</i> </h3><h3>No Available Data</h3><p>Please make sure that someone uploaded a file for viewing </p></center>';
 	 	}

 	 	for(var x=0;x<attachments.length;x++){

 	 		var type=attachments[x].files.type;
 	 		var category=attachments[x].files.category==null?'Uncategorized':attachments[x].files.category;
 	 		var file_name=attachments[x].files.name;
 	 		var size=attachments[x].files.size;
 	 		var categoryTagClass=''
 	 		if(category=='Uncategorized'){
 	 			categoryTagClass='default';
 	 		}
 	 		
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


									if(attachments[x].files.status=='open'){
										html+=`
											<li data-resources="`+attachments[x].files.id+`" data-toggle="modal" data-target="#myModal">
												<a href="update_attachment_status.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">lock</i><span>Close Attachment</span>
											</li>
											`
									}else{
										html+=`
											<li data-resources="`+attachments[x].files.id+`" data-toggle="modal" data-target="#myModal">
										 		<a href="update_attachment_status_open.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`" data-category="`+category+`">
										 			<i class="material-icons" style="font-size:18px;">lock_open</i><span>Open Attachment</span>
												</a>
											</li>
								 		`;
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
							    <p><b>`+attachments[x].author.name+`</b></p>
							    <small>
								    <p>`+attachments[x].author.department+`</p>
									<p>`+attachments[x].author.position+` `

									if(attachments[x].files.status=='closed'){
										html+=`<span class="data-attachment-status" data-resources="`+attachments[x].files.id+`"><i class="material-icons text-muted visible-closed" style="font-size:18px;">lock</i></span>`;
									}else{
										html+=`<span class="data-attachment-status" data-resources="`+attachments[x].files.id+`"></span>`;	
									}

									html+=
									`</p>
								</small>
								<div class="row col-md-12">
									<span class="tags `+categoryTagClass+`"  data-resources="`+attachments[x].files.id+`" onclick="this.style.width=this.style.width!='auto'?'auto':'150px';this.style.height=this.style.height!='auto'?'auto':'32px';download(this);">

											<span><i class="material-icons" style="font-size:18px;">file_download</i></span>
									
									<span class="category" data-resources="`+attachments[x].files.id+`">`+category+`</span>
									</span>
								</div>
								<small><p>`+attachments[x].files.date_modified+`</p></small>
								<div class="row col-md-12">
									<details>
										<summary>File Info</summary>
										<div class="col col-md-12 row content-more-details">
											<small>
												<!--<div class="col col-md-2 col-xs-2 col-lg-1"><div class="media-circles circle-md"><img src="`+attachments[x].author.image+`" width="100%;"></div></div>-->
												<div class="col col-md-8 col-xs-10">
									    			<p class="text-danger">`+file_name+` &emsp;<span class="file-icon file-icon-xs" data-type="`+type+`"></span></p>
									    			<p><b>File Type :</b> <b>`+type+`</b></p>
									    			<p><b>Size :</b> <b>`+size+`</b></p>
												</div>
									    		
									    	</small>

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

 	 	//show more section
 	 	try{
	 	 	if(parseInt(window.getComputedStyle($('.attachment-section')[0]).getPropertyValue('height'))>=690){
	 	 			$('.expand-attachments-section').show();	
	 	 	}
	 	 }catch(e){}

 	 	callback(e)
 	 	
 	 },function(e){
 	 	//hide content and show error
 	 	$('.main-page-content').html('<center style="margin-top:30%;" class="text-muted no-available-data"><h3><i class="material-icons" style="font-size:48px;">phonelink_off</i> </h3><h3>No Available Data</h3><p>Please make sure the data you are viewing is available and not broken</p></center>')
 	 });



}




function getCollaborators(data,callback){
 	 __ajax_collaborators(data,function(e){
 	 	var data=JSON.parse(e)

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
						<span><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></span>
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
						<div class="col col-md-2 col-lg-1 col-xs-4"><div class="media-circles circle-md"><img src="assets/images/user.png" width="100%;"></div></div>
						<div class="col col-md-8 col-xs-8">
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

function appendColaborators(data,target){
	var htm=`<!--details-->
				<div class="content-more-details collaborators">
					<span style="position:absolute;right:5px;width:10px;height:10px;">x</span>
					<small>
						<span><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></span>
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
							    <p><b>`+fullName+`</b></p>
							    <small>
								    <p></p>
									<p>`+__config.session.position+`<i class="material-icons text-muted visible-closed" style="font-size: 18px; display: none;">lock</i></p>
								</small>
								<div class="row col-md-12">
									<span class="tags tags-`+parent+`" style="background:rgb(200,200,200);height:auto;" onclick="this.style.width=this.style.width!='auto'?'auto':'150px';this.style.height=this.style.height!='auto'?'auto':'25px';download(this);">
								
								 		<span><i class="material-icons" style="font-size:18px;">file_download</i></span>
								 		<span class="category tags-`+parent+`" >Uncategorized</span>
								 	</span>
								 </div>
								
								<div class="col col-md-12 row">
									<br/>	
									<details>
										<summary>More Details</summary>
										<div class="col col-md-12 content-more-details">
											<small>
												<div class="col col-md-2 col-lg-1"><div class="media-circles circle-sm"><img src="http://192.168.80.53/SDFT_CORDOVA_APP/www/assets/images/user.png" width="100%;"></div></div>
												<div class="col col-md-8">
													<p><b>Author :</b> `+fullName+`</p>
									    			<p class="text-danger"><b>File Name :</b>`+fileName+` <span class="file-icon file-icon-xs" data-type="`+fileType+`"></span></p>
									    			<p><b>File Type :</b> <b>`+file.type+`</b></p>
									    			<p><b>Size :</b> <b>`+size+`</b></p>
												</div>
									    		
									    	</small>
										</div>	
									</details>
								</div>
							  </div>
							</div>

						</div>`)
			//removed old
			$('.'+parent).remove();


 	 		
		}




	})

	xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) {
            var data=JSON.parse(xhr.responseText);
            var category=data.category==null?'Uncategorized':data.category;
            var htm=`<a href="#" class="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
									<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
								</a>
								<ul class="list-unstyled dropdown-menu pull-right">
									<li data-resources="`+data.id+`" data-toggle="modal" data-target="#myModal" class="visible-open">
										<a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+data.id+`">
											<i class="material-icons">remove_circle</i> <span>Remove</span>
										</a>
									</li>
									<li data-resources="`+data.id+`" class="visible-open" data-toggle="modal" data-target="#myModal">
										<a href="attachment_category.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+data.id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
									</li>
									<li data-resources="`+data.id+`" data-toggle="modal" data-target="#myModal">
										<a href="update_attachment_status.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+data.id+`"><i class="material-icons" style="font-size:18px;">lock</i><span>Close Attachment</span>
									</li>
								</ul>`

			$('.tags-'+parent).attr('data-resources',data.id)
			//append to menu section
			$('#attachment-menu-'+parent).html(htm);

			//removed no data content
			$('.no-available-data').hide();
        }
    };

	xhr.open(__config.endpoint.basket.attachments.post.method, __config.endpoint.basket.attachments.post.url, true );
	xhr.send(formData);

}

function remove_attachment(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		token:__config.session.token
	}
	 __ajax_attachments_delete(data,function(e){
	 	var result=JSON.parse(e);
	 	$(window.modal.recentlySelected).parent().parent().parent().parent().slideUp();
	 	$('#myModal').modal('hide');

	 	if(result.id<=0){
	 		setTimeout(function(){ 
	 			$(window.modal.recentlySelected).parent().parent().parent().parent().slideDown(); 

	 		},700);
	 	}

	 },function(){

	 });

	
}

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
	 		loadBasketOpenMenu(id,'.basket_status_menu',function(e){})

	 		//add lock logo in the list
	 		$('.list[data-list="'+id+'"]').addClass('closed');


	 		//force reload
			loadDetailsInit('id='+window.sdft.active+'&token='+__config.session.token)


	 	}

	 },function(){

	 });

	
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


function delete_basket(status){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		token:__config.session.token
	}
	 __ajax_basket_delete(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to delete this item.Please try again later.');

	 		},700);

	 	}else{
	 		//add lock logo in the list
	 		$('.list[data-list="'+id+'"]').fadeOut();

	 		//clear main page-content
	 		$('.main-page-content').html(' <center><i class="material-icons" style="font-size:68px;">delete_sweep</i><h4 class="text-muted">Deleted Successfully</h4></center> ')

	 		


	 		//next
	 		//$('.list')[1].click();

	 	}

	 },function(){

	 });

	
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



function change_attachment_category(e){

	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		category:window.selectedCategory,
		token:__config.session.token
	}

	

	console.log($('.parent-category-selector')[1].options.selectedIndex)

	//filter selected category text
	//[0] is hidden -default for RFP etc..
	////if($('.parent-category-selector')[1].options.selectedIndex==0) return 0;

	//show loading
	$.mobile.loading('show'); 

	 __ajax_attachments_category_update(data,function(e){
	 	var result=JSON.parse(e);
	 	
	 	$('#myModal').modal('hide');

	 	if(result.status!=200){
	 		setTimeout(function(){ 
	 			 
	 			alert('Unable to update category.Please try again later.');

	 		},700);

	 	}else{
	 		
	 		$('.category[data-resources="'+data.id+'"]').html(result.category)

	 	}


	 },function(){

	 });

}


function saveCollaborators(){
	var data={
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
		 		},800)


		 	}
	 },function(){
	 	alert('Unable to save the data.Please try again later.');
	 })	
}

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

function reloadDetails(){
	//force reload
	loadDetailsInit('id='+window.sdft.active+'&token='+__config.session.token)
}


function download(target){
	var id=($(target).attr('data-resources'))
	window.open(__config.endpoint.basket.attachments.url+'?id='+id+'&token='+__config.session.token);
}

