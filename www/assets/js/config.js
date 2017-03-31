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


//------------------------
// Enpoint
//------------------------
__config.endpoint={}


//------------------------
// Authentication 
//------------------------
__config.endpoint.auth={
	url:'/rfps/auth/',
	method:'POST'
}

//-------------------------
// List
//------------------------
__config.endpoint.list={
	url:'127.0.0.1/sdft/api/item/',
	method:'GET'
}



//-------------------------
// List
//------------------------
__config.endpoint.list.preview={
	url:'127.0.0.1/sdft/api/item/',
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




