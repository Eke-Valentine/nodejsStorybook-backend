const loggers= require('./index');

logger=new loggers()

logger.on('messages',(arg) => {
    console.log(" listener called", arg);

})

logger.log(" journey")