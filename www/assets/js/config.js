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
__config.session.department=window.localStorage.getItem('cached_department');
__config.session.uid=window.localStorage.getItem('cached_uid');

//cache settings
__config.cache= new Date().getTime()


//------------------------
// Enpoint
//------------------------
__config.endpoint={}
__config.endpoint.host='localhost/';
__config.endpoint.protocol='http://';
__config.endpoint.pathname='sdft_api/public/api/';
__config.endpoint.url=__config.endpoint.protocol+''+__config.endpoint.host+'/'+__config.endpoint.pathname;


//------------------------
// Authentication 
//------------------------
__config.endpoint.auth={
	url:__config.endpoint.url+'authentication/auth.php',
	method:'POST'
}



//-------------------------
// List
//------------------------
__config.endpoint.list={
	url:__config.endpoint.url+'baskets/basket_list.php?cache='+__config.cache,
	method:'GET'
}


__config.endpoint.list.search={
	url:__config.endpoint.url+'baskets/basket_search.php',
	method:'GET'
}




//-------------------------
// List collaborators
//------------------------
__config.endpoint.list.collaborators={
	url:__config.endpoint.url+'baskets/collaborators/collaborators_list.php',
	method:'GET',
	page:1,
	id:null,
}


//-------------------------
// Activities
//------------------------
__config.endpoint.list.activities={
	url:__config.endpoint.url+'baskets/basket_activities.php',
	method:'GET',
	page:1,
	id:null,
}


//-------------------------
// Notes
//------------------------
__config.endpoint.list.notes={
	url:__config.endpoint.url+'baskets/basket_notes.php',
	method:'GET',
	page:1,
	id:null,
}



//-------------------------
// Basket
//------------------------
__config.endpoint.basket={
	url:__config.endpoint.url+'baskets/basket_post.php',
	method:'POST',
}


__config.endpoint.basket.close={
	url:__config.endpoint.url+'baskets/basket_status.php',
	method:'POST',
}


__config.endpoint.basket.publish={
	url:__config.endpoint.url+'baskets/basket_publish_status.php',
	method:'POST',
}

__config.endpoint.basket.delete={
	url:__config.endpoint.url+'baskets/basket_delete.php',
	method:'POST',
}

__config.endpoint.basket.update={
	url:__config.endpoint.url+'baskets/basket_description.php',
	method:'POST',
}

__config.endpoint.basket.routes={
	url:__config.endpoint.url+'baskets/routes/routes.php',
	method:'GET',
}

__config.endpoint.basket.routes.update={
	url:__config.endpoint.url+'baskets/routes/route_update.php',
	method:'POST',
}






//-------------------------
// Details
//------------------------
__config.endpoint.details={
	url:__config.endpoint.url+'baskets/basket_details.php',
	method:'GET',
	page:1,
	id:null,
}

//-------------------------
// Keywords
// ------------------------
// 
__config.endpoint.basket.keywords={ }

__config.endpoint.basket.keywords.update={
	url:__config.endpoint.url+'baskets/basket_keywords.php',
	method:'POST',
}


//-------------------------
// Notes
// ------------------------
// 
__config.endpoint.basket.notes={ }
__config.endpoint.basket.notes.post={
	url:__config.endpoint.url+'baskets/basket_notes_post.php',
	method:'POST',
}

__config.endpoint.basket.notes.delete={
	url:__config.endpoint.url+'baskets/basket_notes_delete.php',
	method:'POST',
}

__config.endpoint.basket.notes.update={
	url:__config.endpoint.url+'baskets/basket_notes_update.php',
	method:'POST',
}




//-------------------------
// Attachments
//------------------------
__config.endpoint.basket.attachments={
	url:__config.endpoint.url+'attachments/attachments_download.php',
	method:'GET'
}

__config.endpoint.basket.attachments.post={
	url:__config.endpoint.url+'attachments/attachments_post.php',
	method:'POST'
}

__config.endpoint.basket.attachments.delete={
	url:__config.endpoint.url+'attachments/attachments_delete.php',
	method:'POST'
}


__config.endpoint.basket.attachments.close={
	url:__config.endpoint.url+'attachments/attachments_put.php',
	method:'POST'
}

__config.endpoint.basket.attachments.open={
	url:__config.endpoint.url+'attachments/attachments_put.php',
	method:'POST'
}

