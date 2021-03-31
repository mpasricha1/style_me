var catalogID = "";

$(document).ready(function () {
  // Getting references to our form and inputs
  const outfitForm = $("#addOutfit");
  const category = $("#catalog-input");
  const passwordInput = $("#outfit-input");

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
    catalogId = this.id;
  });

  outfitForm.on("submit", function (event) {
    let outfit = {
      name: $("#outfit-input").val(),
      catalogID: catalogID,
      items: itemsIDs,
    };

    console.log("This is the outfit", outfit);
    // Sending data to addoutfit route
    $.post("/addoutift", {outfit: outfit}).then(() => {
      location.reload();
    })
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

  outfitForm.on("submit", function (event) {
    event.preventDefault();

    let outfitData = {
      id: $(".dropdown-item").id,
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
});
