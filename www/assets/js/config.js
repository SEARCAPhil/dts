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
// groups
//------------------------
__config.endpoint.groups={
	url:'http://192.168.80.53/rfps/api/groups.php',
	method:'GET',
	page:1,
	id:null,
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




