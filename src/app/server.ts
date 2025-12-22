import { log } from "console";
import app from "./app";
import config from "./config";
import { Server } from "http";

const main = () => {
  const server: Server = app.listen(
    Number(config.port),
    config.ip as string,
    () => {
      console.log(`app is listening on port ${config.port}`);
    }
  );

  process.on("uncaughtException", error => {
    log(error);
    if (server) {
      server.close(() => {
        console.log("Server closed due to uncaught exception");
        process.exit(1);
      });
    }
  });

  process.on("unhandledRejection", error => {
    log(error);
    if (server) {
      server.close(() => {
        console.log("Server closed due to unhandled rejection");
        process.exit(1);
      });
    }
  });
};

main();
