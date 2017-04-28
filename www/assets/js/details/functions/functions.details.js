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
	var update_button='<li><button class="btn btn-xs btn-default" title="update"><i class="material-icons">update</i></button></li>';

	if(status=='draft'){
		publish_button=`<li><button class="btn btn-xs btn-default" title="publish"><i class="material-icons">device_hub</i></button></li>`
		$('.details-menu').html('<div class="col col-md-12 container-fluid"><button type="button" class="btn btn-default pull-right"><i class="material-icons">device_hub</i> Publish</button></div><div class="col col-md-12"><hr/></div>');
 
	}else{
		$('.details-menu').html('')
	}

	if(status=='draft'||status=='open'){


 	 	//menu for xs devices
 	 	$('.top-menu-section-xs').html(`<input type="file" name="files[]" class="content-menu-attachment-input" multiple/><ul class="nav navbar-nav navbar-right pull-right top-menu">
	        <li><button class="btn btn-xs btn-default content-menu-attachment"><i class="material-icons">attachment</i> attach</button></li>
	        <li><button class="btn btn-xs btn-default" data-toggle="modal" data-target="#myModal"><i class="material-icons">folder_shared</i> Share</button></li>
	        `+publish_button+` `+update_button+`
	  	 </ul>`)


 	 	//menu for md - lg devices
 	 	$('.top-menu-section-md').html(`<ul class="nav navbar-nav navbar-right pull-right top-menu">
	        <li><button class="btn btn-xs btn-default content-menu-attachment"><i class="material-icons">attachment</i> attach</button></li>
	        <li><button class="btn btn-xs btn-default" data-toggle="modal" data-target="#myModal"><a href="share.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" style="color:rgba(250,250,250,0.5);"><i class="material-icons">folder_shared</i> Share</a></button></li>
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

function bindEventToAttachmentMenu(){
	$('.content-menu-attachment').click(function(){
		$('.content-menu-attachment-input').click();
	})
}



function getDetails(data,callback){
	

 	 __ajax_details(data,function(e){

 	 	
 	 	try{

 	 		var data=JSON.parse(e)
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

 	 	
 	 	
 	 	//author
 	 	$('.author-name').text(data.details.author.name);
 	 	$('.position').text(data.details.author.position);
 	 	$('.department').text(data.details.author.department);

 	 	

 	 	//description
 	 	$('.description').text(data.details.description);





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
						<div class="col col-md-12 attachments">
							<div class="attachments-menu-section dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
									<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
								</a>
								<ul class="list-unstyled dropdown-menu pull-right">
									<li data-resources="`+attachments[x].files.id+`" onclick="download(this)">
										<a href="#"><i class="material-icons" style="font-size:18px;">file_download</i> <span>Download</span></a>
									</li>
									<li data-resources="`+attachments[x].files.id+`" data-toggle="modal" data-target="#myModal">
										<a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+attachments[x].files.id+`">
											<i class="material-icons">remove_circle</i> <span>Remove</span>
										</a>
									</li>
									<li data-resources="`+attachments[x].files.id+`">
										<a href="#"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
									</li>
									<li data-resources="`+attachments[x].files.id+`">
										<a href="#"><i class="material-icons" style="font-size:18px;">lock_open</i><span>Close</span>
									</li>
								</ul>
							</div>
							<!--media-->
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
									<p>`+attachments[x].author.position+`</p>
								</small>
								<div class="row col-md-12"><span class="tags `+categoryTagClass+`" onclick="this.style.width=this.style.width!='auto'?'auto':'150px';this.style.height=this.style.height!='auto'?'auto':'25px';">`+category+`</span></div>
								<small><p>2017-01-01 5:00:00</p></small>
								<p>
									<details>
										<summary>More Details</summary>
										<div class="col col-md-12 row content-more-details">
											<small>
												<div class="col col-md-2 col-xs-2 col-lg-1"><div class="media-circles circle-md"><img src="`+attachments[x].author.image+`" width="100%;"></div></div>
												<div class="col col-md-8 col-xs-10">
													<p><b>Author :</b> `+attachments[x].author.name+`</p>
									    			<p class="text-danger"><b>File Name :</b> `+file_name+` &emsp;<span class="file-icon file-icon-xs" data-type="`+type+`"></span></p>
									    			<p><b>File Type :</b> <b>`+type+`</b></p>
									    			<p><b>Size :</b> <b>`+size+`</b></p>
												</div>
									    		
									    	</small>

										</div>	
									</details>
								</p>
							  </div>
							</div>


								<button class="btn btn-block btn-default visible-xs" data-resources="`+attachments[x].files.id+`" onclick="download(this)">
									<i class="material-icons">file_download</i>Download
								</button>

								<button class="btn btn-default hidden-xs" data-resources="`+attachments[x].files.id+`" onclick="download(this)">
									<i class="material-icons">file_download</i>Download
								</button>
	

						</div>
					<!--/attachments-->`;
		}

		html+='</div>';
 	 	//load view
 	 	$('.home-content').html(html);

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
				</div><div class="row"><div class="container-fluid">`
		

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
				<div class="content-more-details collaborators">
					<span style="position:absolute;right:5px;width:10px;height:10px;">x</span>
					<small>
						<span><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></span>
						<span style="font-size:smaller;"> &nbsp;<b>`+data.collaborators[x].name+`</b></span>
						<p class="text-muted" style="font-size:smaller;"> &nbsp;`+data.collaborators[x].department+`</p>
					</small>
					<div class="ajax-span-container">
						<small>
							<div class="checkbox">
				                <label>
				                  <input type="checkbox" `+checked+`><span class="checkbox-material"><span class="check"></span></span> Read-only
				                </label>
				              </div> 
				             </small>
					</div>
					
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
							<p>2017-01-01 5:00:00</p>
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

			var fullName=__config.session.fullName.length<=0?__config.session.firstName+' '+__config.session.firstName:__config.session.fullName

 
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
									<p>`+__config.session.position+`</p>
								</small>
								<div class="row col-md-12"><span class="tags" style="background:rgb(200,200,200);height:auto;" onclick="this.style.width=this.style.width!='auto'?'auto':'150px';this.style.height=this.style.height!='auto'?'auto':'25px';">Select Category <i class="material-icons md-18 md-dark inactive">add</i></span></div>
								
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
									<!--<div class="form-group form-input-group">
										<div class="col col-md-8 parent-category-selector-section">
											<div class="subcategory-section subcategory-section-preselected"></div>
										</div>	
									</div>
									

									<button class="btn btn-default btn-xs"><i class="material-icons md-18 md-dark inactive">save</i> Save</button>	-->	

							  </div>
							</div>

						</div>`)
			//removed old
			$('.'+parent).remove();


 	 		getCategories(59,function(e){
 	 			var data=JSON.parse(e)
				var categories=(typeof data.categories!='undefined')?data.categories:[];

				var htm=``;

				for(var x=0; x<categories.length;x++){
					htm+='<option value="'+categories[x].id+'" class="subcategory">'+categories[x].name+'</option>'
				}

				//empty result
				if(categories.length<=0) return 0;

				$('.subcategory-section-preselected').html(`<div><select class="form-control parent-category-selector">`+htm+`</select><div class="subcategory-section"><div></div>`);
				attachEventToCategorySelector()

 	 		});

		}




	})

	xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) {
            var data=JSON.parse(xhr.responseText);
            var htm=`<a href="#" class="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
									<i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
								</a>
								<ul class="list-unstyled dropdown-menu pull-right">
									<li data-resources="`+data.id+`" onclick="download(this)">
										<a href="#"><i class="material-icons" style="font-size:18px;">file_download</i> <span>Download</span></a>
									</li>
									<li data-resources="`+data.id+`" data-toggle="modal" data-target="#myModal">
										<a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+data.id+`">
											<i class="material-icons">remove_circle</i> <span>Remove</span>
										</a>
									</li>
									<li data-resources="`+data.id+`">
										<a href="#"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
									</li>
									<li data-resources="`+data.id+`">
										<a href="#"><i class="material-icons" style="font-size:18px;">lock_open</i><span>Close</span>
									</li>
								</ul>`
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

function download(target){
	var id=($(target).attr('data-resources'))
	window.open(__config.endpoint.basket.attachments.url+'?id='+id+'&token='+__config.session.token);
}

