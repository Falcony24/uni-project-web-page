let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('error', {pageTitle: 'Błąd 404'})
});

module.exports = router;