class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode=statusCode;
        this.message=message;
    }
}
module.exports=ExpressError;


/*
===========================================================
📄 FILE SUMMARY: utils/ExpressError.js
===========================================================

🧭 PURPOSE:
This file defines a **custom error-handling class** (`ExpressError`) 
used throughout the application to handle errors in a consistent and structured way.

⚙️ FUNCTIONALITY & WORKFLOW:
1. The `ExpressError` class extends JavaScript’s built-in `Error` class.
2. It takes two parameters:
   - `statusCode` → The HTTP status code (e.g., 404, 500, 401, etc.)
   - `message` → A human-readable error message describing the issue.
3. When instantiated, it sets these properties on the error object,
   allowing Express to handle them gracefully in error middleware.

🧩 EXAMPLE USAGE:
```js
if (!listing) {
  throw new ExpressError(404, "Listing not found!");
}
  */
