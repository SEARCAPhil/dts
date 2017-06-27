/*config*/
var __config={}

//-----------------------------------------
// Debug
// Set to true to output log into console
//------------------------------------------
__config.debug=true;



//----------------------------------
//console
//---------------------------------
__config.console={}

__config.console.message=`
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\\\\\\\\\ 								SEARCA SUPPORTING DOCUMENTS FOR FINNANCIAL TRANSACTION 												\\\\\\\\\\
\\\\\\\\\\       						        																							\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\\\\\\\\\You are trying to view the source code in the console. Modifying codes are prohibited and you will be liable to any changes you   \\\\\\\\\\\\\\ 
\\\\\\\\\\made . Please contact our legal team																								\\\\\\\\\\\\\\ 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
`

//-------------------------
// Session
//-------------------------
__config.session={}
__config.session.token=window.localStorage.getItem('token');
__config.session.fullName=window.localStorage.getItem('cached_full_name');
__config.session.firstName=window.localStorage.getItem('cached_first_name');
__config.session.lastName=window.localStorage.getItem('cached_last_name');
__config.session.position=window.localStorage.getItem('cached_position');




//------------------------
// Enpoint
//------------------------
__config.endpoint={}


//------------------------
// Authentication 
//------------------------
__config.endpoint.auth={
	url:'http://192.168.80.53/rfps/auth/',
	method:'POST'
}

//-------------------------
// List
//------------------------
__config.endpoint.list={
	url:'http://192.168.80.53/rfps/api/list.php',
	method:'GET'
}


//-------------------------
// List SEARCH
//------------------------
__config.endpoint.list.search={
	url:'http://192.168.80.53/rfps/api/list_search.php',
	method:'GET'
}




//-------------------------
// Details
//------------------------
__config.endpoint.details={
	url:'http://192.168.80.53/rfps/api/details.php',
	method:'GET',
	page:1,
	id:null,
}


//-------------------------
// List
//------------------------
__config.endpoint.list.collaborators={
	url:'http://192.168.80.53/rfps/api/collaborators.php',
	method:'GET',
	page:1,
	id:null,
}


//-------------------------
// Activities
//------------------------
__config.endpoint.list.activities={
	url:'http://192.168.80.53/rfps/api/activities.php',
	method:'GET',
	page:1,
	id:null,
}


//-------------------------
// Basket
//------------------------
__config.endpoint.basket={
	url:'http://192.168.80.53/rfps/api/basket_post.php',
	method:'POST',
}


__config.endpoint.basket.close={
	url:'http://192.168.80.53/rfps/api/basket_status.php',
	method:'PUT',
}


__config.endpoint.basket.publish={
	url:'http://192.168.80.53/rfps/api/publish.php',
	method:'PUT',
}

__config.endpoint.basket.delete={
	url:'http://192.168.80.53/rfps/api/basket_delete.php',
	method:'DELETE',
}

__config.endpoint.basket.update={
	url:'http://192.168.80.53/rfps/api/basket_update.php',
	method:'PUT',
}


//-------------------------
// Attachments
//------------------------
__config.endpoint.basket.attachments={
	url:'http://192.168.80.53/rfps/api/attachments.php',
	method:'GET'
}

__config.endpoint.basket.attachments.post={
	url:'http://192.168.80.53/rfps/api/attachments_post.php',
	method:'POST'
}

__config.endpoint.basket.attachments.delete={
	url:'http://192.168.80.53/rfps/api/attachments_delete.php',
	method:'DELETE'
}


__config.endpoint.basket.attachments.close={
	url:'http://192.168.80.53/rfps/api/attachments_put.php',
	method:'PUT'
}

__config.endpoint.basket.attachments.open={
	url:'http://192.168.80.53/rfps/api/attachments_put.php',
	method:'PUT'
}

__config.endpoint.basket.attachments.category={
	url:'http://192.168.80.53/rfps/api/attachments_category_put.php',
	method:'PUT'
}


//-------------------------
// collaborators
//------------------------
__config.endpoint.basket.collaborators={
	url:'http://192.168.80.53/rfps/api/',
	method:'POST'
}

__config.endpoint.basket.collaborators.post={
	url:'http://192.168.80.53/rfps/api/basket_collaborators_post.php',
	method:'POST'
}

__config.endpoint.basket.collaborators.delete={
	url:'http://192.168.80.53/rfps/api/basket_collaborators_delete.php',
	method:'DELETE'
}





//-------------------------
// Categories
//------------------------
__config.endpoint.categories={
	url:'http://192.168.80.53/rfps/api/categories.php',
	method:'GET',
}










//-------------------------
// groups
//------------------------
__config.endpoint.groups={
	url:'http://192.168.80.53/rfps/api/groups.php',
	method:'GET',
	page:1,
	id:null,
}


__config.endpoint.groups.members={
	url:'http://192.168.80.53/rfps/api/group_members.php',
	method:'GET',
}

__config.endpoint.groups.members.post={
	url:'http://192.168.80.53/rfps/api/group_members_post.php',
	method:'POST',
}

__config.endpoint.groups.members.delete={
	url:'http://192.168.80.53/rfps/api/group_members_delete.php',
	method:'DELETE',
}



//-------------------------
// groups
//------------------------
__config.endpoint.contacts={
	url:'http://192.168.80.53/rfps/api/contacts.php',
	method:'GET',
	page:1,
	id:null,
}

__config.endpoint.contacts.search={
	url:'http://192.168.80.53/rfps/api/contacts_search.php',
	method:'GET',
}












//---------------------------
// Activities
//---------------------------
__config.endpoint.activities={
	url:'127.0.0.1/sdft/api/activities/',
	method:'GET'
}


//---------------------------
// Routes
//---------------------------
__config.endpoint.routes={
	url:'127.0.0.1/sdft/api/routes/',
	method:'GET'
}




