### philiker - assignment_1
##### First task for Junior Backend developer (Tony Sapay)


__Used technologies:__<br> 

 Javascript <br>
 JQuery <br>
 Bootstrap <br>
 JSON, AJAX <br>
 HTML, CSS <br>


__DESCRIPTION:__  <br>

  Simple Single Page Application for searching photos using Flickr API. User enters tags for searching photos and photos related to this tag would display. And If user clicks photo, it displays full imaga and detailed info about the image. <br>
  After open an image you could press next/previous buttons to display next/previous photos and information about the photo.
  
__FEATURES/PROBLEMS__ <br>

* API for image information: flickr.photos.getInfo <br>
   https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key={KEY}&photo_id={ID} <br>
   --  This return JSON data which is including data about {owner, title, country, region}. But some data may not be included in JSON data. Application can handdle this by checking for existence and display all retrieved info about the photo. <br>
 * I made 2 array to store info about the photo according to its position. One for collecting ID, second one for src of the photo. And I added array position to the img attribute `data-array` in order to retrieve it later. <br> 
  




