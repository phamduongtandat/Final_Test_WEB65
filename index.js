const express = require("express");
const app = express();
const { client } = require("./config/connectDB.js");
const { inventoryRouter } = require('./routers/inventoryRouter.js');
const { orderRouter } = require('./routers/orderRouter.js');
const { authRouter } = require("./routers/authRouter.js");
//const { connectToDb, db } = require("./db");
const { config } = require("dotenv");
config();
const PORT = process.env.PORT;


async function main() {
  try {
    //       _____ Câu 1 _____ 
    await client.connect();
    console.log("Connected to mongodb successfully");

    // set up middlewares
    app.use(express.json());

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/inventory", inventoryRouter)
    app.use("/api/v1/order", orderRouter)

    // run server
    app.listen(PORT, () => {
      console.log(`App is running at ${PORT}`);
    });

  } catch (error) {

    console.log(error.message)
  }
}

main();





