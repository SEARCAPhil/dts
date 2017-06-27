/*ajax list*/
function __ajax_list(data,success_callback,error_callback){
  $.ajax({
    url:__config.endpoint.list.url,
    method:__config.endpoint.list.method,
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


/*ajax list*/
function __ajax_list_search(data,success_callback,error_callback=function(){}){
  $.ajax({
    url:__config.endpoint.list.search.url,
    method:__config.endpoint.list.search.method,
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