const user_auth_schema_model = require('./schema/user_auth_schema_model');
const post_schema = require('./schema/post_schema');
const category_schema = require('./schema/category_schema');

module.exports = {
    signup: function (data){
        return new Promise((resolve, reject) => {
            user_auth_schema_model.find({"email":data.email}, (findError, result) => {
                if(findError){
                    resolve({
                        submitSuccess: false,
                        user_already_exist: false,
                        db_error: true
                    });
                }
                else if(result.length != 0){
                    resolve({
                        submitSuccess: false,
                        user_already_exist: true,
                        db_error: false
                    });
                }
                else{
                    user_auth_schema_model.create(data, (err, result) => {
                        if(err){resolve({
                            submitSuccess: false,
                            user_already_exist: false,
                            db_error: true
                        });}
                        else{resolve({
                            submitSuccess: true,
                            user_already_exist: false,
                            db_error: false
                        });}
                    })
                }
             })
        })
     },
    login:function (data){
        return new Promise( (resolve, reject) => {
            user_auth_schema_model.find({'email': data.email}, (err, result) =>{
                if(result.length != 0){
                    if(result[0].password === data.password){
                        resolve({
                            loginSuccess: true,
                            emailMatch: true,
                            passwordMatch: true,
                            userInfo: {
                                username: result[0].username,
                                email: result[0].email,
                                fname: result[0].fname,
                                lname: result[0].lname,
                                user_id: result[0]._id
                            }
                        })
                    }
                    else{
                        resolve({
                            loginSuccess: false,
                            emailMatch: true,
                            passwordMatch: false
                        })
                    }
                }
                else{
                    resolve({
                        loginSuccess: false,
                        emailMatch: false,
                        passwordMatch: false
                    })
                }
        
            })
        })
    },
    post_submit: function(body, file){
        return new Promise( (resolve, reject) => {
            post_schema.create({
                date: body.date,
                user_id: body.user_id,
                username: body.username,
                title: body.title,
                category: body.category,
                filename: file.filename,
                mimetype: file.mimetype,
                comments: []
            }, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve({postUploadCompleted: true});
                }
            });
        });
    },
    post_get_all: function(data){
        return new Promise(
            (resolve, reject) => {
                post_schema.find({}, (err, result) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                }).sort({'date': -1});
            }
        )
    },
    get_category: function(){
        return new Promise(
            (resolve, reject) => {
                category_schema.find({}, (err, result) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                }).sort({'categoryname': 1});
            }
        )
    },
    add_category: function(data){
        return new Promise(
            (resolve, reject) => {
                category_schema.create({
                    categoryname: data.categoryname,
                    thumbnail: data.thumbnail
                }, (err, result) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve({add_category_success: true});
                    }
                } 
                )
            }
        )
    },
    add_comment: function(data){
        return new Promise(
            (resolve, reject) => {
                post_schema.updateOne({_id: data._id}, {$set: {comments: data.new_comments}}, 
                        (err, result) => {
                            if(err){
                                reject(err);
                            }
                            else{
                                resolve({add_comment_success: true});
                            }
                        }
                    )
            }
        )
    }
};