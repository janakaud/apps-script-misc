var TRANSACTION_LIMIT = 100;
var RESOURCE_TYPES = ["Order","Payment"];

var ESTABLISHMENT = 1;

var CLOSED = true;
var IS_INVOICE = false;

var api = "__key__";
var secret = "__secret__";

function fetchResource(resourceType, startDate, endDate){
  var url = "/resources/" + resourceType + "/?offset=0&limit=" + TRANSACTION_LIMIT + "&format=json"
        + "&created_date__gte=" + startDate 
        + "&created_date__lt=" + endDate
        + "&establishment=" + ESTABLISHMENT
//        + "&dining_option=" + DINING_OPTION
        + "&closed=" + CLOSED
        + "&is_invoice=" + IS_INVOICE
        + "&api_key=" + api + "&api_secret=" + secret;
  var data = [];
  do {
    var result = JSON.parse(UrlFetchApp.fetch("https://__host__.revelup.com" + url).getContentText());
    data = data.concat(result.objects);
    url = result.meta.next;
  } while (url != null);
  return data;
}


// usage (lines 220-234) would have to be changed as follows:

function _main() {
startDate = "2017-09-01";
endDate = "2017-09-02";
  var jsonObj;
  var additionalJSONs = [];
  for (i = 0; i < RESOURCE_TYPES.length; i++) {
    var data = fetchResource(RESOURCE_TYPES[i], startDate, endDate);
    if (jsonObj == null){
      jsonObj = data;
    }
    else {
      additionalJSONs.push(data);
    }
  }

Logger.log(jsonObj.length);
Logger.log(additionalJSONs.length);
Logger.log(additionalJSONs[0].length);
}
