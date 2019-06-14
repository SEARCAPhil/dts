
/*auth controller*/
function __save_token_to_storage(token){
  window.localStorage.setItem('token',token);
}

function __save_user_details_to_storage(data){
 
    window.localStorage.setItem('cached_full_name',data.details.full_name);
    window.localStorage.setItem('cached_first_name',data.details.first_name);
    window.localStorage.setItem('cached_last_name',data.details.last_name);
    window.localStorage.setItem('cached_department',data.details.department);
    window.localStorage.setItem('cached_alias',data.details.alias);
    window.localStorage.setItem('cached_position',data.details.position);
    window.localStorage.setItem('cached_uid',data.details.uid);

    window.localStorage.setItem('cached_user_data',JSON.stringify(data));
};





function __auth(username,password){

  var uuid=((typeof device)!='undefined')?device.uuid:null;

  if(username.length>0&&password.length>0){
    __ajax_auth({username:username,password:password,uuid:uuid},function(json){
        
        try{

          var data=JSON.parse(json);

          if(data.status==200){

              if(data.token.length>10){
                  //save token to device
                 __save_token_to_storage(data.token);
                 __save_user_details_to_storage(data);

                 //go to main page
                 setTimeout(function(){
                    window.location='index.html';
                 },700)
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

