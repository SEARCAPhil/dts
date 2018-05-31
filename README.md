# Document Tracking System
Hybrid Application for SEARCA's Document Tracking System

![share](http://magazinetraining.com/wp-content/uploads/digital-marketing.png)

### Requirements
- [NodeJS](https://nodejs.org/en/) \>= v8.9.4 
- [Yarn](https://yarnpkg.com/en/docs/install#mac-tab)
- [Webserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server) - apache, nginx, etc...

### Installation
1. Install **git** or [git-scm](https://git-scm.com/download) for windows 
2. Install **yarn**
3. `git clone https://github.com/SEARCAPhil/dts.git`
4. `git checkout develop` This is the current development branch
5. `npm install -g phonegap@latest`
6. `npm install -g documentation`
7. `yarn install`
8. Open your browser and navigate to `http://localhost/dts/www/`
> In your production server, only the content of `www` is necessary so you may only copy all the files inside `www` to your webserver's root directory.
Copy **dts/www** to  **web_root/dts**

> **https://your_domain/dts/**

9. To run the system via phonegap run `phongap serve` and type `http://localhost:3000/index.html` in your browser
10. Setup the **API**

> To view the code documentation, run `documentation build www/assets/js/** -o docs -f html` and open `docs/index.html`.      
 You can read the full documentation of [documentation.js](http://documentation.js.org/) on their [official repository](https://github.com/documentationjs/documentation)



  