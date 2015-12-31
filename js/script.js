
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ", " + $city + '';

    var urlLink = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $address;
    
    $body.append('<img class = "bgimg" src="' + urlLink + '">');
    $greeting.text('So, you want to live at ' + $address);

    var nytimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city + "&sort=newest&api-key=b91e2d4d50ca5865b0fea09026d1804d:16:73338684 ";

    $nytHeaderElem.text("News for " + $city);

    $.getJSON(nytimesURL, function(data) {
        var newsList = []; 
        data.response.docs.forEach(function(news) {
            newsList.push("<li class='article'> <a href='" + news.web_url + "'>" + news.headline.main + "</a>"
                + "<p>" + news.snippet + "</p></li>");
        });
        $nytElem.append(newsList);
    }).error(function() {
            $nytHeaderElem.text("Error loading data");
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
