import { config as __config } from '../../config/app'
import { __ajax_email_search, __ajax_generate_token, __ajax_token  } from '../../assets/js/details/ajax/ajax.details'
import { getStorage } from '../../assets/js/details/functions/functions.details'

window.copyLinkToClipBoard = copyLinkToClipBoard 

function bindStorageSelection(){
	$('.storage-selector').on('click',function(){
		selected=[]
		count = 0
		$('#add_attachment_storage_button').off('click',uploadFileFromStorage)
		getStorage(1,$(this).attr('data-storage'))
		$('.storage-selector').removeClass('active')
		$(`.storage-selector[data-storage="${$(this).attr('data-storage')}"]`).addClass('active')
		$('.search-storage-section').hide()
	})
}

function moveCursor(target){
  var range = document.createRange()
  range.selectNodeContents(target)
  range.collapse(false)
  var sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
  target.focus()
}

function copyLinkToClipBoard (e, el) {
  el.select()
  document.execCommand('copy')
  el.title = 'copied'
  let clipboardStatAll = document.querySelectorAll('.clipboard-status')
  clipboardStatAll.forEach((el, index) => el.innerHTML = '')
  let clipboardStat = (el.parentNode.parentNode.querySelector('.clipboard-status'))
  clipboardStat.innerHTML = ' copied! <i class="material-icons md-12">check_circle</i>  '
}


bindStorageSelection()

  setTimeout(()=>{
    getStorage(1,'personal')
  },10)

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


    function generateToken(data,callback){

       var data={
        id:($(window.modal.recentlySelected).attr('data-resources')),
        username:data.username,
        visibility:data.visibility,
        token:__config.session.token
      }

       __ajax_generate_token(data,function(e){
            var result=JSON.parse(e);
           callback(result)
       },function(){

       })
    }


    function getToken(callback){

       var data={
        id:($(window.modal.recentlySelected).attr('data-resources')),
        token:__config.session.token
      }

       __ajax_token(data,function(e){
            var result=JSON.parse(e);
           callback(result)
       },function(){

       })
    }




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


    $('.token-visibility-option').on('change',function(){
        if(this.value!='all'){
          $('.specific-email-section').show()
        }else{
          $('.specific-email-section').hide()
        }
    })


    $('#generate-token-btn').on('click',function(e){

      e.target.setAttribute('disabled','disabled')

      //get visibility option
      var selected = 'all'
      var username = []
      document.querySelectorAll('[name="generated_link_options"]').forEach((el,index)=>{
        if(el.checked){
          selected = el.value
        }
      })
     
      //get emails
      if(selected=='selected'){
         var inputSection = document.getElementById('username-list-input')
         username = inputSection.textContent.trim().split(' ')
  
      }

      //
      generateToken({visibility:selected,username:username.join(',')},function(data){
        if(!data.id){
          alert('Sorry unable to create link, Please try again later')
          return 0
        }

      

          let htm=`
          <div class="col col-md-12" style="margin-bottom:10px;">
            <small style="padding:5px;margin-bottom:10px;">
              `
                if(selected=='all'){
                  htm+=`<span><i class="material-icons md-18" >link</i>&emsp;<input type="text" onclick="copyLinkToClipBoard(event, this)" value="${__config.endpoint.url}storage/public/?token=${data.token}" style="width:270px;"></span><span class="clipboard-status text-success"></span>&nbsp;<i class="material-icons md-12">public</i> Public&emsp;` 
                }else{
                  htm+=`<span><i class="material-icons md-18">link</i>&emsp;<input type="text" onclick="copyLinkToClipBoard(event, this)" value="${__config.endpoint.url}storage/private/?token=${data.token}" style="width:270px;"></span><span class="clipboard-status text-success"></span>&nbsp;<a href="storage_link_email.html"  data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="${data.id}"><i class="material-icons md-12">account_circle</i> Change&emsp;</a>` 
                }

              htm+=`<a href="storage_link_remove.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="${data.id}"> - remove</a>&emsp;
              <br/>
            </small> 
          </div>
          `
          document.getElementById('username-list-input').innerHTML=''

          //proceed
          document.getElementById('token-section').innerHTML+=htm
           e.target.removeAttribute('disabled')
        

      })


    })




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

    //get token
    getToken(function(data){
      //proceed
      for(var x=0; x< data.tokens.length; x++){
         let htm=`
          <div class="col col-md-12" style="margin-bottom:10px;">
            <small style="padding:5px;margin-bottom:10px;">
              `
              //public
              if(data.tokens[x].visibility == 0) { 
                htm+=`<span><i class="material-icons md-18" >link</i>&emsp;<input onclick="copyLinkToClipBoard(event, this)"  type="text" value="${__config.endpoint.url}storage/public/?token=${data.tokens[x].token}" style="width:270px;"></span><span class="clipboard-status text-success"></span>&nbsp;<i class="material-icons md-12">public</i> Public&emsp;` 
              }else{
                htm+=`<span><i class="material-icons md-18" >link</i>&emsp;<input onclick="copyLinkToClipBoard(event, this)"  type="text" value="${__config.endpoint.url}storage/private/?token=${data.tokens[x].token}" style="width:270px;"></span><span class="clipboard-status text-success"></span>&nbsp;
                <a href="storage_link_email.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="${data.tokens[x].id}"><i class="material-icons md-12">account_circle</i> Change&emsp;</a>` 
              }

              htm+=`<a href="storage_link_remove.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="${data.tokens[x].id}"> - remove</a>&emsp;
              <br/>
            </small> 
          </div>
          `
           document.getElementById('token-section').innerHTML+=htm
        }
    })