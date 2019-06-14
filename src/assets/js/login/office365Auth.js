(function(window,document,undefined){
    "use strict";

    let profile_data = {}

    // ADAL CONFIGURATION
    // Change default value with your default AD configuration
    window.adalConfig  = {
      instance: 'https://login.microsoftonline.com/', 
      tenant: 'searca.org', //COMMON OR YOUR TENANT ID
      clientId: 'f121bfba-0b54-4acf-8912-39aae2d7feaf', //This is your client ID
      redirectUri: `http://localhost/dts/www/login.html`, //This is your redirect URI
      cacheLocation: 'localStorage',
      callback: userSignedIn,
      popUp: true,
      endpoints : {"https://graph.microsoft.com": "https://graph.microsoft.com"},
    }

    // adal global instance
    window.AuthenticationContext = AuthenticationContext

    // adal instance
    window.ADAL = new  window.AuthenticationContext(window.adalConfig);
    window.ADAL.handleWindowCallback()

    // phonegap settings
    if (document.URL.indexOf( 'http://' ) === -1  && document.URL.indexOf( 'https://' ) === -1) {
      delete window.open;  // This restores the default browser
    }  

    /*-------------------------------------------------
   | Save details in to device
   |--------------------------------------------------*/ 
    const __save_token_to_storage = (token) => {
      window.localStorage.setItem('token',token);
    }

    const __save_user_details_to_storage = (data) => {
      window.localStorage.setItem('cached_full_name',data.details.full_name);
      window.localStorage.setItem('cached_first_name',data.details.first_name);
      window.localStorage.setItem('cached_last_name',data.details.last_name);
      window.localStorage.setItem('cached_department',data.details.department);
      window.localStorage.setItem('cached_alias',data.details.alias);
      window.localStorage.setItem('cached_position',data.details.position);
      window.localStorage.setItem('cached_uid',data.details.uid);
      window.localStorage.setItem('cached_user_data',JSON.stringify(data));
    }

    const office365Login = () => { 
      // e.target.disabled = 'disabled'
      window.ADAL.login()
      $.mobile.loading('show')
    }

    // adal error
    const authError = () => {
      $.mobile.loading('hide')
      alert('Unable to authenticate. Please try again later.')
    }

    // login via API
    const loginOnPremiseServer = (data) => { 
      return new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest()
        const payload = {
          url:`${__config.endpoint.url}authentication/office365Auth.php`,
          method:'POST',
          body: JSON.stringify({
              data,
          }),
        }
          
        XHR.open(payload.method, payload.url)
        XHR.addEventListener('load', (res) => {
          const json = (res.currentTarget.responseText)
          const data = JSON.parse(json)
          try{
              resolve(data) 
          }catch(err) {
              reject(err)
          } 
        })
        XHR.send(payload.body)
      })
    }

    
    const loginOnPremise = (data) => {  
      profile_data = {full_name:data.displayName,first_name:data.givenName,id:data.id,email:data.mail,office:data.officeLocation,department:data.department,position:data.jobTitle,surname:data.surname,token:data.id}
      // authenticate to remote server
      loginOnPremiseServer (profile_data).then((json) => {  
        $.mobile.loading('hide')
          
        // save to storage
        __save_token_to_storage(json.token);
        __save_user_details_to_storage(json)

        // redirect
        setTimeout(() => {
          window.location = 'index.html';
        },700)
          
      }).catch((err) => { 
        console.log(err)
        $.mobile.loading('hide')
        authError()
        document.querySelector('.btn-office365').removeAttribute('disabled')
      })
    }

    // get msgraph
    const getGraph = (token)  => {
      fetch('https://graph.microsoft.com/beta/me/',{ 
        headers:{'Authorization':'Bearer '+token}, 
        method: 'GET'}
      ).then(response => response.json()).catch((err) => {
        authError()
      }).then(data => {
        // auth to onpremise
        if(data.id) {  
          loginOnPremise(data)
        }
      })
    }

    // adal callback
    function userSignedIn(err, token) {
        $.mobile.loading('show')
        if (!err) {
          window.ADAL.acquireToken("https://graph.microsoft.com", function (error, token) { 
            if(token.length) { 
              getGraph(token)
            } else { 
              authError()
            }
          })
        }
    }

    //console
    console.log("%cUnauthorized Access","color: red; font-size: x-large")
    console.log("%cDocument Tracking System : You are trying to view the code in console","color: grey")

    /*-------------------------------------------------
   | Make office365 login available to global scope
   |--------------------------------------------------*/  
   if(typeof window.sdft!='object')   window.sdft={} 
   if(typeof window.sdft.user!='object')   window.sdft.user={} //user
   
   window.sdft.office365Login = office365Login;
   window.sdft.user = profile_data;

})(window,document);
