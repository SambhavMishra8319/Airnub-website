function wrapAsync(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }}

module.exports=(wrapAsync);
// module.exports = wrapAsync;



/*
===========================================================
📄 FILE SUMMARY: utils/wrapAsync.js
===========================================================

🧭 PURPOSE:
This utility function helps to handle **async/await errors** in Express routes 
without repeatedly writing try-catch blocks.

⚙️ FUNCTIONALITY & WORKFLOW:
1. The `wrapAsync(fn)` function takes an **async route handler** (`fn`) as input.
2. It returns a **new function** that executes `fn(req, res, next)`.
3. If any error occurs during execution, it automatically passes it to 
   Express’s `next()` function — triggering the global error handler.

🧩 EXAMPLE USAGE:
```js
router.get("/listings", wrapAsync(async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings });
}));
*/