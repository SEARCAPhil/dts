/**
 * @namespace __config 
 */
var __config = {}

/**
 * Log errors and warnings in console.
 * This is set as true by default
 * @namespace __config.debug
 * @memberof __config
 */
__config.debug = true;

/**
 * @namespace __config.console
 * @memberof __config
 * @property {Object} message Default console message
 */
__config.console = {}
__config.console.message=`
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\\\\\\\\\ 								SEARCA's Document Tracking System 												\\\\\\\\\\
\\\\\\\\\\       						        																							\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\\\\\\\\\You are trying to view the source code in the console. Modifying codes are prohibited and you will be liable to any changes you   \\\\\\\\\\\\\\ 
\\\\\\\\\\made . Please contact our legal team																								\\\\\\\\\\\\\\ 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
`

/**
 * This holds the current session including personal info, and access token
 * @namespace __config.session
 * @memberof __config
 * @type {Object}
 * @property {Object} token - Token
 * @property {Object} fullName
 * @property {Object} firstName
 * @property {Object} lastName
 * @property {Object} position
 * @property {Object} department
 * @property {Object} uid - Unique identification number from API (not from O365)
 */
__config.session = {}
__config.session.token = window.localStorage.getItem('token');
__config.session.fullName = window.localStorage.getItem('cached_full_name');
__config.session.firstName = window.localStorage.getItem('cached_first_name');
__config.session.lastName = window.localStorage.getItem('cached_last_name');
__config.session.position = window.localStorage.getItem('cached_position');
__config.session.department = window.localStorage.getItem('cached_department');
__config.session.uid = window.localStorage.getItem('cached_uid');

/**
 * Date where files are written to cache
 * @namespace __config.cache
 * @memberof __config
 */
__config.cache = new Date().getTime()


/**
 * return the API URL Object
 * @namespace __config.endpoint
 * @memberof __config
 * @type {Object}
 * @property {string} host  Host name
 * @property {string} protocol  Scheme - http:// or https://
 * @property {string} pathname Path name
 * @property {string} url  Concatenated hostname, protocol, and path name 
 * @property {Object} auth  Authentication
 * @property {Object} list  Basket list
 * @property {Object} basket  Create new basket
 * @property {Object} storage  Get files from storage
 * @property {Object} categories  Get all categories
 */
__config.endpoint = {}

__config.endpoint.host = 'localhost/';

__config.endpoint.protocol = 'http://';

__config.endpoint.pathname = 'sdft_api/public/api/';

__config.endpoint.url = __config.endpoint.protocol+''+__config.endpoint.host+'/'+__config.endpoint.pathname;

__config.endpoint.auth = {
	url:__config.endpoint.url+'authentication/auth.php',
	method:'POST',
}

/**
 * Basket list
 * @namespace __config.endpoint.list
 * @memberof __config.endpoint
 * @type {Object}
 * @property {Object} search  Search basket
 * @property {Object} collaborators  Basket members
 * @property {Object} activities  Basket's full history
 * @property {Object} notes  Get posted internal notes
 * @property {Object} email Retrieve a list of email registered to the system
 * @property {Object} notifications  Retrieve all notifications
 */
__config.endpoint.list = {
	url:__config.endpoint.url+'baskets/basket_list.php?cache='+__config.cache,
	method:'GET',
}

__config.endpoint.list.search = {
	url: __config.endpoint.url+'baskets/basket_search.php',
	method:'GET',
}

__config.endpoint.list.collaborators = {
	url: __config.endpoint.url+'baskets/collaborators/collaborators_list.php',
	method:'GET',
	page:1,
	id:null,
}

__config.endpoint.list.activities = {
	url: __config.endpoint.url+'baskets/basket_activities.php',
	method:'GET',
	page:1,
	id:null,
}

__config.endpoint.list.notes = {
	url: __config.endpoint.url+'baskets/basket_notes.php',
	method:'GET',
	page:1,
	id:null,
}



/**
 * Basket list
 * @namespace __config.endpoint.basket
 * @memberof __config.endpoint
 * @type {Object}
 * @property {Object} close  Close basket
 * @property {Object} publish Send the basket to collaborators
 * @property {Object} delete  Remove basket
 * @property {Object} update  Update basket description 
 * @property {Object} details Basket information
 * @property {Object} routes  Get In / OUT full history
 */
