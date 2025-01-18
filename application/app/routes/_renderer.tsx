import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

export default jsxRenderer(({ children, title }) => {
    return (
        <html lang="ja">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>{title}</title>
                <Script src="/app/client.ts" />
                <Link href="/app/style.css" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    );
});
