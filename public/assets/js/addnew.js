let image;
let thumbnail;

// Cloudinary widget
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dnx8v0ryu",
    uploadPreset: "qvqp5qcx",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);

      document.getElementById("img").setAttribute("src", result.info.url);
      image = result.info.url;
      thumbnail = result.info.thumbnail_url;
      //   console.log("My image = ", image);
      //   console.log("Thumbnail_url", thumbnail);
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

// Post data (image, thumbnail, item_name, category_name) to addnew route
$("#addToCollection_Btn").on("click", function (event) {
  event.preventDefault();
  console.log(image);

  let itemData = {
    image: image,
    thumbnail: thumbnail,
    item_name: $("#item_name").val().trim(),
    category_name: $("#category_name").val().trim(),
  };

  console.log(itemData);

  $.ajax("/addnew", {
    type: "POST",
    data: itemData,
  }).then(function () {
    location.reload();
  });
});
