const express = require('express');
require('dotenv').config({path: './src/config/env/.env'});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const scopesArray = [ // list of scopes that you need to request to access Google APIs
        'https%3A//www.googleapis.com/auth/userinfo.email',
        'https%3A//www.googleapis.com/auth/userinfo.profile'
    ]

/* Reference: https://permify.co/post/oauth-20-implementation-nodejs-expressjs/
 *
 * Steps
 * 1. User clicks on 'Sign in with Google' button
 * 2. User is redirected to Google OAuth consent screen where they give consent to the client app
 * 3. The client is redirected to the redirect uri and gets back the 'state' and authorization code
 * 4. The client then makes a POST request to the authorization server auth token uri and exchanges the auth code for access token
 * 5. ID token is extracted from the access token
 * 6. The client makes a GET request to the auth token info uri to verify the id token and get user info from it
 */

app.get('/', (req, res) => {
    res.send('Welcome! Proceed to /login to continue')
})

app.get('/login', async (req, res) => {
    const state = 'SomeState987'; // value passed to the request that must be included in the response of the OAuth 2.0 server response.
    const scopes = scopesArray.join(' ');
    // access_type determines whether a refresh token will be returned alongside an access token 
    // for offline use during the initial exchange of an authorization code for tokens.

    // response_type determines whether the Google OAuth 2.0 endpoint returns an authorization code. 
    // We have set the value as 'code' since we’re doing the Authorization Code flow.
    res.redirect(`${process.env.GOOGLE_AUTH_URI}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`)
})

app.get('/google/callback', async (req, res) => {

    // When a user completes the OAuth consent screen (i.e. authorization request), the Google OAuth server will redirect 
    // the user to the redirect URL in both the success and error cases.
    // What distinguishes the success and error case is the name of the query parameter with which the redirect URL is called. 
    // Hence, why we are extracting the query parameters from the URL req.query.
    console.log(req.query);
    const {code} = req.query;
    const data = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
    };
    console.log(data);
    
    // We exchange the code for an access and ID token by making a post request 
    // to Google’s access token endpoint.
    const response = await fetch(process.env.GOOGLE_TOKEN_URI, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    const access_token_data = await response.json();

    // Extract the id token returned from the access token endpoint
    const {id_token} = access_token_data;
    console.log(id_token);
    
    // Make a GET request to the token info endpoint to verify the token’s validity 
    // and obtain the user's profile information. (not recommended in production)
    const token_info_res = await fetch(`${process.env.GOOGLE_TOKEN_URI}info?id_token=${id_token}`);
    res.status(token_info_res.status).json(await token_info_res.json());
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
})