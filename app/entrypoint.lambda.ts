import { handle } from "hono/aws-lambda";
import app from "./server";

// static files are served from CloudFront
// favicon.ico is served from the root

export const handler = handle(app);
