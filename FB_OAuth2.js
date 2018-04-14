
var CONSUMER_KEY = '__ID__';
var CONSUMER_SECRET = '__secret__';

function getFBService() {
  return OAuth2.createService('facebook')
  .setAuthorizationBaseUrl('https://graph.facebook.com/oauth/authorize')
  .setTokenUrl('https://graph.facebook.com/oauth/access_token')
  .setClientId(CONSUMER_KEY)
  .setClientSecret(CONSUMER_SECRET)
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties())
//	.setAccessTokenUrl('https://graph.facebook.com/oauth/access_token')
//	.setRequestTokenUrl('https://graph.facebook.com/oauth/request_token')
//	.setAuthorizationUrl('https://graph.facebook.com/oauth/authorize')
//  .setScope('https://www.googleapis.com/auth/drive')
//  .setParam('login_hint', Session.getActiveUser().getEmail())
//  .setParam('access_type', 'offline')
//  .setParam('approval_prompt', 'force');
}

function _t() {
  service = getFBService();
  Logger.log(service.getRedirectUri());
  Logger.log(service.getAuthorizationUrl());
//  service.fetch("https://graph.facebook.com/me/feed?message=test_via_graph_api", {method: "POST"});
}

function authCallback(request) {
  var service = getFBService();
  Logger.log(service.handleCallback(request));
}

