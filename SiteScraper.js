function doGet(request) {
  request = {
    parameters: {
      url: "http://www.bwinner.co.il",
      query: "MLB"
    }
  };

  // extract base (protocol + domain)
  var url = "" + request.parameters.url;
  var slash = url.match(/[^\/]\/[^\/]/); // first single /
  var pos = slash ? url.indexOf(slash[0]) + 1 : url.length;
  var base = url.substring(0, pos);
  
  // results from homepage
  var home = UrlFetchApp.fetch(url).getContentText();
  var query = new RegExp("[^\r\n]*" + request.parameters.query + "[^\r\n]*", "g");
  var results = home.match(query) || [];

  // pick unique child URLs
  var urls = home.match(/href=["'][^"']+["']/g) || [];
  urls = urls.sort().filter(function(url, pos, ary) {
    var hashPos = url.indexOf(base + "#");
    return url[6] != "#" && (hashPos < 0 || hashPos > 6) && (!pos || url != ary[pos - 1]); // drop duplicates and hashes
  });
Logger.log(urls.length);
return;
  
  // navigate child URLs
  urls.map(function(url, index) {
    url = url.substring(6, url.length - 1);
    if (!url.match(/^(http:|https:|ftp:|)\/\//)) { // prefix if not absolute
      url = base + (url.indexOf("/") == 0 ? "" : "/") + url;
    }
    if (url.indexOf("//") == 0) { // add protocol if missing
      url = "http:" + url;
    }
    
    // ignore URLs from other domains
    if (!url.indexOf(base) != 0) {
      return;
    }
Logger.log(url);
    
    try {
      var resp = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
      if (resp.getResponseCode() >= 400) { // ignore errors
        return;
      }
      var page = resp.getContentText();
      results = results.concat(page.match(query) || []);
    } catch (e) { // ignore errors
      Logger.log(url + "\n" + e.message);
    }
  });
  
  return ContentService.createTextOutput(results.join("\n"));
}
