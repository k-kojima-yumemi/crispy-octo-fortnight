import { Hono } from "hono";
import { env } from "hono/adapter";
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
    .use(
        csrf({
            origin: (originDomain, c) => {
                const { ORIGIN } = env<{ ORIGIN: string }>(c);
                console.log("Origin: ", ORIGIN, originDomain);
                if (ORIGIN) {
                    return ORIGIN === originDomain;
                }
                return /^http:\/\/localhost:\d+$/.test(originDomain);
            },
        }),
    )
    .use(timing());

const app = createApp({ app: withLogger });

showRoutes(app);

export default app;
