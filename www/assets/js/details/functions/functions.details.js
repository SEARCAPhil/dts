/*require _ajax.details.js*/

function deviceReadyForMobile(){
	//save to window
	window.sdft.deviceInstance='mobile';

}


 	
function loadContent(id,callback){

	setTimeout(function(){
		$('#home').html('<div class="home-content"></div><div class="group-content"></div>');
		callback(this)
	},300)
}



function getDetails(id,data,callback){
	

 	 __ajax_details({data:data},function(e){

 	 	


 	 	var data=JSON.parse(e)
 	 	var attachments=(typeof data.attachments!='undefined')?data.attachments:[];

 	 	console.log(data)
 	 	
 	 	//author
 	 	$('.author-name').text(data.author.profile_name);
 	 	$('.position').text(data.author.position);
 	 	$('.department').text(data.author.department);

 	 	

 	 	//description
 	 	$('.description').text(data.description);

 	 	//template
 	 	var html=`<div class="col col-md-12"><br/><br/></div>`;

 	 	//attachments

 	 	//no attachments
 	 	if(attachments.length<=0){
 	 		html+='<center class="text-muted"><h3>No Available Data</h3><p>Please make sure that someone uploaded a file for viewing </p></center>';
 	 	}

 	 	for(var x=0;x<attachments.length;x++){

 	 		var type=data.attachments[0].files.type;
 	 		var category=data.attachments[0].files.category;
 	 		var file_name=data.attachments[0].files.name;
 	 		var size=data.attachments[0].files.size;
 	 		var logo='';

 	 		switch(type){
 	 			case 'doc':
 	 				logo='doc'
 	 				break;
 	 			case 'pdf':
 	 				logo='pdf'
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
							    <p><b>`+data.attachments[0].author.profile_name+`</b></p>
							    <small>
								    <p>`+data.attachments[0].author.department+`</p>
									<p>`+data.attachments[0].author.position+`</p>
								</small>
								<div class="row col-md-12"><span class="tags">`+category+`</span></div>
								<small><p>2017-01-01 5:00:00</p></small>
								<p>
									<details>
										<summary>More Details</summary>
										<div class="col col-md-12 content-more-details">
											<small>
												<div class="col col-md-2 col-lg-1"><div class="media-circles circle-sm"><img src="`+data.attachments[0].author.image+`" width="100%;"></div></div>
												<div class="col col-md-8">
													<p><b>`+data.attachments[0].author.profile_name+`</b></p>
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




function getGroups(id,data,callback){
 	 __ajax_groups({data:data},function(e){
 	 	var data=JSON.parse(e)

 	 	var htm=`<div class="col col-md-12 row" style="margin-bottom: 20px;">
					<br/><br/>
					<p class="content-header"><i class="material-icons">domain</i> Units</p>
				</div>`

 	 	
 	 	for(var x=0;x<data.groups.length;x++){

 	 		htm+=`<!--attachments-->
						<div class="col col-md-12 units" style="margin-bottom: 20px;">
							<div class="media">
							  <div class="media-left">
							    <a href="#">
							      	<i class="material-icons" style="font-size: 30px;">people_outline</i>
							    </a>
							  </div>
							  <div class="media-body">
							    <p><b>`+data.groups[x].alias+`</b></p>
							    <small>
							    	<p>`+data.groups[x].display_name+`</p>
							    </small>
								<div class="row col-md-12"><span class="tags">`+data.groups[x].status+`</span></div>
							  </div>
							</div>
						</div>
					<!--/attachments-->
			`;
 	 	}

 	 	//load view
 	 	$('.group-content').html(htm);
 	 	
 	 },function(e){

 	 });
 }

