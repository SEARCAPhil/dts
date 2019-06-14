import { config as __config } from '../../config/app'
import { __ajax_attachments_link_get_email, __ajax_attachments_link_update_email, __ajax_email_search  } from '../../assets/js/details/ajax/ajax.details'


function moveCursor(target){

  var range = document.createRange()
  range.selectNodeContents(target)
  range.collapse(false)
  var sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
  target.focus()
}


function get_attachment_link_email(){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		token:__config.session.token
	}
	__ajax_attachments_link_get_email(data,function(e){
		var result=JSON.parse(e);
		var email = []
		if(result.tokens){
			email = result.tokens[0].email.trim().split(',')

			email.forEach((val,index)=>{
				val.trim().replace('&nbsp;','')
				$('#username-list-input').append(`<span class="badge badge-sm badge-default">${val}</span> &nbsp;`)
			})
		}
	})
}


function update_attachment_link_email(email,btn){
	
	var id=($(window.modal.recentlySelected).attr('data-resources'))
	var data={
		id:id,
		token:__config.session.token,
		email:email
	}
	__ajax_attachments_link_update_email(data,function(e){
		var result=JSON.parse(e);

		if(result.data==1){
			setTimeout(function(){ 
		 		$('#myModal > div.modal-dialog >div.modal-content').html('<center style="padding:10px;"><h4 class="text-success"><i class="material-icons md-24">check</i> Updated successfully!</h4></center>')	
		 		$('#myModal').modal('show');
		 	},1000);

		 	setTimeout(function(){ 
		 		$('#myModal').modal('hide');
		 	},3000);
		 }else{
		 	alert('Sorry!Unable to handle request.Please try again later.');
		 }

		 $(btn).removeAttr('disabled')
	})
}


get_attachment_link_email()

  //var
var valArray=[];
var timeout;

$('.username-list-input').on('keyup',function(e){

    var newEl='';
  var val = $(this)[0].textContent   
  valArray = val.split(' ')




    valArray.forEach((value,index)=>{
        
        newEl+= `<span class="badge badge-sm badge-default">${value.trim()}</span> &nbsp;`

        //hint
        if(valArray.length==index+1&&e.keyCode!=8&&e.keyCode!=32){
        clearTimeout(timeout)
        //search email
        timeout = setTimeout(function(){
          searchEmail(value,function(){
              value.length<1?$('.email-suggestion-section').hide():$('.email-suggestion-section').show()
          })
          
        },500)
        
        }
        //space bar
        if(e.keyCode==32&&val.length>0){
            $(this).html(newEl)
              moveCursor($(this)[0])
              $('.email-suggestion-section').hide()
        }
    })
  
})



//suggestio clcking
function appendUsernameSuggestionToInput(e){
  var username = e.target.getAttribute('data-username')

  if(username.length>0){
    var inputSection = document.getElementById('username-list-input')

    //removed last typed
    var txt = inputSection.textContent
    var txtArray = []
    var newEl=''

    txtArray = txt.split(' ')

    txtArray.pop()

    txtArray.forEach((value,index)=>{
      
      newEl+= `<span class="badge badge-sm badge-default">${value.trim()}</span> &nbsp;`

    })

    newEl+= `<span class="badge badge-sm badge-default">${username}</span> &nbsp;`
      inputSection.innerHTML=newEl
    
      moveCursor(inputSection)
      $('.email-suggestion-section').hide()

    
  }
}



//searching
function searchEmail(email,callback){
  var data={
    email:email,
    token:__config.session.token
  }
  var emailSugg = document.getElementById('email-suggestion-ul')
  emailSugg.innerHTML = ''

    __ajax_email_search(data,function(e){

      var result=JSON.parse(e);
      if(!result.email) return 0

      for(var x=0;x<result.email.length;x++){
        var li = document.createElement('li')
        li.innerHTML=`<a href="#" data-username="${result.email[x].username}"><b data-username="${result.email[x].username}">${result.email[x].username}</b> (${result.email[x].profile_name})</a>`
        li.addEventListener('click',appendUsernameSuggestionToInput)
        emailSugg.append(li)
      }
        
      if(result.email.length>0) callback(result)

    },function(){

    });
}


$('#update_attachment_token_email_button').on('click',function(){
    $(this).attr('disabled','disabled')
    var email = []
    var emailInput = $('#username-list-input')[0].textContent

    emailInput.split(' ').forEach((val,index)=>{
      var txt = val.trim().replace('&nbsp','')
      if(txt.length>0) email.push(txt)
    })

    

    update_attachment_link_email(email.join(','),this)
})
