
import { config as __config } from '../../config/app'
import { publish_basket } from '../publish/index.js'

$('#update_attachment_button').click(function(){
	publish_basket('draft');
})