$(document).ready(function() {
    var films = getFilms();

    $('#recButton').click(function(event) {
        var movieId = $('#movieSel').val();
        getRecommendation(movieId);
    })

    $('#createButton').click(function(event) {
        var title = $('#titleIn').val();
        var director = $('#directorIn').val();

        createMovie(title, director);
    })

});


function createMovie(title, director) {
    var payload = {'title': title, 'director': director};
    $.ajax({
            type: "POST",
            url: "http://localhost:8081/api/movie",
            data: JSON.stringify(payload),
            success: function() {
                $("#success").show().delay(5000).fadeOut();
            },
            contentType: "application/json"
        });
}

function getRecommendation(movieId) {
    var payload = {'id':movieId};
    $.ajax({
            type: "POST",
            url: "http://localhost:8081/api/user/r",
            data: JSON.stringify(payload),
            success: function(data) {
                var tar = $('#users');
                tar.empty();
                if (data.length == 0) {
                    tar.append("No recommendations yet :(");
                    tar.show();
                    return;
                }
                data.forEach(function(user) {
                    tar.append(user.name + ', ' + user.age + '; ');
                });
                tar.show();
            },
            dataType: "json",
            contentType: "application/json"
        });

}

function getFilms() {
    $.ajax({
            type: "GET",
            url: "http://localhost:8081/api/movie",
            success: function(data) {
                populateSelectWithMovies(data);
            },
            dataType: "json",
            contentType: "application/json"
        });
}

function populateSelectWithMovies(data) {
    var sel = $('#movieSel');
    data.forEach(function(movie) {
        var opt = $('<option value=' + movie.id + '>' + movie.title + '</option>');
        sel.append(opt);
    })
}