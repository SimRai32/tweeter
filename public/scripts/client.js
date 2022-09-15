/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  const $hideError = $(".error");
  $hideError.hide();

  // function detects and alters malicious text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function determines what error message to display
  const errorMessage = (error) => {
    if (error === 0) {
      return "Can't post tweet if you haven't typed anything";
    }
    return "Tweet too long";
  };

  // function makes jQuery construct new elements
  const createTweetElement  = function (tweet) {
    const time = timeago.format(tweet.created_at);
    let $tweet = $(`
      <article>
        <header>
          <div class= "tweetTopLeft">
            <img src="${tweet.user.avatars}">
            <h6 class="name">${tweet.user.name}</h6>
          </div>
          <p class="username">${tweet.user.handle}</p>
        </header>
        <div class="content">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <footer>
        <p>${time}</p>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
        </footer>
    </article>
    <br>
    `);
    return $tweet;
  };

  // function cycles through each tweet and append it into the tweets container
  const renderTweets = function(tweets) { 
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  // function loads tweets on to the page
  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
    })
      .then(function(data) {
        renderTweets(data);
      });
  };

  // submits new tweet to be added to list of tweets
  $("form").on("submit", function( event ) {
    event.preventDefault();
    const maxChars = 140;
    const $tweetText = $(this).find("textarea")
    const postError = $(this).parents(".new-tweet").find(".error")[0];
    const $counter = $(this).find(".counter");   
    const serializedData = $(this).serialize();  // slice used to get rid of 'text='
    const errorCheck = $(this).serialize().slice(5).length;
    let errMessage = errorMessage(errorCheck);
    const $textToReplace = $( postError ).find("h4");


    if ($( postError ).is(":visible")) {
      $( postError ).slideUp("fast");
    }

    if (!errorCheck || errorCheck > maxChars) {
      // SetTimeout used to allow slideUp to execute before text is changed
      setTimeout(() => {
        $textToReplace.text(errMessage);
      $( postError ).slideDown("fast");
      }, 200);

    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serializedData,
      })
        .then(function () {
          loadTweets();
        });
      //resets the compose tweet section
      $tweetText.val(""); 
      $counter.val("140");
    }
    
  });
  loadTweets();

});
