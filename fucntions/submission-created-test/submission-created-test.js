// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
// const process = require('process')

// const fetch = require('node-fetch')

// const { EMAIL_TOKEN } = process.env
exports.handler = async event => {
  const email  = JSON.parse(event.body).payload
  console.log(email)
 
    return { statusCode: 200, body: "OK" }
}

// module.exports = { handler }
