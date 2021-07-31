import express from "express";
import App from "./services/Express";
import dbConnection from "./services/Database";

const StartServer = async () => {
  const app = express();

  await dbConnection();

  await App(app);

  app.listen(8000, () => {
    console.log("App is listening to the port 8000");
  });
};

StartServer();
