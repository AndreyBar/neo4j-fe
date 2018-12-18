$(document).ready(function() {
    var user = getUsers();
    var films = getFilms();

    $('#rateBtn').click(function(event) {
        var movieId = $('#movieSel').val();
        var userId = $('#users').val();
        var score = $('#score').val();

        rateMovie(movieId, userId, score);
    });

    $('#recButton').click(function(event) {
        var userId = $('#users').val()

        getRecommendation(userId);
    })

});

function getRecommendation(userId) {
    var payload = {'id':userId};
    $.ajax({
            type: "POST",
            url: "http://localhost:8081/api/movie/r",
            data: JSON.stringify(payload),
            success: function(data) {
                var tar = $('#movies');
                tar.empty();
                if (data.length == 0) {
                    tar.append("No recommendations for now :(");
                    tar.show();
                    return;
                }
                data.forEach(function(movie) {
                    tar.append(movie.title + ' (' + movie.director + '); ');
                });
                tar.show();
            },
            dataType: "json",
            contentType: "application/json"
        });

}

function rateMovie(movieId, userId, score) {
    var payload = {
        'movieId': movieId,
        'userId': userId,
        'score': score
    }

    $.ajax({
            type: "POST",
            url: "http://localhost:8081/api/rate",
            data: JSON.stringify(payload),
            success: function(data) {
                $("#success").show().delay(5000).fadeOut();
            },
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


function getUsers() {
    $.ajax({
            type: "GET",
            url: "http://localhost:8081/api/user",
            success: function(data) {
                populateSelectWithUsers(data);
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


function populateSelectWithUsers(data) {
    var sel = $('#users');
    data.forEach(function(user) {
        var opt = $('<option value=' + user.id + '>' + user.name + '</option>');
        sel.append(opt);
    })
}