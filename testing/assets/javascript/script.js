"use script";
$(document).ready(function() {
  //Creating variable and arrays
  let i,
    l,
    button = "",
    toDoCount = 0;
  let topics = ["Pop Rock", "Classic Rock", "Country", "Hard Rock"];
  let loopCounter = sessionStorage.getItem("count");
  console.log(loopCounter);
  // Created a get session storage to loop through the stored animals added by the user
  for (l = 0; l <= loopCounter; l++) {
    if (loopCounter != null) {
      topics.push(sessionStorage.getItem("topic-" + l));
      console.log(topics);
    }
  }

  renderButtons();

  // creating a function that creates buttons using the elements inside the array
  function renderButtons() {
    $("#genrebuttons").empty();
    $("#genre-input").val("");
    // topics.push(sessionStorage.getItem("topic"));
    for (i in topics) {
      button = `<button type="button" class="genreButtons col-md-1 col-sm-2 col-xs-3 btn btn-primary" value= "${
        topics[i]
      }" >${topics[i]}</button>`;
      $("#genrebuttons").append(button);
    }
    //  $("#genrebuttons").append(button);
  }

  console.log($("#genre-input").val());

  // Add a click event listener on the submit button created

  $("#addGenre").on("click", function(event) {
    event.preventDefault();
    let topic = $("#genre-input")
      .val()
      .trim();
    // // Setting a storage session for every genre added
    // sessionStorage.setItem("topic", topic);
    //Store in client
    if (topic !== "") {
      sessionStorage.setItem("topic-" + toDoCount, topic);
      // Add a tracker to client
      sessionStorage.setItem("count", toDoCount);
      toDoCount++;
      // console.log(topic);
      topics.push(topic);
      renderButtons();
    }
  });

  // Add a click event listener on the images to make a ajax call from the API
  $(document).on("click", ".genreButtons", function() {
    $("#genre").empty();
    let genreName = $(this).val();
    console.log(genreName);

    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      genreName +
      "&api_key=cgZxOEhYRDwO2Iiyaj8yEhieXRG1xFAU&limit=10";
    let j,
      images = "";
    let x = "480w_still";
    $.ajax({
      url: queryURL,

      method: "GET"
    }).then(function(response) {
      // console.log(response.data[0].images.downsized.url);
      for (j in response.data) {
        console.log(response.data[j].images[x].url);
        //.images.downsized.url
        images = `<div class="panel panel-primary col-md-4 col-sm-4 col-xs-6">
                                <img class="staticImage img-circle col-md-12 " data-name="${j}" src="${
          response.data[j].images[x].url
        }" alt="${genreName}" width="250px" height="250px">
                                <h3 class="col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3"><span class="label label-primary">${
                                  response.data[j].rating
                                }</span></h3>
                                <a class="button col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3" href="${
                                  response.data[j].images[x].url
                                }" download="${genreName}.jpg"><span class="glyphicon glyphicon-download-alt"></span></a>
                            </div>`;
        console.log(animalName);
        $("#genre").append(images);
      }

      //  $(".staticImage").attr("src", response.data[0].images.downsized.url) ;

      // Add a class to make an image animated whenever its clicked

      $(document).on("click", ".staticImage", function() {
        let dataNumber = $(this).attr("data-name");
        // console.log(response.data[9].images.downsized.url)
        $(this).attr("src", response.data[dataNumber].images.downsized.url);
        $(this).removeClass("staticImage");
        $(this).addClass("animatedImage");
      });

      // Add a class to make an image static whenever its clicked
      $(document).on("click", ".animatedImage", function() {
        let dataNumber = $(this).attr("data-name");
        $(this).attr("src", response.data[dataNumber].images[x].url);
        $(this).removeClass("animatedImage");
        $(this).addClass("staticImage");
      });
    });
  });
});