__config.endpoint.basket = {
	url: __config.endpoint.url+'baskets/basket_post.php',
	method:'POST',
}

__config.endpoint.basket.close={
	url: __config.endpoint.url+'baskets/basket_status.php',
	method:'POST',
}

__config.endpoint.basket.publish = {
	url: __config.endpoint.url+'baskets/basket_publish_status.php',
	method:'POST',
}

__config.endpoint.basket.delete = {
	url:__config.endpoint.url+'baskets/basket_delete.php',
	method:'POST',
}

__config.endpoint.basket.update = {
	url:__config.endpoint.url+'baskets/basket_description.php',
	method:'POST',
}

__config.endpoint.details = {
	url:__config.endpoint.url+'baskets/basket_details.php',
	method:'GET',
	page:1,
	id:null,
}


/**
 * Get In / OUT full history
 * @namespace __config.endpoint.basket.routes 
 * @memberof __config.endpoint.basket
 * @type {Object}
 * @property {Object} update In / Out
 */
__config.endpoint.basket.routes = {
	url: __config.endpoint.url+'baskets/routes/routes.php',
	method:'GET',
}

__config.endpoint.basket.routes.update = {
	url:__config.endpoint.url+'baskets/routes/route_update.php',
	method:'POST',
}


/**
 * @namespace __config.endpoint.basket.keywords
 * @memberof __config.endpoint.basket
 * @type {Object}
 * @property {Object} update Set and Update keywords
 */
__config.endpoint.basket.keywords = { }

__config.endpoint.basket.keywords.update = {
	url:__config.endpoint.url+'baskets/basket_keywords.php',
	method:'POST',
}


/**
 * @namespace __config.endpoint.basket.notes
 * @memberof __config.endpoint.basket
 * @type {Object}
 * @property {Object} post Post an internal note
 * @property {Object} delete Delete note
 * @property {Object} update Update note
 */
__config.endpoint.basket.notes = { }


__config.endpoint.basket.notes.post = {
	url:__config.endpoint.url+'baskets/basket_notes_post.php',
	method:'POST',
}

__config.endpoint.basket.notes.delete = {
	url: __config.endpoint.url+'baskets/basket_notes_delete.php',
	method:'POST',
}

__config.endpoint.basket.notes.update = {
	url: __config.endpoint.url+'baskets/basket_notes_update.php',
	method:'POST',
}

/**
 * View all basket's attachments
 * @namespace __config.endpoint.basket.notes
 * @memberof __config.endpoint.basket
 * @type {Object}
 * @property {Object} post Attach new files
 * @property {Object} delete Delete file
 * @property {Object} close Set file status to closed
 * @property {Object} open Set file status to closed
 * @property {Object} category Set basket category
 * @property {Object} link Attach file via shared link
 * @property {Object} category Set basket category
 * @property {Object} token Get shared link for selected file
 * @property {Object} collaborators Set collaborator
 */
__config.endpoint.basket.attachments={
	url:__config.endpoint.url+'attachments/attachments_download.php',
	method:'GET'
}

__config.endpoint.basket.attachments.post = {
	url:__config.endpoint.url+'attachments/attachments_post.php',
	method:'POST'
}

__config.endpoint.basket.attachments.delete = {
	url:__config.endpoint.url+'attachments/attachments_delete.php',
	method:'POST'
}

__config.endpoint.basket.attachments.close = {
	url:__config.endpoint.url+'attachments/attachments_put.php',
	method:'POST'
}


__config.endpoint.basket.attachments.open = {
	url:__config.endpoint.url+'attachments/attachments_put.php',
	method:'POST'
}


__config.endpoint.basket.attachments.category = {
	url:__config.endpoint.url+'attachments/attachments_category_put.php',
	method:'POST'
}

/**
 * Attach file via shared link
 * @namespace __config.endpoint.basket.attachments.link
 * @memberof __config.endpoint.basket.attachments
 * @type {Object}
 * @property {Object} post Attach recently uploaded files (Soft link)
 */
__config.endpoint.basket.attachments.link = {
	url: __config.endpoint.url,
	method:'GET',
}

__config.endpoint.basket.attachments.link.post = {
	url:__config.endpoint.url+'storage/storage_link_post.php',
	method:'POST',
}



