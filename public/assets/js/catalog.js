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
});