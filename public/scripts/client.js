/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  // Fake data taken from initial-tweets.json


  const createTweetElement  = function (tweet) {
    // remember to move br down after implementing deconstructing and reconstructing the tweets after each submission
    // make jQuery construct new elements
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
          <p>${tweet.content.text}</p>
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
  }

  const renderTweets = function(tweets) {
    // cycle through each tweet and append it into the tweets container
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
    })
      .then(function(data) {
        renderTweets(data);
      });
  } 

  $("form").on("submit", function( event ) {
    event.preventDefault();
    const maxChars = 140;
    const $tweetText = $(this).find("textarea")
    const $counter = $(this).find(".counter");
    // every $(this).serialize returns at least 'text='
    const serializedData = $(this).serialize();
    // slice used to get rid of 'text='
    const errorCheck = $(this).serialize().slice(5).length;
    if (!errorCheck) {
      alert ("You need to type something in before submitting the tweet!");
    } else if (errorCheck > maxChars) {
      alert ("Your tweet is too long!");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serializedData,
      })
        .then(function () {
          loadTweets();
        });
      $tweetText.val(""); 
      $counter.val("140");
      
    }
    
  });
  loadTweets();

});
