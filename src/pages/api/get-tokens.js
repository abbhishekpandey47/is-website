// get-tokens.js
const { google } = require('googleapis');
const open = require('open');
const readline = require('readline');

const oAuth2Client = new google.auth.OAuth2(
  '784971397184-ruga2mv8if09skfdloc0e44f08srt38r.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/auth/google/callback'
);

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
});

console.log('Authorize this app by visiting this URL:\n', authUrl);
open(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nPaste the authorization code here: ', async (code) => {
  rl.close();
  const { tokens } = await oAuth2Client.getToken(code);
  console.log('\n✅ Tokens received:');
  console.log('GOOGLE_ACCESS_TOKEN=' + tokens.access_token);
  console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
});
