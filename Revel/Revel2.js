TRANSACTION_LIMIT = 2000;

function fetchResource(host, estab, resource, key, secret, filter) {
	var url = "/resources/" + resource + "/?offset=0&limit=" + TRANSACTION_LIMIT + "&format=json&establishment=" + estab + "&api_key=" + key + "&api_secret=" + secret;
	if (filter) {
		url += filter;
	}

	var data = [];
	do {
		var result = JSON.parse(UrlFetchApp.fetch("https://" + host + ".revelup.com" + url).getContentText());
		if (!filter) {	// assumed non-batch
			return result;
		}
		data = data.concat(result.objects);
		url = result.meta ? result.meta.next : null;
	} while (url != null);

	return data;
}

function fromProd(resource, filter) {
	return fetchResource("__host__", 1, resource, "__key__", "__secret__", filter);
}

function postAllIn1(host, estab, key, secret, order, orderItems, orderHistory, payments) {
/*
Logger.log(JSON.stringify({
			"orderInfo": order,
			"items": orderItems,
			"history": orderHistory,
			"payments": payments
		}));
return;
*/
	return JSON.parse(UrlFetchApp.fetch("https://" + host + ".revelup.com/resources/OrderAllInOne/?format=json&establishment=" + estab, {
		method: "POST",
		headers: {"API-AUTHENTICATION": key + ":" + secret},
		contentType: "application/json",
		payload: JSON.stringify({
			"orderInfo": order,
			"items": orderItems,
			"history": orderHistory,
			"payments": payments
		})
	}).getContentText());
}

function allIn1ToTest(order, orderItems, orderHistory, payments) {
	return postAllIn1("__host__", 1, "__key__", "__secret__", order, orderItems, orderHistory, payments);
}

function _allIn1() {
	ids = [00000, 11111];

	for (i in ids) {
		order = fromProd("Order/" + ids[i]);
//		order.pickup_time = null; //order.pickup_time.substring(0, order.pickup_time.lastIndexOf("."));		//TODO fix

		orderItems = fromProd("OrderItem", "&order__in=" + ids[i]);
		orderHistory = fromProd("OrderHistory", "&order__in=" + ids[i]);
		payments = fromProd("Payment", "&order__in=" + ids[i]);

		Logger.log(allIn1ToTest(order, orderItems, orderHistory, payments));
	}
}