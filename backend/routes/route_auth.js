const router = require('express').Router();
const api = require('../api');

router.post('/signup', async (req, res) => {
    try{
        let result = await api.signup(req.body);
        if(result.submitSuccess){res.status(201).send(result);}
        else{res.status(200).send(result);}
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/login',  async (req, res) => {
    try{
        let result = await api.login(req.body);
        console.log(req.body);
        if(result.loginSuccess){res.status(201).send(result);}
        else{res.status(202).send(result);}
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;