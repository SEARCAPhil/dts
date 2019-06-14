import { clearLoadTopMenu } from '../../assets/js/details/functions/functions.details'
$(document).ready(function () {
  $('#new').on('click',function(){
		//loading
		$.mobile.loading('show'); 

		$('.container-main').hide();
		$('.container-ajax').show();



		$('.container-ajax').load('basket.html',function(){
			//clear menu
			clearLoadTopMenu()
			//hide loading
			$.mobile.loading('hide'); 	
		})

	})
})
