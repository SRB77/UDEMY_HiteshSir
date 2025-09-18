## SECTION 21 - Folder Structure . 

>   MESSAGE TO USE THE NOTE 

Hey whenever you revisit the notes first go to the code base and check this much folder and files for Basic Setup and understanding How to setup a express and mogoDB application . 

* controllers
    - helathcehck.controllers.js 
* models
    - user.model.js
* routes 
    - healthcheck.routes.js
* utils
    - api-error.js
    - api-response.js
    - async-handler.js

✅ i have to just go through above folder and understand the code why and whats the logic of those code . 
✅ and also we have to explore what's the meaning of Different Fodlers just like mentioned above and best practices around that 

--- 

## JWT TOKENS , (ACCESS , REFRESH ): 

JWT tokens are built with special hashing algorythem and they are used to make our authentication system much more stronger and protected , 

> ACCESS TOKEN  AND REFRESH TOKEN : 

    ✅ they both are generated quite simmilarly and then contains client data as well , but the difference is Access token is very short live and state less so we don't store it in our DB but viceversa with Refresh Token 

    ✅ Another thing with some design pattern we use refresh token to refersh our Access token in between the req-res cycle . 

    ✅ when a user registerd or login a access token will be generated and same with Refresh Token . but access and refresh token will go to the Client and Refresh will be  stored on Database but not the access token 

    ✅ a request from client will carry the access token then with some algo server will check is the token valid or not then it will provide access to content if not then we can't . or suppose token expired then it would suggest to login again.
    
    ✅ but there is a way exist also rather login server will send a status code and in between the refresh token will go from client and just refersh access token ofcourse after succesfull matching of clint refresha and database refresh 

```javascript
    
    //* Generate AcessToken and refreshToken

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};
//* GENERATE TOKEN WITHOUT DATA
userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(unhashedToken)
    .digest('hex');
  const tokenExpiry = Date.now()+(20*60*1000) //> 20 mins
  
  return {unhashedToken , hashedToken , tokenExpiry}
};
```
