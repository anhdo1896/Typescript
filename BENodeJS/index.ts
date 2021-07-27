const express = require( "express" )

const app = express();

app.use("/", (req : any, res: any) => {
  return res.json("Hello from BE typescript");
});

app.listen(8000, () => {
  console.log("App is listening to the port 8000");
});
