$(document).ready(function () {

    var shows = ["The Office", "It's Always Sunny in Philadelphia", "Parks and Rec", "Archer", "Eastbound and Down", "King of the Hill"]

    function displayShowGif() {
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            show + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=15";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var showImage = $("<img>");
                showImage.attr("src", results[i].images.fixed_height_still.url)
                    .attr("src", results[i].images.fixed_height_still.url)
                    .attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', "still")
                    .addClass("showImage");

                gifDiv.prepend(p);
                gifDiv.prepend(showImage);

                $("#gifArea").prepend(gifDiv);


            };

        });
    };
    //create a function to render buttons using array items
    function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#gifButton").empty();

        // Looping through the array of movies
        for (var i = 0; i < shows.length; i++) {

            // Then dynamically generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("show");
            // Adding a data-attribute
            a.attr("data-name", shows[i]);
            // Providing the initial button text
            a.text(shows[i]);
            // Adding the button to the buttons-view div
            $("#gifButton").append(a);
        };
    };

    $("#submit-button").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newShow = $("#new-input").val().trim();

        // Adding the movie from the textbox to our array
        shows.push(newShow);
        console.log(shows);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    $(document).on("click", ".show", displayShowGif);
    renderButtons();

    $(document).on("click", ".showImage", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));

            $(this).attr("data-state", 'animate');
        }

        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", 'still');
        }

    });
});
