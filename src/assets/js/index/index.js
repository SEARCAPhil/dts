import { init } from './core'
import { showMoreNotifications } from '../notifications/functions/functions.notifications'
import Message from 'vanilla-antd-message/dist/'
import { push } from '../notifications/functions/functions.notifications.socket'
window.addEventListener('DOMContentLoaded', () => { 
  // load all settings
  init()

  /*--------------------------------
	| Load notification via ajax
	|--------------------------------*/
	$('.container-notifications').load('notifications.html',function(){
		window.sdft.notification_page=0
		showMoreNotifications();
		push()
	})
	
	$('#signout').on('click', function(e) {
		e.preventDefault()
		let href = window.location.href.toString()
		href = href.replace('index.html', 'login.html')
		window.localStorage.clear()
		window.sessionStorage.clear()
		window.location = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${href}`
	})
	
	// click new button when getting started was clicked
	setTimeout(() => {
		$('.getting-started-btn').on('click', () => {
			$('li#new').click()
		})
	}, 2000)
  
})


// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })


  // on update
  navigator.serviceWorker.controller.onstatechange = function (event) {
    if (event.target.state === 'redundant') {

      if ('controller' in navigator.serviceWorker) {
        import('vanilla-antd-message/dist/style.css').then(res => { 
          // update notice style
          let style = document.createElement('style')
          style.innerHTML = `${res.default.toString()}`
          style.async = true  
          document.body.append(style)
        })
        // show message then restart the app 
        Message.success("A new update is available! To bring the most out of it, we will now restart your application\nRestarting . . . Please wait", 20000)
        setTimeout(() => { 
          window.location.reload()
        }, 6000)
      }
    
    }
  }
}



window.deferredPrompt = {};

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  const __banner = import('../../../components/install-notice-section')
  const __target = document.querySelector('.install-notice-section')
  __banner.then(Res => {
    return new Res.default().then(html => {
      return __target ? __target.replaceWith(html) : document.body.append(html)
    })
  })
})




