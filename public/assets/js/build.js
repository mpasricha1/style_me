$(document).ready(function () {
  // Getting references to our form and inputs
  const outfitForm = $("#saveOutfitBtn");
  const searchForm = $("#searchOutfit");
  var category = $("#catalog-input");
  var search = $("#search-input");
  var catalog = "";

  var search_input = $("#search-input");

  searchForm.on("submit", function (event) {
    event.preventDefault();
    console.log(search.val());
    $.post("/searchoutfit", { outfit_name: search.val() }).then(() => {
      location.reload();
    });
  });

  $("#menu li a").on("click", function (event) {
    event.preventDefault();
    console.log(this.id);
    $.post("/buildoutfit", { cat_id: this.id }).then(() => {
      location.reload();
    });
  });

  $("#catalogs li a").on("click", function (event) {
    event.preventDefault();
    console.log(this.id);
    catalog = this.id;
  });
  
  $("#imageframe a").on("click", function (event) {
    event.preventDefault();

    const item = {
      id: this.id,
      img: $(this).find("img").attr("src"),
      name: $(this).find("img").attr("alt"),
    };

    $.post("/staging", { item: item }).then(() => {
      location.reload();
    });
  });

// jQuery sending back catalog id, and outfit name
  outfitForm.on("click", function (event) {
    event.preventDefault();
    console.log(catalog);
    let outfitData = {
      id: catalog,
      outfit_name: $("#outfit-input").val().trim(),
    };

    console.log(outfitData);
    // Sending data to insertoutfit route
    $.ajax("/addoutfit", {
      type: "POST",
      data: outfitData,
    }).then(function () {
      location.reload();
    });
  });

  $(".deleteBtn").on("click", function(event) {
    event.preventDefault();
    $.post("/deleteoutfititem", { item_id: this.id }).then(() => {
      location.reload();
    });
  })

});
