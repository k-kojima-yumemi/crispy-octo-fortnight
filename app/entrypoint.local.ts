import { env } from "node:process";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import app from "./server";

// static files
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ root: "./" }));

const appPort: number = Number.parseInt(env.APP_PORT ?? "8080");
serve(
    {
        fetch: app.fetch,
        port: appPort,
    },
    (info) => {
        console.log(`Port: ${info.port}, URL: http://localhost:${info.port}`);
    },
);
