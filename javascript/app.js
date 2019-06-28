$(document).ready(function () {
    var listBrand = ['pizza', 'cheese', 'apple', 'bananas', 'grapes'];
    //the array
    for (let i = 0; i < listBrand.length; i++) {
        const btn = $("<button>");
        btn.text(listBrand[i]);
        btn.addClass('button');
        btn.attr('data-name', listBrand[i]);
        $("#buttons").append(btn);
    }

    $('.button').on('click', function () {
        const gifn = $(this).attr("data-name");
        const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifn + "&api_key=antuxNXO4jMAHFRi9x1f0ecsFyDgCPjS&limit=10";
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                let newdiv = $("<div id='gifdiv'>")
                $('#gifs').prepend(newdiv);
                let rating = response.data[i].rating;
                console.log(rating);
                let ratingP = $('<p>').text('Rated: ' + rating);
                $('#gifdiv').prepend(ratingP);

                let img = response.data[i].images.original.url;
                const still = response.data[i].images.original_still.url;
                const gif = $("<img>")
                gif.attr("src", still);
                gif.attr('data-still', still);
                gif.attr('data-animate', img);
                gif.attr('data-state', 'still');
                gif.addClass('gif')
                gif.width = '200px';
                gif.height = '150px';
                $('#gifdiv').prepend(gif);
            }
        });
    })
$('#submit').on('click', function(){
    event.preventDefault();
   const userimput = $('#box').value;
   listBrand.push(userimput);
})

    $(".gif").on("click", function () {
        console.log('click');
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        const state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
});
});