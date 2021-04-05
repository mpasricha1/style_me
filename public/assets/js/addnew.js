let image;
let thumbnail;
let id;

// Cloudinary widget
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dnx8v0ryu",
    uploadPreset: "qvqp5qcx", 
    apiKey: "712657743481962"
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);

      document.getElementById("img").setAttribute("src", result.info.url);
      image = result.info.url;
      thumbnail = result.info.thumbnail_url;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

// When clicked on a category from the dropdown list, the id of that category
// will be saved into variable named id.
$("#category_name").on("change", function () {
  id = this.options[this.selectedIndex].id;
  //console.log(id);
});

// Post data (image, thumbnail, item_name, category_name) to addnew route
$("#addToCollection_Btn").on("click", function (event) {
  event.preventDefault();
  console.log(image);

  let itemData = {
    id: id,
    item_name: $("#item_name").val().trim(),
    image: image,
    thumbnail: thumbnail
  };

  console.log(itemData);

  $.ajax("/addnew", {
    type: "POST",
    data: itemData,
  }).then(function () {
    location.reload();
  });
});
