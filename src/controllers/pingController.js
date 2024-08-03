 async function pingCheckController(req, res) {
     return res.status(200).send({
         success: true,
         msg: "API is live "
     });
 }

 module.exports = {
     pingCheckController
 }