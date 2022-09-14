$(document).ready(function() {
  console.log("ready");
  const texting = $( "#tweet-text" )[0];
  const maxChars = 140;
  
  $(texting).on("input", function () {
    const counter = $(this).parents("form").find(".counter")[0];
    let isNegative = counter.classList.contains("negative");
    let charsRemaining = maxChars - Number(this.value.length);
    if (charsRemaining < 0) {
      $( counter ).addClass( "negative" );
    }
    if (charsRemaining >= 0 && isNegative) {
      $( counter ).removeClass( "negative" );
    }
    $(counter).val(charsRemaining);

  });

});



