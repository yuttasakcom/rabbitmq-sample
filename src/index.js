import Koa from "koa";
import rascal, { Broker } from "rascal";

const app = new Koa();

const port = process.env.PORT || "4000";

const config = {
  vhosts: {
    "/": {
      connection: {
        heartbeat: 1,
        socketOptions: {
          timeout: 1000,
        },
        user: "user",
        password: "password",
      },
      exchanges: ["demo_ex"],
      queues: ["demo_q"],
      bindings: ["demo_ex[a.b.c] -> demo_q"],
      publications: {
        demo_pub: {
          exchange: "demo_ex",
          routingKey: "a.b.c",
        },
      },
      subscriptions: {
        demo_sub: {
          queue: "demo_q",
        },
      },
    },
  },
};

Broker.create(rascal.withDefaultConfig(config), (err, broker) => {
  if (err) throw err;

  broker.on("error", console.error);

  broker.publish("demo_pub", "Hello World!", (err, publication) => {
    if (err) throw err;
    publication.on("error", console.error);
  });

  broker.subscribe("demo_sub", (err, subscription) => {
    if (err) throw err;
    subscription.on("message", (message, content, ackOrNack) => {
      //   console.log(message)
      console.log(content);
      ackOrNack();
    });
    subscription.on("error", console.error);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
