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
    $(".imageframe2").on("click", function(event){
        event.preventDefault();
        console.log(this.name);
        $.post("/searchoutfit", {
            outfit_name: $(this).find("img").attr("alt")
        }).then(function () {
            console.log("HEy");
            window.location.replace("/buildoutfit");
          }).catch(function(err){
              console.log(err);
        });
    });
});

