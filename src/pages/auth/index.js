/* eslint-disable new-cap */
import * as Msal from 'msal/dist/msal'
import config from '../../config/msal'
import CWPConfig from '../../config/dts'

const URL = import('../../utils/xhr')
const profiler = import('../../mixins/profiler')

class O365Auth {
  constructor (opt = {}) {
    this.__opt = opt
    this.__config = config
    this.timestamp = new Date().getTime()
    this.xhr = {}
    return this.render()
  }

  /*-------------------------------------------------
  | Save details in to device
  |--------------------------------------------------*/ 
  __save_token_to_storage (token) {
    window.localStorage.setItem('token',token);
  }

  __save_user_details_to_storage (data) {
    window.localStorage.setItem('cached_full_name',data.details.full_name);
    window.localStorage.setItem('cached_first_name',data.details.first_name);
    window.localStorage.setItem('cached_last_name',data.details.last_name);
    window.localStorage.setItem('cached_department',data.details.department);
    window.localStorage.setItem('cached_alias',data.details.alias);
    window.localStorage.setItem('cached_position',data.details.position);
    window.localStorage.setItem('cached_uid',data.details.uid);
    window.localStorage.setItem('cached_user_data',JSON.stringify(data));
  }

  __load () {
      this.targ.disabled = "disabled"
      this.targ.innerText = 'Authenticating . . .'
      this.msalInstance.loginRedirect(this.loginRequest)
  }

  async __loginOnPremise (opt, header) {
    this.xhr = new (await URL).default()
    return this.xhr.__postData(`authentication/`, opt, {})
  }

  authRedirectCallBack (error, response) {
    
    if (error) {
        console.log(error);
    } else {
        if (response.tokenType === "access_token") {
            //callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphAPICallback);
        } else {
          //window.stop()
            console.log("token type is:" + response.tokenType);
            console.log(response.idToken)
        }
    }

  }


  loginOnPremise (data) {
    profiler.then(res => {
      // set payload with CWP (Contacts Web Portal) app credentials
      let payload = {
        client_id: CWPConfig.id,
        id: data.id,
        mail: data.mail,
        data
      }
      this.__loginOnPremise(payload).then(o365 => {
        if (!o365.token) return

        // save to storage
        this.__save_token_to_storage(o365.token);
        this.__save_user_details_to_storage(o365)

        // redirect
        setTimeout(() => {
          window.location = 'index.html';
        },700)

        // load data and reload browser
        return (new res.default().set(data)) | (new res.default().setAccessToken(o365.token))
      })
    })
  }

  getGraph (token) {
    window.fetch('https://graph.microsoft.com/beta/me/', {
      headers: { 'Authorization': 'Bearer ' + token },
      method: 'GET' }
    ).then(response => response.json()).catch((err) => {
      console.log('Oops Something went wrong. Please try again later')
      console.log(err)
    }).then(data => {
      // auth to onpremise
      if (data.id) {
        this.loginOnPremise(data)
      }
    })
  }

  loggerCallback(logLevel, message, containsPii) {
    console.log(message);
  }

  bind () { 
    const __proto__ = Object.create(this)
    this.__opt.root = this.__opt.root || document
    this.targ = this.__opt.root.querySelector(this.__opt.target)
    this.msalConfig = {
      auth: {
        clientId: this.__config.clientId,
        authority: this.__config.authority
      },
      system: {
        logger: {
          localCallback: this.loggerCallback,
          level: Msal.LogLevel.Verbose,
          piiLoggingEnabled: true,
          correlationId: '1234',
          logMessage: this.loggerCallback,
          executeCallback: this.loggerCallback,
          errorPii: () => {},
          error: () => {},
          warning: () => {},
          warningPii: () => {},
          info: () => {},
          infoPii: () => {},
          verbose: () => {},
          verbosePii: () => {}
        }
      }
    }

    this.msalInstance = new Msal.UserAgentApplication(this.msalConfig);

    this.msalInstance.handleRedirectCallback(this.authRedirectCallBack.bind(this));

    this.loginRequest = {
      scopes: ["user.read"] // optional Array<string>
    }

    this.msalInstance.acquireTokenSilent(this.loginRequest).then((accessTokenResponse) => {
      // Acquire token silent success
      // call API with token
      let accessToken = accessTokenResponse.accessToken;
      this.getGraph (accessToken)
    }).catch(function (error) {
        //Acquire token silent failure, send an interactive request.
        console.log(error);
        if (error.errorMessage.indexOf("interaction_required") !== -1) {
          this.msalInstance.acquireTokenRedirect(accessTokenRequest);
        }
    })

    // login btn
    if (this.targ) this.targ.addEventListener('click', this.__load.bind(__proto__))
  }

  render () {
    this.bind()
    return this
  }
}


let auth = new O365Auth({ target: '.btn-office365'})