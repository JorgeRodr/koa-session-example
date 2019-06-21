const session = require("koa-session");
const Koa = require("koa");
const app = new Koa();
const koaLogger = require("koa-logger");
const logger = require("./logger");
const File = require("koa-generic-session-file");

app.keys = ["claveSuperSecreta"];

app.use(koaLogger());

app.use(
  session(
    {
      store: new File({
        sessionDirectory: __dirname + "/sessions"
      })
    },
    app
  )
);

app.use(async (ctx, next) => {
  logger.info(`Last request was ${ctx.session.lastRequest}`);
  ctx.session.lastRequest = new Date();
  await next();
});

app.listen(3000, () => {
  console.log("Koa example on port 3000!");
});