/**
 * Get shared link for selected file
 * @namespace __config.endpoint.basket.attachments.token
 * @memberof __config.endpoint.basket.attachments
 * @type {Object}
 * @property {Object} post Generate shared link
 * @property {Object} delete Delete shared link
 * @property {Object} email Get whitlisted email for a certain shared link
 * @property {Object} comment Get all comments for each attachment
 */
__config.endpoint.basket.attachments.token = {
	url: __config.endpoint.url+'attachments/token/token.php',
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


/**
 * Get whitlisted email for a certain shared link
 * @namespace __config.endpoint.basket.attachments.token.email
 * @memberof __config.endpoint.basket.attachments.token
 * @type {Object}
 * @property {Object} update Update shared link for selected email
 */
__config.endpoint.basket.attachments.token.email = {
	url:__config.endpoint.url+'attachments/token/token_email.php',
	method:'GET',
}

__config.endpoint.basket.attachments.token.email.update = {
	url:__config.endpoint.url+'attachments/token/token_email_put.php',
	method:'POST',
}



/**
 * Get all comments for each attachment
 * @namespace __config.endpoint.basket.attachments.comment 
 * @memberof __config.endpoint.basket.attachments
 * @type {Object}
 * @property {Object} post Post internal comment to certain file
 * @property {Object} post Delete internal comment
 */
__config.endpoint.basket.attachments.comment = {
	url: __config.endpoint.url+'attachments/comments/comments.php',
	method:'GET',
}


__config.endpoint.basket.attachments.comment.post = {
	url:__config.endpoint.url+'attachments/comments/comments_post.php',
	method:'POST',
}

__config.endpoint.basket.attachments.comment.delete = {
	url:__config.endpoint.url+'attachments/comments/comments_delete.php',
	method:'POST',
}


/**
 * Set collaborator
 * @namespace __config.endpoint.basket.collaborators
 * @memberof __config.endpoint.basket
 * @type {Object}
 * @property {Object} post Set collaborator
 * @property {Object} delete Remove person in collaborators list
 */
__config.endpoint.basket.collaborators = {
	url:__config.endpoint.url,
	method:'POST'
}

__config.endpoint.basket.collaborators.post = {
	url:__config.endpoint.url+'baskets/collaborators/collaborators_post.php',
	method:'POST'
}

__config.endpoint.basket.collaborators.delete={
	url:__config.endpoint.url+'baskets/collaborators/collaborators_delete.php',
	method:'POST'
}



/**
 * Get files from storage
 * @namespace __config.endpoint.storage
 * @memberof __config.endpoint
 * @type {Object}
 * @property {Object} post Add new files from data storage
 * @property {Object} search Search files
 */
__config.endpoint.storage = {
	url:__config.endpoint.url+'storage/storage.php',
	method:'GET'
}

__config.endpoint.storage.post = {
	url:__config.endpoint.url+'storage/storage_post.php',
	method:'POST'
}

__config.endpoint.storage.search = {
	url:__config.endpoint.url+'storage/storage_search.php',
	method:'GET'
}


/* categories */
__config.endpoint.categories = {
	url: __config.endpoint.url+'categories/categories.php',
	method:'GET',
}


/**
 * Retrieve a list of email registered to the system
 * @namespace __config.endpoint.email
 * @memberof __config.endpoint
 * @type {Object}
 * @property {Object} search search email address
 */
__config.endpoint.email = {
	url:__config.endpoint.url+'email.php',
	method:'GET',
}

__config.endpoint.email.search = {
	url:__config.endpoint.url+'email/email_search.php',
	method:'GET',
}



/* Retrieve all notifications */
__config.endpoint.notifications = {
	url:__config.endpoint.url+'notifications/notifications.php',
	method:'GET',
	page:1,
	id:null,
}



/**
 * Retrieve a list of registered users for selecting collaborators
 * @namespace __config.endpoint.contacts
 * @memberof __config.endpoint
 * @type {Object}
 * @property {Object} search search contacts
 */
__config.endpoint.contacts = {
	url:__config.endpoint.url+'contacts/contact_list.php',
	method:'GET',
	page:1,
	id:null,
}

__config.endpoint.contacts.search = {
	url:__config.endpoint.url+'contacts/contacts_search.php',
	method:'GET',
}



/*
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
}*/



/*

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
}*/




