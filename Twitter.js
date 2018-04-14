function t() {
	sendTweet("")
}

function doGet(request) {
	if(request.parameters.tweet)
		result = sendTweet("" + request.parameters.tweet);
	else if(request.parameters.del)
		result = deleteTweets();
	return ContentService.createTextOutput(result);
}

function sendTweet(tweet) {
	if(ScriptProperties.getProperty('lastTweet') == tweet)	//same as last tweet
		return "dup";
	var encodedTweet = encodeURIComponent(tweet.trim().substring(0, 140)).replace(/%26nbsp%3B|!|\*|\(|\)|'|%3D|%26/g, '');	//truncate, encode
	try {
		var result = getTwitterService().fetch("https://api.twitter.com/1.1/statuses/update.json?status=" + encodedTweet, {method: "POST"});
		ScriptProperties.setProperty('lastTweet', tweet);	// save as last tweet
		return encodedTweet;
	} catch(e) {
		GmailApp.sendEmail("__email__", "Twitter Error", e.message);
		return e.message;
	}
}

function deleteTweets() {
	try {
		var twitter = getTwitterService();
		// Get (almost all) tweets posted in the last 24 hours
		var result = twitter.fetch("https://api.twitter.com/1.1/statuses/user_timeline.json?count=200&trim_user=true&include_rts=false");
		if (result.getResponseCode() === 200){
			var list = JSON.parse(result.getContentText());
			for(var i = 0; i < list.length; i++) {
				try {
					result = twitter.fetch("https://api.twitter.com/1.1/statuses/destroy/" + list[i].id_str + ".json", {method: "POST"});
				}
				catch(e) {}
			}
			return i;
		}
	} catch (e) {
		return e.message;
	}
}

var CONSUMER_KEY = '__key__';
var CONSUMER_SECRET = '__secret__';
var PROJECT_KEY = '__GAS proj key__';

function getTwitterService() {
	var service = OAuth1.createService('twitter');
	service.setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
	service.setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
	service.setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
	service.setConsumerKey(CONSUMER_KEY);
	service.setConsumerSecret(CONSUMER_SECRET);
//	service.setProjectKey(PROJECT_KEY);
	service.setPropertyStore(PropertiesService.getScriptProperties());
	return service;
}
