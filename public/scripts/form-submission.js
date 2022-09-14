$(document).ready(function() {
  console.log("ready");
  $("form").on("submit", function( event ) {
    event.preventDefault();
    console.log(this);
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post("/tweets", serializedData, function (data) {
      console.log("DATA", data);
    })
  });

});