__config.endpoint.basket.attachments.category={
	url:__config.endpoint.url+'attachments/attachments_category_put.php',
	method:'POST'
}

//attachment via link
__config.endpoint.basket.attachments.link={
	url:__config.endpoint.url,
	method:'GET',
}

__config.endpoint.basket.attachments.link.post={
	url:__config.endpoint.url+'storage/storage_link_post.php',
	method:'POST',
}


//-------------------------
// token
//------------------------
__config.endpoint.basket.attachments.token={
	url:__config.endpoint.url+'attachments/token/token.php',
	method:'GET',
}

__config.endpoint.basket.attachments.token.post={
	url:__config.endpoint.url+'attachments/token/token_post.php',
	method:'POST',
}

__config.endpoint.basket.attachments.token.delete={
	url:__config.endpoint.url+'attachments/token/token_delete.php',
	method:'POST',
}

__config.endpoint.basket.attachments.token.email={
	url:__config.endpoint.url+'attachments/token/token_email.php',
	method:'GET',
}

__config.endpoint.basket.attachments.token.email.update={
	url:__config.endpoint.url+'attachments/token/token_email_put.php',
	method:'POST',
}

//-------------------------
// token
//------------------------
__config.endpoint.basket.attachments.comment={
	url:__config.endpoint.url+'attachments/comments/comments.php',
	method:'GET',
}


__config.endpoint.basket.attachments.comment.post={
	url:__config.endpoint.url+'attachments/comments/comments_post.php',
	method:'POST',
}


__config.endpoint.basket.attachments.comment.delete={
	url:__config.endpoint.url+'attachments/comments/comments_delete.php',
	method:'POST',
}



//-------------------------
// collaborators
//------------------------
__config.endpoint.basket.collaborators={
	url:__config.endpoint.url,
	method:'POST'
}

__config.endpoint.basket.collaborators.post={
	url:__config.endpoint.url+'baskets/collaborators/collaborators_post.php',
	method:'POST'
}

__config.endpoint.basket.collaborators.delete={
	url:__config.endpoint.url+'baskets/collaborators/collaborators_delete.php',
	method:'POST'
}



//-------------------------
// storage
//------------------------
__config.endpoint.storage={
	url:__config.endpoint.url+'storage/storage.php',
	method:'GET'
}


__config.endpoint.storage.post={
	url:__config.endpoint.url+'storage/storage_post.php',
	method:'POST'
}

__config.endpoint.storage.search={
	url:__config.endpoint.url+'storage/storage_search.php',
	method:'GET'
}





//-------------------------
// Categories
//------------------------
__config.endpoint.categories={
	url:__config.endpoint.url+'categories/categories.php',
	method:'GET',
}

//-------------------------
// email
//------------------------
__config.endpoint.email={
	url:__config.endpoint.url+'email.php',
	method:'GET',
}

__config.endpoint.email.search={
	url:__config.endpoint.url+'email/email_search.php',
	method:'GET',
}








//-------------------------
// Notifications
//------------------------
__config.endpoint.notifications={
	url:__config.endpoint.url+'notifications/notifications.php',
	method:'GET',
	page:1,
	id:null,
}





//-------------------------
// groups
//------------------------
__config.endpoint.groups={
	url:__config.endpoint.url+'rfps/api/groups.php',
	method:'GET',
	page:1,
	id:null,
}


__config.endpoint.groups.members={
	url:__config.endpoint.url+'rfps/api/group_members.php',
	method:'GET',
}

__config.endpoint.groups.members.post={
	url:__config.endpoint.url+'rfps/api/group_members_post.php',
	method:'POST',
}

__config.endpoint.groups.members.delete={
	url:__config.endpoint.url+'rfps/api/group_members_delete.php',
	method:'POST',
}



//-------------------------
// groups
//------------------------
__config.endpoint.contacts={
	url:__config.endpoint.url+'contacts/contact_list.php',
	method:'GET',
	page:1,
	id:null,
}

__config.endpoint.contacts.search={
	url:__config.endpoint.url+'contacts/contacts_search.php',
	method:'GET',
}












//---------------------------
// Activities
//---------------------------
__config.endpoint.activities={
	url:__config.endpoint.url+'activities/',
	method:'GET'
}


//---------------------------
// Routes
//---------------------------
__config.endpoint.routes={
	url:'127.0.0.1/sdft/api/routes/',
	method:'GET'
}




