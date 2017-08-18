/*
* auth js init
* require index/index.js for browser detection
*/

//override device ready in index
function deviceReady(){
	$('.btn-submit').click(function(){
	      var username=$('#username').val();
	      var password=$('#password').val();
	      __auth(username,password);
	  })


	//require office 365
	$('.btn-office365').on('click',function(){
	      //login
	     window.sdft.office365Login(function(data){})
    })


    /*---------------------------------------
    | Detects Online/offline events
    | show appropriate form for these events
    |----------------------------------------*/
            
    window.addEventListener('offline', function(e) { $('#loginFormOnline').hide(); $('#loginForm').show(); });
    window.addEventListener('online', function(e) { $('#loginFormOnline').show(); $('#loginForm').hide(); });


}


function auth_init(){
	
	document.addEventListener("deviceready",deviceReady,false);
	document.addEventListener("deviceready",deviceReadyForMobile,false); //call in index.js

	//-----------------------------------
	// DESKTOP DETECTION
	// Load function if deviceinstance is non-mobile
	//----------------------------------
	setTimeout(function(){ 
		if(window.sdft.deviceInstance=='desktop'){
			$(document).ready(function(){
				
				deviceReady();
			});
		}
	},300)

}




  