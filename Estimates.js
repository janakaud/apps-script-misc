function __test() {
  addr = "__address__";
//  Logger.log(zillow(addr));
  Logger.log(redfin(addr));
}

function zillow(address) {
  return UrlFetchApp.fetch("https://www.zillow.com/seo/howmuch/PropertyDetails.htm?address=" + address).getContentText(); 
}

function redfin(address) {
  var page = UrlFetchApp.fetch("http://hidemyass.com");
//  var cookie = page.getAllHeaders()["Set-Cookie"];
//  cookie = cookie.substring(0, cookie.indexOf(";"));

  var params = {
    "method": "POST",
//    "headers": { "cookie": cookie },
    "payload": {
      "u": "https://www.redfin.com/stingray/do/avm/location-autocomplete?location=" + address,
      "ssl": "1",
      "server": "0",
      "obfuscation": "1"
    },
    muteHttpExceptions: true
  };
  return UrlFetchApp.fetch("http://hidemyass.com/process.php", params).getContentText();
}