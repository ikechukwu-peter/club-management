import cluster from "cluster";
import { cpus } from "os";
import 'dotenv/config'
import "./config/database.config";
import './config/database.association'
//import sequelize from "./database/database";


//initializing app
import app from "./app";

const numWorkers = cpus().length;

if (cluster.isPrimary) {
  console.log("Master cluster setting up " + numWorkers + " workers...");

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("online", function (worker) {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log(
      "Worker " +
      worker.process.pid +
      " died with code: " +
      code +
      ", and signal: " +
      signal
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  //Handle uncaughtExceptions
  process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Server shutting down...");
    console.log(err.name, err.message, err.stack);
    process.exit(1);
  });

  // sequelize.sync({
  //   force: true
  // })
  // //Connecting to mongoose
  // async function dbInit(): Promise<void> {
  //   try {
  //     await sequelize.authenticate();
  //     console.log('Connected to the database successfully')
  //   } catch (error) {
  //     console.log('Failed to connect to the database ' + error)
  //   }

  // }

  // // //Call DB to start
  // dbInit();

  //Setting port
  const port = process.env.PORT || 5000;

  //Listening for request
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });

  //For heroku
  process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED. Shuttig down gracefully!!");

    server.close(() => {
      console.log("Process terminated!");
    });
  });
}
