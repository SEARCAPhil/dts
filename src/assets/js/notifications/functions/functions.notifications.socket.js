'use strict';
/*-----------------------------
|
| SOCKET CONNECTION
|------------------------------*/
/*var socket=io.connect('ws://35.192.19.79:65080');
socket.on('handshake',(data)=>{
	if(data.message=='hi'){
		socket.emit('handshake',{data:window.localStorage.getItem('cached_user_data')})
	}

	if(data.message=='hello'){
		if(data.data!=undefined){
			window.sdft.socket=socket;
			window.sdft.socket_id=data.data;

			//read notification
			//read_notifications()
		}
	}
})


socket.on('notifications',(data)=>{
	console.log(data)
	__showNotifications(data,'.notification-section',function(){
		bindViewNotification()
	},'prepend');
})*/