import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { showRoutes } from "hono/dev";
import { createMiddleware } from "hono/factory";
import { timing } from "hono/timing";
import { createApp } from "honox/server";

const withLogger = new Hono()
    .use(
        "*",
        createMiddleware(async (c, next) => {
            await next();

            const level =
                c.res.status < 200 || 400 <= c.res.status ? "ERROR" : "INFO";

            const accessLog = {
                level: level,
                statusCode: c.res.status,
                method: c.req.method,
                url: c.req.url,
                requestHeader: c.req.header(),
                path: c.req.path,
            };
            console.log(JSON.stringify(accessLog));
        }),
    )
    .use(csrf())
    .use(timing());

const app = createApp({ app: withLogger });

showRoutes(app);

export default app;
