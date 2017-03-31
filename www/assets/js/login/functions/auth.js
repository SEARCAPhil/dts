
/*auth controller*/
function __save_token_to_storage(token){
  window.localStorage.setItem('token',token);
}




function __auth(username,password){

  if(username.length>0&&password.length>0){
   
    __ajax_auth({username:username,password:password},function(json){
        
        try{

          var data=JSON.parse(json);

          if(data.status==200){

              if(data.token.length>10){
                  //save token to device
                 __save_token_to_storage(data.token);

                 //go to main page
                 setTimeout(function(){
                    window.location='index.html';
                 },300)
              }


          }else{

            $('.auth-error').html(` <div class="alert alert-danger" style="border-radius: 5px !important;">
                  <small>
                    <p>Oops! Invalid username or password.</p>
                  </small>
                </div>`).fadeIn();  
          }


        }catch(e){
            $('.auth-error').html(` <div class="alert alert-danger" style="border-radius: 5px !important;">
                  <small>
                    <p>Unable to connect to server. Please check your internet connection.</p>
                  </small>
                </div>`).fadeIn();
        }
        


      },function(json){

           $('.auth-error').html(` <div class="alert alert-danger" style="border-radius: 5px !important;">
                  <small>
                    <p>Unable to connect to server. Please check your internet connection.</p>
                  </small>
                </div>`).fadeIn();
      })
  }

}

