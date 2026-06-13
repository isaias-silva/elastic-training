import { Elysia } from "elysia";
import productPlugin from "./plugins/bookPlugin";
import { logger } from "./logger";

const app = new Elysia();

app
  .derive(({ request }) => ({
    requestLogContext: {
      startedAt: performance.now(),
      method: request.method,
      path: new URL(request.url).pathname,
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") ?? "unknown"
    }
  }))
  .onAfterHandle(({ set, requestLogContext }) => {
    logger.info({
      type: "request",
      method: requestLogContext.method,
      path: requestLogContext.path,
      statusCode: set.status ?? 200,
      durationMs: Number((performance.now() - requestLogContext.startedAt).toFixed(2)),
      ip: requestLogContext.ip,
      userAgent: requestLogContext.userAgent
    }, "request completed");
  })
  .onError(({ code, error, set, request, requestLogContext }) => {
    logger.error({
      type: "error",
      code,
      method: request.method,
      path: new URL(request.url).pathname,
      statusCode: set.status ?? 500,
      durationMs: requestLogContext
        ? Number((performance.now() - requestLogContext.startedAt).toFixed(2))
        : undefined,
      message: error.message,
      stack: error.stack
    }, "request failed");
  });

app.use(productPlugin)

app.listen(4100)
logger.info({
  type: "startup",
  host: app.server?.hostname,
  port: app.server?.port
}, "server running");
