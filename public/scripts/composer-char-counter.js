$(document).ready(function() {
  console.log("ready");
  const texting = $( "#tweet-text" );
  console.log(texting);
$( texting ).on("input", function () {
  console.log(this.value);
  
});

});



