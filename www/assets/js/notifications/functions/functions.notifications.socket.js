'use strict';
/*-----------------------------
|
| SOCKET CONNECTION
|------------------------------*/
var socket=io.connect('http://192.168.80.53:8082');
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
})