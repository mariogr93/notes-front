const { EnvironmentPlugin } = require('webpack');
// Add additional requirements here

// If you're using dotenv
const Dotenv = require('dotenv-webpack')

// Export a configuration object
// See [Wepack's documentation](https://webpack.js.org/configuration/) for additional ideas of how to 
// customize your build beyond what Angular provides.
module.exports = {
  plugins: [
    new Dotenv({
        systemvars: true
    })
    // new EnvironmentPlugin([
    //   // Insert the keys to your environment variables here.
    //   // Eg: APP_API_ENDPOINT="http://localhost:3000/api/v1"
    //   DOMAIN 
    // ])
]
}