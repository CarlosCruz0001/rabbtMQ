const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn)=>{
    if(err) throw err;
    conn.createChannel((err,ch)=>{
        if (err) throw err;
        const queue = 'hello_queue';
        const msg = 'Hello RabbitMQ!';

        ch.assertQueue(queue, {durable: false});
        ch.sendToQueue(queue, Buffer.from(msg));

        console.log("[x] Sent '%s'", msg);

        setTimeout(()=>{
            conn.close();
            process.exit(0);
        }, 500);
        
    })
})