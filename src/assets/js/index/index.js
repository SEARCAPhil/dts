import { init } from './core'
import { showMoreNotifications } from '../notifications/functions/functions.notifications'
window.addEventListener('DOMContentLoaded', () => { 
  // load all settings
  init()

  /*--------------------------------
	| Load notification via ajax
	|--------------------------------*/
	$('.container-notifications').load('notifications.html',function(){

		window.sdft.notification_page=0

		showMoreNotifications();
  })
  
})

