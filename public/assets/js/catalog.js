$(document).ready(function(){
    $("#cat-list li a").on("click", function(event){
        event.preventDefault();
        console.log(this.id);
        $.post("/catalog", {
            id: this.id
        }
        ).then(function () {
            location.reload();
          });
    });
    $("#imageframe a").on("click", function(event){
        event.preventDefault();
        $.post("/searchoutfit",{
            outfit_name: $(this).find("img").attr("alt"),
        }).then(()=>{
            window.location.replace("/buildoutfit");
            console.log("HEy--------------------------------------------<>---");
          }).catch(function(err){
              console.log(err);
             });
        // $.ajax("/addoutfit", {
        //     type: "POST",
        //     data: $(this).find("img").attr("alt"),
        //   }).then(function () {
        //     console.log("HEy");
        //     window.location.replace("/buildoutfit");
        //   });
    });
});

