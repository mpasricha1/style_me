$.getScript("https://widget.cloudinary.com/v2.0/global/all.js");
$.document.ready(function (){
  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dnx8v0ryu', 
    uploadPreset: 'qvqp5qcx'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  
})

