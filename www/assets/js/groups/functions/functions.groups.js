function show_more_groups(e){
	if(window.sessionStorage.getItem('group_page')==null){
		var nextPage=1
		window.sessionStorage.setItem('group_page',1)	
	}else{
		var nextPage=parseInt(window.sessionStorage.getItem('group_page'))+1;
		window.sessionStorage.setItem('group_page',nextPage);
	}

	console.log(this)
	$(e).html('loading . . .')
	get_groups('page='+nextPage,function(){
		$(e).parent().children(e).remove();
	})

}


function show_more_groups_modal(e){
	if(window.sessionStorage.getItem('group_page')==null){
		var nextPage=1
		window.sessionStorage.setItem('group_page',1)	
	}else{
		var nextPage=parseInt(window.sessionStorage.getItem('group_page'))+1;
		window.sessionStorage.setItem('group_page',nextPage);
	}

	console.log(this)
	$(e).html('loading . . .')
	get_groups_modal('page='+nextPage,function(){
		$(e).parent().children(e).remove();
	})

}


function show_more_group_members(e){
	var html='';
	var page=($(e).attr('data-page')==undefined)?2:parseInt($(e).attr('data-page'))+1;


	//loading
	$(e).html('loading. . .')
	$(e).attr('onclick',null).off('click')


	__ajax_group_members('page='+page,function(json){

		var data=JSON.parse(json);
		var members=(typeof data.members !='undefined')?data.members:[];

		//members
		for(var y=0;y<members.length;y++){
				html+=`

							<!--contacts-->
							<div class="col col-md-12 groups phone-book group-members">
								<div class="col col-md-1"><div class="media-circles circle-sm"><img src="assets/images/user.png" width="100%;"></div></div>
								<div class="col col-md-10">
									<small style="line-height: 10px;">
										<p><b>`+members[y].name+`</b></p>
										<p class="text-muted">`+members[y].department+`</p>
										<p class="text-muted">`+members[y].position+`</p>
										<p><button class="btn btn-danger btn-xs"><i class="material-icons">remove</i> remove</button></p>
									</small>
								</div>
							</div>
							<!--contacts-->
					`
		}

		//show more group members
		if(members.length>0)	html+=`<div class="text-center text-muted" onclick="show_more_group_members(this)" data-page="`+page+`">Show more</div>`;

		$(e).replaceWith(html)
	},function(){
		//failed
	})
}

function get_groups(data='',callback=function(){}){

	
	__ajax_groups(data,function(e){
		//success
		var data=JSON.parse(e);
		var groups=(typeof data.groups !='undefined')?data.groups:[];

		//show groups
		show_groups(groups,'.group-list',callback);

	},function(){
		//failed
	})

}


function get_groups_modal(data='',callback=function(){}){

	
	__ajax_groups(data,function(e){
		//success
		var data=JSON.parse(e);
		var groups=(typeof data.groups !='undefined')?data.groups:[];

		//show groups
		show_groups_modal(groups,'.modal-groups',callback);

	},function(){
		//failed
	})

}




function show_groups(groups,target,callback=function(){}){
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

				//show more group members
				if(groups[x].members.length>0)	html+=`<div class="text-center text-muted" onclick="show_more_group_members(this)">Show more</div>`;

				html+=`</details></div>`

	}




		//show more
		html+=`<div class="col col-md-12"><p class="text-muted text-center" onclick="show_more_groups(this)">Show more</p></div>`;


		//append to target
		if(groups.length>0) $(target).append(html)
		//callback	
		callback(this)

}



function show_groups_modal(groups,target,callback=function(){}){
	var html='';
	var id=$(window.modal.recentlySelected).attr('data-member-id');
	//show groups
	for(var x=0;x<groups.length;x++){
		html+=`<div class="col col-md-12">
      		<div class="form-group">
              <div class="checkbox">
                <label>
                  <input type="checkbox" onchange="delegate_group_member(`+groups[x].id+`,`+id+`)"><span class="checkbox-material"><span class="check"></span></span> `+groups[x].name.charAt(0).toUpperCase()+''+groups[x].name.substr(1)+`
                </label>
              </div>
            </div> 
      		<p>`+groups[x].description+`</p>
      	</div>
		`;
	}

	//show more
	html+=`<div class="col col-md-12"><p class="text-muted text-center" onclick="show_more_groups_modal(this)">Show more</p></div>`;

	//append to target
	if(groups.length>0) $(target).append(html)
	//callback	
	callback(this)

}


function delegate_group_member(group_id,member_id){
	
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
											        <li><a href="group_list.html" data-member-id="`+contacts[value][x].id+`" data-role="none" data-toggle="modal" data-target="#myModal" onclick="modal_ajax(event,this)">Add to groups</a></li>
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

