/**
 * Created by silvablaze91 on 6/6/16.
 */

$(document).ready(function() {

    var gitApi = "https://api.github.com/search/users?q=";

    $("#searchForm").submit(function (event) {
        //console.log("Handler for search .submit() called.");
        event.preventDefault();

        var userVal = $('#searchId').val();
        console.log("Search string: " + userVal);
        if (userVal !== "") {
            $.ajax({
                url: gitApi + userVal,
                type: 'GET',
                success: function(response) {
                    analyzeResults(response);
                }
            });
        } else {
            alert("Search for a user on Github!");
        }
    });
});

function analyzeResults(jsonResults) {

    var gitUsers = JSON.parse(JSON.stringify(jsonResults.items));
    console.log("# of users returned with searchstring: " + gitUsers.length);

    var freq = {};

    for(var x=0; x < gitUsers.length; x++) {
        var username = gitUsers[x].login;
        console.log(x+1 + ": " + username);

        freq = getFrequency(username, freq);
    }
    freq = transform(freq);
    console.log(freq);
    displayResults(freq);
}

function getFrequency(string, freq) {
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
        }
    }
    console.log(freq);
    return freq;
};

function transform(freq) {
    var dataArray = [];

    for (var prop in freq) {
        dataArray.push(new Tuple(prop, freq[prop]));
    }
    var data = dataArray;
    console.log(JSON.stringify(data));

    return data;
}

var Tuple = function(letter, freq) {
    this.letter = letter;
    this.frequency = freq;
};