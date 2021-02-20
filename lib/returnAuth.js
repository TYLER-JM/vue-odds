// const fs = require('fs');
const {google} = require('googleapis');
const creds = require('../credentials.json');
const token = require('../token.json');

module.exports = () => {
  const { client_secret, client_id, redirect_uris } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};