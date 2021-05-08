export = {
  token: process.env.TOKEN,
  owner: "",
  clientid: "",
  prefix: "",
  debug: false, //true/false
  warn: false,  //true/false
  dashboard: {
    sessionSecret: process.env.SESSION_SECRET,
    oauthSecret: process.env.OUATH_SECRET,
    apiEndpoint: "http://localhost:3000/api"
    callbackURL: `${this.apiEndpoint}/callback`
  }
}
