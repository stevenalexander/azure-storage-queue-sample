const azure = require('azure-storage')
const queueSvc = azure.createQueueService()
const QUEUE = 'testqueue'

// Requires env AZURE_STORAGE_CONNECTION_STRING
queueSvc.createQueueIfNotExists(QUEUE, function (error, result, response) {
  if (error) throw error
  if (result.created) console.log('Created queue')

  queueSvc.getQueueMetadata(QUEUE, function (error, result, response) {
    if (error) throw error
    console.log(`Queue length:${result.approximateMessageCount}`)

    queueSvc.peekMessages(QUEUE, function (error, result, response) {
      if (error) throw error
      if (result && result[0]) console.log(`Top message: ${result[0].messageText}`)

      var newMessage = `Hello ${(new Date()).toLocaleTimeString()}`

      queueSvc.createMessage(QUEUE, newMessage, function (error, result, response) {
        if (error) throw error
        console.log('Inserted message')
      })
    })
  })
})
