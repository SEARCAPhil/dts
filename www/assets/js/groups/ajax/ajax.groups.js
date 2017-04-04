	
/*ajax groups*/
function __ajax_groups(data,success_callback,error_callback){
  $.ajax({
    url:__config.endpoint.groups.url,
    method:__config.endpoint.groups.method,
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



/*ajax contacts*/
function __ajax_contacts(data,success_callback,error_callback){
  $.ajax({
    url:__config.endpoint.contacts.url,
    method:__config.endpoint.contacts.method,
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
