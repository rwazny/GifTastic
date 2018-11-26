/////// API Giphy Key // ** cgZxOEhYRDwO2Iiyaj8yEhieXRG1xFAU


var numberOfGIFs = 10;
var cutOffRating = "PG";

function renderButtons() {
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn");
    newButton.addClass("cartoon-button");
    newButton.text(topics[i]);
    $("#button-container").append(newButton);
  }
  $(".cartoon-button").unbind("click");

  $(".cartoon-button").on("click", function() {
    $(".gif-image").unbind("click");
    $("#gif-container").empty();
    $("#gif-container").removeClass("dotted-border");
    populateGIFContainer($(this).text());
  });
}

function addButton(show) {
  if (topics.indexOf(show) === -1) {
    topics.push(show);
    $("#button-container").empty();
    renderButtons();
  }
}

function populateGIFContainer(show) {
  $.ajax({
    url:
      "https://api.giphy.com/v1/gifs/search?q=" +
      show +
      "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" +
      cutOffRating +
      "&limit=" +
      numberOfGIFs,
    method: "GET"
  }).then(function(response) {
    response.data.forEach(function(element) {
      newDiv = $("<div>");
      newDiv.addClass("individual-gif-container");
      newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
      var newImage = $(
        "<img src = '" + element.images.fixed_height_still.url + "'>"
      );
      newImage.addClass("gif-image");
      newImage.attr("state", "still");
      newImage.attr("still-data", element.images.fixed_height_still.url);
      newImage.attr("animated-data", element.images.fixed_height.url);
      newDiv.append(newImage);
      $("#gif-container").append(newDiv);
    });

    $("#gif-container").addClass("dotted-border");
    $(".gif-image").unbind("click");
    $(".gif-image").on("click", function() {
      if ($(this).attr("state") === "still") {
        $(this).attr("state", "animated");
        $(this).attr("src", $(this).attr("animated-data"));
      } else {
        $(this).attr("state", "still");
        $(this).attr("src", $(this).attr("still-data"));
      }
    });
  });
}

$(document).ready(function() {
  renderButtons();
  $("#submit").on("click", function() {
    event.preventDefault();
    addButton(
      $("#cartoon-show")
        .val()
        .trim()
    );
    $("#cartoon-show").val("");
  });
});


///////////////////////////////////////////////////////////////

function renderButtons() {
  $('#addButton').empty();
  //for loop that iterates through array and creates button
  for (var i = 0; i < topics.length; i++) {


      var button = $('<button>');
      button.addClass('topic');
      button.attr('data-name', topics[i]);
      button.text(topics[i]);
      $('#addButton').append(button);

  }
  addGif();

};

$('#addGif').on('click', function() {
  var userInput = $('#gif-input').val().trim();
  console.log($('#gif-input'));
  topics.push(userInput);
  renderButtons();
  return false;
  
  if (userInput === ' ') {
      $('#gif-input').val().trim();
  }
});

renderButtons();


function addGif() {
  $('button').on('click', function() {
      var p = $(this).data('name');
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({ url: queryURL, method: 'GET' })
          .done(function(response) {
              var results = response.data;
              console.log(response);

              for (var i = 0; i < results.length; i++) {
                  
                  var gifDiv = $('<div class="item">');
                  var rating = results[i].rating;
                  var p = $('<p>').text("Rating: " + rating);

                  var giphyImg = $('<img>');
                  giphyImg.attr('src', results[i].images.fixed_height_still.url);
                  giphyImg.attr('data-still', results[i].images.fixed_height_still.url);
                  giphyImg.attr('data-animate', results[i].images.fixed_height.url);
                  giphyImg.attr('data-state', results[i].images.fixed_height_still.url);

                  gifDiv.append(giphyImg)
                  gifDiv.append(p)

                  $('#gifsAppearHere').prepend(gifDiv);

              }

              $('.item').children('img').on('click', function() {


                  var state = $(this).attr('data-state');

                  if (state == 'still') {
                      $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                  } else {
                      $(this).attr('src', $(this).data('still'));
                      $(this).attr('data-state', 'still');
                  }
