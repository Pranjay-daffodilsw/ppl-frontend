const router = require('express').Router();
const api = require('../api');
const multer = require('multer');
const multerDiskStorage_posts = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../src/fileUploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload_post = multer({storage: multerDiskStorage_posts});
const multerDiskStorage_thumb = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../public/images/category')
    },
    filename: function(req, file, cb){
        cb(null, req.body.newcategory)
    }
})
const upload_category = multer({storage: multerDiskStorage_thumb});


router.post('/submit', upload_post.single('image_file'), async (req, res) => {
    try{
        let result = await api.post_submit(req.body, req.file);
        res.sendStatus(200);
    }
    catch(err){
        res.status(500).send(err);
    }
})
router.get('/get/all', async (req, res) => {
    console.log('all post backend call accepted');
    try{
        let data = null;
        let result = await api.post_get_all(data);
        res.status(200).send(result);
    }
    catch(err){
        console.log('post_get_all error - ', err);
        res.status(500).send(err);
    }
})
router.get('/get_category', async (req, res) => {
    try{
        let result = await api.get_category();
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
})
router.post('/post_category', upload_category.single('thumbnail'), async (req, res) => {
    try{
        let result = await api.add_category({categoryname: req.body.newcategory, thumbnail: req.body.newcategory});
        res.status(201).send(result);
        console.log('backend post_category result - ', result);
    }
    catch(err){
        res.status(500).send(err);
        console.log('backend post_category error - ', err);
    }
})
router.post('/add_comment', async (req, res) => {
    try{
        
        let result = await api.add_comment({
            _id: req.body._id,
            new_comments: req.body.new_comments
        })
        res.status(201).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
})



module.exports = router;