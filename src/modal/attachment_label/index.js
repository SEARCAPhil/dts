import { config as __config } from '../../config/app'
import { __ajax_attachments_post_label, __ajax_attachments_label } from '../../assets/js/details/ajax/ajax.details'

window.removeLabel = removeLabel
window.labelArray = []

function add_attachment_label (btn) {
	//show loading
	$.mobile.loading('show'); 
	btn.disabled = 'disabled'

	// consolidate
	window.labelArray.push($('.label-input').val())

	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		label:window.labelArray.join(','),
		token:__config.session.token
	}

	__ajax_attachments_post_label(data,function(e){
		var result=JSON.parse(e);

		if(result.status!=200){
			setTimeout(function(){ 
				 
				alert('Unable to add label.Please try again later.');

			},700);

		}else{
			
			// success
			$('.label-section').prepend(`
			<span class="badge label-item">${$('.label-input').val()}
				<span><i class="material-icons md-12">remove_circle</i></span>
			</span>
			`)

			// clear field
			$('.label-input').val('')
			
		}

		btn.removeAttribute('disabled')
	}, () => {
		alert('Unable to add label.Please try again later.');
		btn.removeAttribute('disabled')
	})

}

function removeLabel (e) { 
	let label = e.target.getAttribute('data-label')
	if(label && window.labelArray[label]) {
		$.mobile.loading('show'); 

		var id=($(window.modal.recentlySelected).attr('data-resources'))

		let newLabelArray = [...window.labelArray]
		newLabelArray.splice(label, 1)
		var data={
			id:id,
			label:(newLabelArray.filter((v, i, a) => a.length > 0)).join(','),
			token:__config.session.token
		}
	
		__ajax_attachments_post_label(data,function(e){
			var result=JSON.parse(e);
			$.mobile.loading('hide'); 
	
			if(result.status!=200){
				setTimeout(function(){ 
					 
					alert('Unable to add label.Please try again later.');
	
				},700);
	
			}else{
				
				// success
				window.labelArray[label] = null
				$(`.label-item-${label}`).parent().parent().fadeOut()
				// remove parent
				$(`.label-item-parent-${$(window.modal.recentlySelected).attr('data-resources')}`).parent().fadeOut()
				
			}
		}, () => {
			alert('Unable to removelabel.Please try again later.');
		})

	}
	
}

function get_labels (id) {
	var data={
		id,
		token:__config.session.token
	}
	
	window.labelArray = []

	__ajax_attachments_label(data,function(e){
		var result = JSON.parse(e);
		$('.label-section').html('')
		if(result.status!=200){

		}else{
			let labels = result.labels ? result.labels : '';
			window.labelArray = labels.split(',')

			labelArray.forEach((el, index) => {
				if(el.length > 0) {
					// success
					$('.label-section').prepend(`
					<span class="badge label-item">${el}
						<span><i class="material-icons md-12 remove-label label-item-${index}" data-label="${index}" onclick="removeLabel(event)">remove_circle</i></span>
					</span>
					`)
				} else {
					// remove empty array
					window.labelArray.splice(index, 1)
				}

			})
			
		
			
		}

		
	}, () => {
	
	})
}

setTimeout(function(){
	var id = $(window.modal.recentlySelected).attr('data-resources');
	get_labels(id);

  $('.add-label-btn').click(function(){
		add_attachment_label(this);
  })
},300);
