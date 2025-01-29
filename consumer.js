const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    const queue = "hello_queue";

    ch.assertQueue(queue, { durable: false });
    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);
    ch.consume(
      queue,
      (msg) => {
        console.log("[X] Received '%s'", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
