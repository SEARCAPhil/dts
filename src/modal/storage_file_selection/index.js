import { config as __config } from '../../config/app'
import { __ajax_storage, __ajax_post_storage, __ajax_search } from '../../assets/js/details/ajax/ajax.details'
/*import { getStorage, bindStorageSearch, bindStorageSelection } from '../../assets/js/details/functions/functions.details'

bindStorageSelection()
bindStorageSearch()
setTimeout(()=>{
  getStorage(1,'personal')
},10)*/

let selected = []
let count = 0
let timeout = {}

window.showMoreFilesFromPersonalStorage = showMoreFilesFromPersonalStorage

function selectStorageFile(){

  var id = this.getAttribute('data-resources')

  if(this.checked){
    selected[id] = id
    count++
  }else{
     selected.splice(selected.indexOf(id),1)
     count--
  }


  if(count<1){
    $('.selected-count').html('')
    $('.selected-count').parent().attr('disabled','disabled')
    return 0
  }

  $('.selected-count').parent().removeAttr('disabled')

  $('.selected-count').html(`(${count} selected)`)
}


function bindStorageFileSelection(){
  //file selection
  $('.storage-file-selection-checkbox').off('change',selectStorageFile)
  $('.storage-file-selection-checkbox').on('change',selectStorageFile)
}


function getStorageList(data,callback){

  __ajax_storage(data,function(e){
    var data=JSON.parse(e);
    callback(data)
  },function(){
    //$('#activities').html('<center class="text-muted"><h3>Empty Notes</h3></center>')
  });

}

function getStorage(page=1,storage='personal'){

  var target

  //target
 if(storage=='personal'){

    target = $('.personal-storage-section')
    $('.shared-storage-section').hide()
 }else{
   target = $('.shared-storage-section')
   $('.personal-storage-section').hide()
 }

  getStorageList({storage:storage,token:__config.session.token,page:page},function(data){

   //clear al on first load
   if(page==1){
     //reset
     selected=[]
     count=0

     $(target).html('')
     $(target).show()

     $('.selected-count').html('')
     $('.selected-count').parent().attr('disabled','disabled')


     if(!data.files||data.files.length<1){
       $(target).html('<center style="border-left:1px solid #ccc;" class="text-muted"><i class="material-icons md-36">desktop_mac</i><h3>Empty Storage</h3></center>')	
     }
   }

    for(var x=0;x<data.files.length;x++){

      $(target).append(`
         <span class="form-group">
                   <span class="checkbox">
                     <label style="color:rgb(100,100,100);">
                       <input type="checkbox" data-resources="${data.files[x].id}" class="storage-file-selection-checkbox"><span class="checkbox-material"><span class="check"></span></span>
                       &emsp;<div class="file-icon file-icon-xs" data-type="${data.files[x].type}"></div> 
                        <small>${data.files[x].original_filename} (${(data.files[x].size/1000)}kb) <span class="badge">${data.files[x].name}</span></small>
                     </label>
                   </span>
                 </span>
                   <hr/>
      `)

      //next page
      if(x==19){
        $(target).append(`<div class="text-center" onclick="showMoreFilesFromPersonalStorage(event,this,${page},'${storage}')"><a href="#">Show more<br/><i class="material-icons">expand_more</i></a></div>`)
      }
    }

    //allow option selection
    bindStorageFileSelection()

    $('#add_attachment_storage_button').on('click',uploadFileFromStorage)
    
  })

}


function append_attachment(fullName,parent,id,fileName,fileTypeIcon,fileType,size){

  //show in uploaded section
  $('.attachment-section').prepend(`<div class="col col-md-12 attachments">
          <div class="attachments-menu-section dropdown" id="attachment-menu-`+parent+`"></div>
          <!--media-->
          <div class="media">
            <div class="media-left">
              <a href="#">
                <div class="file-icon file-icon-default" data-type="`+fileType+`"></div>
              </a>
            </div>
            <div class="media-body">
              <p><b>`+fileName+`</b></p>
              <!--<p><b>`+fullName+`</b></p>
              <small>
                <p></p>
              <p>`+__config.session.position+`<i class="material-icons text-muted visible-closed" style="font-size: 18px; display: none;">lock</i></p>
            </small>-->
            <div class="row col-md-12">
              <span class="tags tags-`+parent+`" style="background:rgb(200,200,200);height:auto;" data-resources="`+id+`" onclick="download(this);">
            
                 <span><i class="material-icons" style="font-size:18px;">file_download</i></span>
                 <span class="category tags-`+parent+`" data-resources="`+id+`" >Uncategorized</span>
               </span>
             </div>
            
            <div class="col col-md-12 row">
              <br/>	
              <details>
                <summary>More Details</summary>
                <div class="col col-md-12 content-more-details">
                  <small>
                    <div class="col col-md-12">
                      <p><b>Author :</b> `+fullName+`</p>
                        <p class="text-danger"><b>File Name :</b>`+fileName+` <span class="file-icon file-icon-xs" data-type="`+fileTypeIcon+`"></span></p>
                        <p><b>File Type :</b> <b>`+fileType+`</b></p>
                        <p><b>Size :</b> <b>`+size+` KiB</b></p>
                    </div>
                      
                    </small>
                </div>	
              </details>
            </div>
            </div>
          </div>

        </div>`)
}

