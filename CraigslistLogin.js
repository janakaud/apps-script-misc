function craigsList() {
  var aUrl = "https://accounts.craigslist.org/login";
  var response = UrlFetchApp.fetch(aUrl);
  
  //remove extra data from cookies: currently only PHPSESSID
  var cookie = response.getAllHeaders()["Set-Cookie"];
  var parse = cookie.substring(0, cookie.indexOf(";"));
  
  var payload = {
    "step": "confirmation",
    "inputEmailHandle": "__email__",
    "inputPassword": "__password__"
  };
  var options = {
    "method": "POST",
    "payload": payload,
    "headers": {
      "cookie" : parse,
    },
    "followRedirects": false
  };
  response = UrlFetchApp.fetch(aUrl, options);
  
  cookie = response.getAllHeaders()["Set-Cookie"];
  parse += "; " + cookie.substring(0, cookie.indexOf(";"));
  
  options = {
    "method": "GET",
    "headers": {
      "cookie" : parse,
    }
  };
  response = UrlFetchApp.fetch(aUrl, options);
}
