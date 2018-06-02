var express = require('express');
var router = express.Router();

// Still More Features to Come

router.get( '/', (req,res) => {
    res.send("User file is Open");
});


module.exports=router;