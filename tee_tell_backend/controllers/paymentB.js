var braintree = require("braintree");

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'ID',
    publicKey:    'KEY',
    privateKey:   'PRIVATE KEY'
});

exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(err)
        }else{
            // console.log(response);
            res.send(response)
        }
      });
}

exports.processPayment = (req,res)=>{

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if(err){
            res.status(500).json({error:err})
        }else{
            res.send(result)
        }
      });
}