function append_attachment_menu(id,category,parent){

var htm=`<a href="#" class="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
      <i class="material-icons" style="font-size:18px;">keyboard_arrow_down</i>
    </a>
    <ul class="list-unstyled dropdown-menu pull-right">
      <li data-resources="`+id+`" data-toggle="modal" data-target="#myModal" class="visible-open">
        <a href="remove_attachment.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`">
          <i class="material-icons">remove_circle</i> <span>Remove</span>
        </a>
      </li>
      <li data-resources="`+id+`" class="visible-open" data-toggle="modal" data-target="#myModal">
        <a href="attachment_category.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`" data-category="`+category+`"><i class="material-icons" style="font-size:18px;">edit</i><span>Category</span></a>
      </li>
      <li data-resources="`+id+`" data-toggle="modal" data-target="#myModal">
        <a href="update_attachment_status.html" data-target="#myModal" data-role="none" onclick="modal_ajax(event,this)" data-resources="`+id+`"><i class="material-icons" style="font-size:18px;">lock</i><span>Close Attachment</span>
      </li>
    </ul>`
  $('#attachment-menu-'+parent).html(htm);
}


function uploadFileFromStorage(){

	var files = selected
	var fullName = __config.session.fullName.length<=0?__config.session.firstName+' '+__config.session.lastName:__config.session.fullName

	//clean files
	var filesToUpload = []
	for(var f in files){
		if(f!='null') filesToUpload.push(f)
	}
	 __ajax_post_storage({storage:'personal',token:__config.session.token,basket_id:window.sdft.active,ids:JSON.stringify(filesToUpload)},function(e){

	 	var data=JSON.parse(e);

	 	for(var x=0;x<data.files.length;x++){
	 		//show attachment
			var parent = new Date().getTime();
			//append attachment
			append_attachment(fullName,parent,data.files[x].id,data.files[x].filename,data.files[x].type,data.files[x].type,data.files[x].size)
			//append to menu section
			append_attachment_menu(data.files[x].id,'Uncategorized',parent)
			//send notification to socket
			try{ push_upload_notification({basket_id:window.sdft.active,file_id:data.files[x].id,message:'create',details:window.sdft.details}); }catch(e){}
	 	}

	 },function(){
	 	alert('Unable to upload file required. Pleas try again later')
	 });
}

function bindStorageSelection(){
	$('.storage-selector').on('click',function(){
		selected = []
		count = 0
		$('#add_attachment_storage_button').off('click',uploadFileFromStorage)
		getStorage(1,$(this).attr('data-storage'))
		$('.storage-selector').removeClass('active')
		$(`.storage-selector[data-storage="${$(this).attr('data-storage')}"]`).addClass('active')
		$('.search-storage-section').hide()
	})
}

function bindStorageSearch(){
	

	$('.storage-search-input').on('keyup',function(){

		if($(this).val().length<3) return 0

			var value = $(this).val()

			$('.personal-storage-section').hide()
			$('.shared-storage-section').hide()
			$('.search-storage-section').show()

			clearTimeout(timeout)
			timeout=setTimeout(function(){
				
				//clear
				$('.search-storage-section').html('')

				//search
				__ajax_search({param:value,token:__config.session.token},function(e){
					var data=JSON.parse(e);
					var htm=''
					//show results
					for(var x=0;x<data.files.length;x++){

				 		htm +=(`
				 			 <span class="form-group">
			                    <span class="checkbox">
			                      <label style="color:rgb(100,100,100);">
			                        <input type="checkbox" data-resources="${data.files[x].id}" class="storage-file-selection-checkbox"><span class="checkbox-material"><span class="check"></span></span>
			                        &emsp;<div class="file-icon file-icon-xs" data-type="${data.files[x].type}"></div> 
			                         <small>${data.files[x].original_filename} (${(data.files[x].size/1000)}kb) <span class="badge">${data.files[x].name}</span></small>
			                      </label>
			                    </span>
			                  </span>
			                    <hr/>
				 		`)
				 	}

				 	if(!data.files||data.files.length<1){
						htm=('<center style="border-left:1px solid #ccc;" class="text-muted"><p><i class="material-icons md-36">search</i> Not found in storage</p></center>')	
					}

					 	$('.search-storage-section').html(htm)

					 	bindStorageFileSelection()

					 	$('#add_attachment_storage_button').off('click',uploadFileFromStorage)

					 	$('#add_attachment_storage_button').on('click',uploadFileFromStorage)

				},function(){

				})	

			},1000)		
	})
}

function showMoreFilesFromPersonalStorage(e,el,page,storage){
	getStorage(page+1,storage)
	el.remove()

}




bindStorageSelection()
bindStorageSearch()
setTimeout(()=>{
  getStorage(1,'personal')
},10)