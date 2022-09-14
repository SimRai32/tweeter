/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  console.log( "ready!" );
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement  = function (tweet) {
    // remember to move br down after implementing deconstructing and reconstructing the tweets after each submission
    // make jQuery construct new elements
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
        <p>${tweet.created_at}</p>
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
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }

renderTweets(data);

});