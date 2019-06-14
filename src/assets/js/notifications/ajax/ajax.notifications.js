/*ajax notification*/
import { config as __config } from '../../../../config/app'
function __ajax_notifications(data,success_callback,error_callback){
  $.ajax({
    url:__config.endpoint.notifications.url,
    method:__config.endpoint.notifications.method,
    data:data,
    beforeSend:function(){
       $.mobile.loading('show');

       //enable debugging
       if(__config.debug) console.log('\u{26AB} Connecting . . .')
    }
  }).success(function(json){ 

    $.mobile.loading('hide');  
    success_callback(json);

     //enable debugging
      if(__config.debug) console.log('\u{26AB} Connected')

  }).fail(function(json){ 
    
    $.mobile.loading('hide');  
    error_callback(json); 

    //enable debugging
    if(__config.debug) console.log('\u{26AB} Unable to fetch data. Please check connection')

  })

}

export {
  __ajax_notifications
}