
//setting up docker
var docker={
	init:function(){
		
		var docker_menu=document.querySelectorAll('.docker-menu');

		for(var x=0; x<docker_menu.length;x++){
			
			docker_menu[x].addEventListener('click',function(e){
				//prevent default
				e.preventDefault();

				//get target
				var target_selector=this.getAttribute('data-target');
				var target=document.querySelectorAll(target_selector);

				//get callback delement
				var target_callback_after=this.getAttribute('data-target-after');
				var target_callback_class=this.getAttribute('data-target-after-class');

				var target_callback=document.querySelectorAll(target_callback_after);

				

				for(var y=0; y<target.length; y++){

					//initial state
					var isOpen=(target[y].className.indexOf('docker-toggle-open'))>-1?1:0
					var isClosed=(target[y].className.indexOf('docker-toggle-close'))>-1?1:0

					//Initiate
					//assumed nothing is added on the page load
					if(!isOpen&&!isClosed){

						//get first display
						var cssDefaultDisplay=window.getComputedStyle(target[y]).display

						if(cssDefaultDisplay=='none'){
							target[y].classList.add('docker-toggle-open');	
							target[y].classList.remove('docker-toggle-close')

						}else{
							target[y].classList.add('docker-toggle-close');	
							target[y].classList.remove('docker-toggle-open')
						}
						
					}



					//Closed
					if(isClosed){
						target[y].classList.add('docker-toggle-open');	
						target[y].classList.remove('docker-toggle-close')

						//callback
						/*for(var a=0; a<target.length; a++){
							target_callback[a].classList.remove(target_callback_class)
							
						}*/
						
					}

					//Open
					if(isOpen){
						target[y].classList.add('docker-toggle-close')
						target[y].classList.remove('docker-toggle-open')

						//callback
						/*for(var a=0; a<target.length; a++){
							target_callback[a].classList.remove(target_callback_class)
							target_callback[a].classList.add(target_callback_class)
							
						}*/
						
					}
				}

				

			})

		}

	}
}