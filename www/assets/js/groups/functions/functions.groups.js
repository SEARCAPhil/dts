
function get_groups(callback=function(){}){

	
	__ajax_groups('',function(e){
		//success
		var data=JSON.parse(e);

		var groups=(typeof data.groups !='undefined')?data.groups:[];
		var html='';
		for(var x=0;x<groups.length;x++){

			var author=(typeof groups[x].author!='undefined')?groups[x].author:[];
			var is_public=(typeof groups[x].is_public!='undefined')?groups[x].is_public:[];

			var select=`<select data-current=`+is_public+`><option>YES (Current) </option><option>YES</option><option>NO</option></select> <button type="button" class="btn btn-default">Save</button>`;

			html+=`<div class="col col-md-12 groups">
						<h3>`+groups[x].name+`</h3>
						<p>`+groups[x].description+`</p>
						<br/>
						<p><b>Alias :</b> `+groups[x].alias+`</p>`

					//change accessibility
					if(author.id==1){
						html+=`	<p><b>Accessible to other units :`+select+`</b></p>`	
					}else{
						html+=`	<p><b>Accessible to other units :`+is_public+`</b></p>`
					} 
					


				html+=`		<details>
							<summary>Members <span class="label label-default">`+groups[x].members.count+`</span></summary><br/>

							<!--contacts-->
							<div class="col col-md-12 groups phone-book group-members">
								<div class="col col-md-1"><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></div>
								<div class="col col-md-10">
									<small style="line-height: 10px;">
										<p><b>John Kenneth G. Abella</b></p>
										<p class="text-muted">Information Technology Services Unit</p>
										<p class="text-muted">MIS Assistant</p>
									</small>
								</div>
							</div>
							<!--contacts-->


							<!--contacts-->
							<div class="col col-md-12 groups phone-book group-members">
								<div class="col col-md-1"><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></div>
								<div class="col col-md-10">
									<small style="line-height: 10px;">
										<p><b>John Kenneth G. Abella</b></p>
										<p class="text-muted">Information Technology Services Unit</p>
										<p class="text-muted">MIS Assistant</p>
									</small>
								</div>
							</div>
							<!--contacts-->


							<!--contacts-->
							<div class="col col-md-12 groups phone-book group-members">
								<div class="col col-md-1"><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></div>
								<div class="col col-md-10">
									<small style="line-height: 10px;">
										<p><b>John Kenneth G. Abella</b></p>
										<p class="text-muted">Information Technology Services Unit</p>
										<p class="text-muted">MIS Assistant</p>
									</small>
								</div>
							</div>
							<!--contacts-->
						</details>
					</div>
					`
		}

		$('.group-list').html(html)
		callback(e)

	},function(){
		//failed
	})

}



function get_contacts(callback=function(){}){

	__ajax_contacts('',function(e){
		//success
		var data=JSON.parse(e);

		var contacts=(typeof data.contacts !='undefined')?data.contacts:[];
		var html=``;
		for(let value in contacts){

			html+=`	<div class="col col-md-12 text-muted">
						<h3>`+value+`</h3>
						<div class="col col-md-12 row">`
				for(var x=0; x<contacts[value].length;x++){
					html+=`


								<!--contacts-->
								<div class="col col-md-12 groups phone-book">
									<div class="col col-md-1"><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></div>
									<div class="col col-md-10">
										<small style="line-height: 10px;">
											<span class="more-options"><i class="material-icons">more_vert</i></span>
											<p><b>John Kenneth G. Abella</b></p>
											<p class="text-muted">Information Technology Services Unit</p>
											<p class="text-muted">MIS Assistant</p>
										</small>
									</div>
								</div>
								<!--contacts-->	`;
				}

			html+=`</div></div>`;
			
		}

		$('.container-contacts').html(html)
		callback(e)


	},function(){
		//failed
	})
}

