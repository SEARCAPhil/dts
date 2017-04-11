
function get_groups(callback=function(){}){

	
	__ajax_groups('',function(e){
		//success
		var data=JSON.parse(e);
		console.log(data.groups)
		var groups=(typeof data.groups !='undefined')?data.groups:[];
		var html='';

		//groups
		for(var x=0;x<groups.length;x++){

			var author=(typeof groups[x].author!='undefined')?groups[x].author:[];
			var is_public=(typeof groups[x].is_public!='undefined')?groups[x].is_public:[];

			var select=`<select data-current=`+is_public+`><option>YES (Current) </option><option>YES</option><option>NO</option></select> <button type="button" class="btn btn-default">Save</button>`;

			html+=`<div class="col col-md-12 groups">
						<h3>`+groups[x].name.charAt(0).toUpperCase()+''+groups[x].name.substr(1)+`</h3>
						<p>`+groups[x].description+`</p>
						<br/>
						<p><b>Alias :</b> `+groups[x].alias+`</p>`

					//change accessibility
					
					html+=`	<p><b>Accessible to other units :`+select+`</b></p>`	
					
					


					html+=`<details><summary>Members <span class="label label-default">`+groups[x].total+`</span></summary><br/>`

					//members

					for(var y=0;y<groups[x].members.length;y++){

							html+=`

										<!--contacts-->
										<div class="col col-md-12 groups phone-book group-members">
											<div class="col col-md-1"><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></div>
											<div class="col col-md-10">
												<small style="line-height: 10px;">
													<p><b>`+groups[x].members[y].name+`</b></p>
													<p class="text-muted">`+groups[x].members[y].department+`</p>
													<p class="text-muted">`+groups[x].members[y].position+`</p>
													<p><button class="btn btn-danger btn-xs"><i class="material-icons">remove</i> remove</button></p>
												</small>
											</div>
										</div>
										<!--contacts-->
								`
					}

					html+=`</details></div>`


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
											<div class="dropdown pull-right more-options">
											    <a href="#" data-toggle="dropdown" class="dropdown-toggle"><span><i class="material-icons">more_vert</i></span></a>
											    <ul class="dropdown-menu">
											        <li><a href="#">Action</a></li>
											        <li><a href="#">Another action</a></li>
											    </ul>
											</div>
											<p><b>`+contacts[value][x].name+`</b></p>
											<p class="text-muted">`+contacts[value][x].department+`</p>
											<p class="text-muted">`+contacts[value][x].position+`</p>
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

