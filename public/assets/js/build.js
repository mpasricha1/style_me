$(document).ready(function() {
    // Getting references to our form and inputs
    const outfitForm = $("#addOutfit");
    const passwordInput = $("#outfit-input");
    var category = $("#catalog-input");
    var outfit_name = $("#outfit-input")  ;
    

    $("#menu li a").on("click", function(event){
      event.preventDefault();
      console.log(this.id)
      $.post("/buildoutfit", {cat_id: this.id }
        ).then( () =>{
         location.reload();
        })
      
    });

    $("#catalogs li a").on("click", function(event){
      event.preventDefault();
      console.log(this.id)
      category = this.id;
    });


     $("#imageframe a").on("click", function(event){
      event.preventDefault();
      
      const item = {
        id: this.id,
        img: $(this).find("img").attr("src"),
        name: $(this).find("img").attr("alt")
      }; 

      $.post("/staging", {item: item}
        ).then( () =>{
          location.reload();
      });
    });
});
