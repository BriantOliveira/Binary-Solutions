/************************************
 * Main Router File
 ************************************/

 module.exports = (app) => {
     //INDEX
     app.get('/', (req, res) => {
         res.render('index');
     });
 };
