import { config as __config } from '../../config/app'
import  { getParentCategories, attachEventToBasketButton } from '../../assets/js/basket/functions/functions.categories'

function basket_form_init(){
  getParentCategories();
  attachEventToBasketButton()
  $('.author-name').html(__config.session.firstName+' '+__config.session.lastName)
  $('.department').html(__config.session.department)
  $('.position').html('<span class="text-muted">'+__config.session.position.substr(0,1).toUpperCase()+''+__config.session.position.substr(1)+'</span>')
}


if(window.sdft.deviceInstance=='desktop'){
  $(document).ready(function(){
    basket_form_init()
  })
}else{
  basket_form_init();	
}

window.addEventListener('deviceready',basket_form_init,false)
