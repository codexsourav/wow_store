var jsSHA = require('jssha');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
export default(req, res) => {
  try {
    if (
      !req.body.txnid ||
      !req.body.amount ||
      !req.body.productinfo ||
      !req.body.firstname ||
      !req.body.email
    ) {
      res.send('Mandatory fields missing');
    } else {
      var pd = req.body;
      var hashString =
        'WPBubxd5' + // live or test key
        '|' +
        pd.txnid +
        '|' +
        pd.amount +
        '|' +
        pd.productinfo +
        '|' +
        pd.firstname +
        '|' +
        pd.email +
        '|' +
        '||||||||||' +
        '9bljMtfr9g'; //live or test salt
      var sha = new jsSHA('SHA-512', 'TEXT'); //encryption taking place
      sha.update(hashString);
      var hash = sha.getHash('HEX'); //hashvalue converted to hexvalue
      res.send({hash: hash});  //hashvalue is sent as response
    }
  } catch(err) {
    console.log('error payment:' + err);
  }
};
