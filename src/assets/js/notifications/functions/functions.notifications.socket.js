import Pusher from 'pusher-js';
import pusherConfig	 from '../../../../config/pusher' 
import { __showNotifications } from './functions.notifications'
import { config } from '../../../../config/app'
import icon from '../../../images/icons/icon-128x128.png'
import image from '../../../images/user.png'

const channel_name = `private-${config.session.uid}-basket-user`
let notifData = []

const push = () => {
	Pusher.logToConsole = true;

    var pusher = new Pusher(pusherConfig.key, {
			authEndpoint: pusherConfig.authEndpoint+`/?`,
			cluster: pusherConfig.cluster,
			encrypted: true,
			auth: {
				headers: {
					'X-CSRF-Token': "SOME_CSRF_TOKEN"
				},
				params: {
					channel_name,
				}
			}
    });

    var channel = pusher.subscribe(channel_name);
    channel.bind('notifications', function(data) {
			// set notification
			data.notifications = data.payload
			notifData = data.notifications
			__showNotifications(data,'.notification-section', function () {
				// show desktop notification
				notify()
			},'append');
		})

		channel.bind('pusher:subscription_succeeded', () => {

		})

		channel.bind('pusher:subscription_error', function(data) {
			console.log("Pusher: " + data);
	 });
}

const showMessage = () => {
	let temp_div = document.createElement("div");
	temp_div.innerHTML = notifData[0].message;
	return new Notification(`${notifData[0].sender.profile_name}`,{ body: `${temp_div.textContent || temp_div.innerText}` , icon, badge: image});
}

const notify = () => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
		showMessage ()
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
				showMessage ()
      }
    });
  }
}

export {
	push
}