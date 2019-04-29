import Koa from 'koa'
import rascal, {Broker} from 'rascal'

const app = new Koa()

const port = process.env.PORT || "4000"

const config = {
    "vhosts": {
      "v1": {
        "connection": {
          "slashes": true,
          "protocol": "amqp",
          "hostname": "localhost",
          "user": "user",
          "password": "password",
          "port": 5672,
          "vhost": "v1",
          "options": {
              "heartbeat": 5
          },
          "socketOptions": {
              "timeout": 10000
          }
        }
      }
    }
  }

  Broker.create(rascal.withDefaultConfig(config), (err, broker) => {
      if(err) throw err

      broker.on('error', console.error)

      broker.publish('demo_publication', 'Hello World!', (err, publication) => {
          if(err) throw err
          publication.on('error', console.error)
      })

      broker.subscribe('demo_subscription', (err, subscription) => {
          if(err) throw err
          subscription.on('message', (message, content, ackOrNack) => {
              console.log(content)
              ackOrNack()
          })
          subscription.on('error', console.error)
      })
  })

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})