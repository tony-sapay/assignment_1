$(document).ready(function(){

var APIKEY = "119b05b3fd20ccf012a95e11333a751d";  // "API KEY" - Tony Sapay

// it's need me to next/previous option
var ph_array_id = [];  // collects id of photos
var ph_array_src = []; // collects src of photos

$('#search_button, #search_button2').click(function(){   // onclick action for search buttons

var search_tag = "";   // I have 2 search textfields
if($(this).attr("id") == "search_button"){  // choose textfields according to which button is pressed
  search_tag = $("#search_text").val();
}else var search_tag = $("#search_text2").val();

// handling enpmty box
if (search_tag == ""){
    return;
}

	// i wrote url manually by adding search_tag in it
var img_src = '';
var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+APIKEY+"&tags="+search_tag+"&safe_search=1&per_page=20";

// get JSON data from given url. This retrieves Json object
$.getJSON(url + "&format=json&jsoncallback=?", function(data){
  if(data.photos == undefined){
    if(data.message == undefined){
      alert("no response !");
      return;
    }
    alert(data.message);
    return;
  }
    $.each(data.photos.photo, function(i,item){
  
  

 // by for each I take all objects inside photo.photo and assign them to my variables
var farmId = item.farm;
var serverId = item.server;
var id = item.id;
var secret = item.secret;

ph_array_id[i] = id;  // collect id with position


// phto source with smaller image
var photo_src = '"https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_q.jpg"';

// add photo source to the array by omitting quotes
 ph_array_src[i] = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';


 // take all photo sources and collect them in one String
 // I gave photo Id to image id in order to call them later
 // I also gave data-array attribute in order to store its position
 img_src= img_src + '<div class="gallery"><img src='+photo_src+' id="'+id+'" data-array="'+i+'" /> </div>';
		});
   $("#flickr").html(img_src);   // display in #flickr div
	});

});

	// Onclick action for pressing images on flickr div
$('#flickr').on('click','img',function(){
 // retrieving photo position
  var arrayId = $(this).attr("data-array");

  //console.log(arrayId);

// display image by knowing its postion
  display_img(arrayId);


// if clicks next button increase position by one and display
 $('#show-next-image').click(function(){
       if(arrayId != 19){ // we have 20 photo and 19 is last one
        arrayId++;
       display_img(arrayId);
     }

  });

// if clicks previous button decrease position by one and display
  $('#show-previous-image').click(function(){
        if(arrayId != 0){
         arrayId--;
        display_img(arrayId);
      }
   });




});

function display_img(ar_id){

  var info_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+APIKEY+"&photo_id="+ph_array_id[ar_id];
  var owner;
	var title ;
	var country;
	var region ;

	// getting Json file from given URL
     $.getJSON(info_url + "&format=json&jsoncallback=?", function(data){

    if(data.photo == undefined){
        if(data.message == undefined){
          alert("no response !");
          return;
        }
      alert(data.message);
      return;
     }

      if( data.photo.owner.realname != undefined)
     	owner =  data.photo.owner.realname ;
       else owner = "no info";
 	  if(data.photo.title._content != undefined)
     	title = data.photo.title._content;
       else title = "no info";
      if(data.photo.location != undefined)  // if given json object not defined assign default value
         country = data.photo.location.country._content;
       else country = "no info"
      if(data.photo.location != undefined)
     	region = data.photo.location.region._content;
       else region = "no info";
      

	$("#owner").text(owner); // changing values on modal elements
 	$('#title').text(title);
	$('#country').text(country);
	$('#region').text(region);

		});

  console.log(ph_array_src[ar_id]);
    $('.imagepreview').attr('src', ph_array_src[ar_id]); // open image in modal frame by retrieving stored source
	$('#imagemodal').modal('show'); // show modal
}


});
