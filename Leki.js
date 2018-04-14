function updateStock() {
  sessId = "__session cookie__";
  cookie = "PHPSESSID=" + sessId + "; mobiid=0; orderid=0";

  sheet = SpreadsheetApp.openById("__sheet ID__").getActiveSheet();
  rows = sheet.getLastRow() - 1;
  items = sheet.getRange(2, 1, rows, 2).getValues().map(function(k) { return k[0] && k[0] != "" ? k[0] : k[1] });
  stock = sheet.getRange(2, 4, rows);

  results = [];
  for (i in items) {
    qty = "";
    try {
      // query
      item = items[i];
      if (!item || item == "") {
        continue;
      }

      // find actual product ID
      u = UrlFetchApp.fetch("https://b2b.leki.de/?c=autocompletion&a=searchrequest&ac_search_for=" + item, {
        headers: {cookie: cookie}
      });
      ids = u.getContentText().match(/\d+(?=\|)/g) || [];
      if (ids.length < 1) {
        Logger.log("No matches for " + item);
        continue;
      }
      if (ids.length > 1) {
        Logger.log("Multiple matches for " + item + ": " + ids + ", using first: " + ids[0]);
      }

      // get item JSON
      u = UrlFetchApp.fetch("https://b2b.leki.de/index.php", {
        method: "POST",
        headers: {cookie: cookie},
        payload: {
          c: "ordermanager",
          a: "actionpack",
          data: encodeURIComponent(JSON.stringify([{"actionName":"invokestyle","params":{"styleid":ids[0],"variantid":"*"}}]))
        }
      });
      qty = JSON.parse(u.getContentText())[0].rows[0].stock[0];

    } catch (e) {
      Logger.log(item + " (" + ids + ") : " + e);
      continue;

    } finally {
      results.push([qty]);
    }
  }

  stock.setValues(results);
}