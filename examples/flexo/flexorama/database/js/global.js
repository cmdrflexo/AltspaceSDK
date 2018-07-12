
$("input#name-submit").on("click", function() {
    var name = $("input#name").val();

    var url = "https://jcanuet.000webhostapp.com/flexo/flexorama/database/ajax/name.php";
    //"ajax/name.php"
    
    if($.trim(name) != "") {
        if($.trim(name) != "kitten") {
            $.post(url, {name: name}, function(data) {
                $("div#name-data").text(data);
            });
        } else {
            $.post(url, {kitten: name}, function(data) {
                $("div#name-data").text(data);
            });
        }
    }
});
