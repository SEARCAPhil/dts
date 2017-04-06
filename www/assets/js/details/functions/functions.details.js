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



function getDetails(data,callback){
	

 	 __ajax_details(data,function(e){

 	 	


 	 	var data=JSON.parse(e)
 	 	var attachments=(typeof data.details.attachments!='undefined')?data.details.attachments:[];

 	 	if(data.details.status=="draft"){
 	 		$('.details-menu').html('<div class="col col-md-12 container-fluid"><button type="button" class="btn btn-default pull-right"><i class="material-icons">device_hub</i> Publish</button></div><div class="col col-md-12"><hr/></div>');
 	 	}else{
 	 		$('.details-menu').html('')
 	 	}
 	 	
 	 	//author
 	 	$('.author-name').text(data.details.author.name);
 	 	$('.position').text(data.details.author.position);
 	 	$('.department').text(data.details.author.department);

 	 	

 	 	//description
 	 	$('.description').text(data.details.description);

 	 	//template
 	 	var html=`<div class="col col-md-12"><br/><br/></div>`;

 	 	//attachments

 	 	//no attachments
 	 	if(attachments.length<=0){
 	 		html+='<center class="text-muted"><h3>No Available Data</h3><p>Please make sure that someone uploaded a file for viewing </p></center>';
 	 	}

 	 	for(var x=0;x<attachments.length;x++){

 	 		var type=attachments[x].files.type;
 	 		var category=attachments[x].files.category;
 	 		var file_name=attachments[x].files.name;
 	 		var size=attachments[x].files.size;
 	 		var logo='';

 	 		switch(type){
 	 			case 'doc':
 	 				logo='doc'
 	 				break;
 	 			case 'pdf':
 	 				logo='pdf'
 	 				break;
 	 			default:
 	 			break;
 	 		}
 	 		
	 	 	html+=`<!--attachments-->
						<div class="col col-md-12 attachments">
							<!--media-->
							<div class="media">
							  <div class="media-left">
							    <a href="#">
							      <div class="file-icon file-icon-default" data-type="`+logo+`"></div>
							    </a>
							  </div>
							  <div class="media-body">
							    <p><b>`+attachments[x].author.name+`</b></p>
							    <small>
								    <p>`+attachments[x].author.department+`</p>
									<p>`+attachments[x].author.position+`</p>
								</small>
								<div class="row col-md-12"><span class="tags" onclick="this.style.width=this.style.width!='auto'?'auto':'150px';this.style.height=this.style.height!='auto'?'auto':'25px';">`+category+`</span></div>
								<small><p>2017-01-01 5:00:00</p></small>
								<p>
									<details>
										<summary>More Details</summary>
										<div class="col col-md-12 content-more-details">
											<small>
												<div class="col col-md-2 col-lg-1"><div class="media-circles circle-sm"><img src="`+attachments[x].author.image+`" width="100%;"></div></div>
												<div class="col col-md-8">
													<p><b>Author :</b> `+attachments[x].author.name+`</p>
									    			<p class="text-danger"><b>File Name :</b> `+file_name+` &emsp;<span class="file-icon file-icon-xs" data-type="`+logo+`"></span></p>
									    			<p><b>File Type :</b> <b>`+type+`</b></p>
									    			<p><b>Size :</b> <b>`+size+`</b></p>
												</div>
									    		
									    	</small>
										</div>	
									</details>
								</p>
							  </div>
							</div>

						</div>
					<!--/attachments-->`;
		}

 	 	//load view
 	 	$('.home-content').html(html);

 	 	callback(e)
 	 	
 	 },function(e){
 	 	//hide content and show error
 	 	$('#main-page').html('<center style="margin-top:30%;" class="text-muted"><h3	>No Available Data</h3><p>Please make sure the data you are viewing is available and not broken</p></center>')
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
	 	 			<h3><i class="material-icons" style="font-size:48px;">phonelink</i> </h3>	 	 			
	 	 			<h3	>No Collaborator yet?</h3><p>Start adding collaborators for easier and smooth file sharing.</p>
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
				<div class="col col-md-12 activities" style="margin-bottom: 20px;">
					<small>
						<div class="col col-md-2 col-lg-1"><div class="media-circles circle-md"><img src="assets/images/user.png" width="100%;"></div></div>
						<div class="col col-md-8">
							<p><b>John Kenneth G. Abella</b></p>
							<p class="text-danger">Created this basket</p>
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

