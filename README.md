# RabbitMQ Sample

## AMQP Messaging Standard

- Advanced Message Queueing Protocol
- RabbitMQ supports version 0-9-1

## Exchanges

- Direct exchange
- Fanout exchange
- Topic exchange
- Headers exchange

```
Name the name of the exchange
Durability persisting the messages to disk
Auto-Delete delete message when not needed
Arguments these are message broker-dependent
```

## Queues

```
Name the name of the queue
Durable persisting the queue to disk
Exclusive delete queue when not needed
Auto Delete queue deleted when consumer unsubscribes
```

## Bindings

```
bindings: ["exchange_name[routing.key] -> queue_name"]
```

## Consumers

- Message sent to consumer
- Acknowledgement sent to queue
- Reject the message (Discard or Re-queue)
