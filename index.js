const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const credentials = require('./keys.json');
const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });

// const BILLS_MD = '1-75GpKz2DQ9HINNnmKUx3evumEnR-h5M';

const TODO_MD = '1--SAZL-NwasKrP-RLDBJoGblHMYX2iRp';

(async () => {
  const res = await drive.files.get(
    {fileId: TODO_MD, alt: 'media'}
  );
  return res.data;
})().then((file) => {
  return `
    <html>
      <body>
        <div style="white-space: pre">
          ${file}
        </div>
      </body>
    </html>
  `;
}).catch((error) => {
  console.log(error);
}).then((rawHtml) => {
  console.log(rawHtml);
}).catch((error) => {
  console.log(error);
});