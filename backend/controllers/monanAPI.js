// Use data from database (MongoDB) in Model folder
import { MonanModel } from "../models/MonanModel.js"; 

export const getMonan = async (req, res) => {
    try{
        res.render('monan', {data: await MonanModel.find()});
        // const posts = await MonanModel.find();
        // res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};
// Some filters + searching

export const formMonan = async (req, res) => {
    try{
        res.render('formMonan', {error: false});
    }catch{
        res.status(500).json({message: err.message});
    }
}

export const searchIdMonan = async (req, res) => {
    // res.send("Hello World. This file from the controller");
    try{
        const id = req.params.id;
        MonanModel.findOne({_id: id}).lean().exec(function(err,obj){
            if(err) res.status(500).json({message: err.message});
            
            res.render('updateMonan', {obj: obj, id: id});
        }); // return in place and save



    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const searchMonan = async (req, res) => {
    try{
        const name = req.body.ten;
        console.log('name: ', name);
        const data_obj = await MonanModel.find();
        MonanModel.findOne({ten: name}, function(err, obj){
            if(err) res.status(500).json({message: err.message});

            if(!obj){
                //Object not found
                res.render('monan', {data: data_obj, error: 'Món ăn không tồn tại'});
            }else{
                // res.render('updateNguyenlieu', {obj: obj});
                res.redirect('update/' + obj._id);
            }
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const createMonan = async (req, res) => {
    try {
        const newPost = req.body;
        const name = newPost.ten;
        MonanModel.findOne({ten: name}, function(err, obj){
            if(err) res.status(500).json({message: err.message});

            if(!obj){
                //Object not found
                const post = new MonanModel(newPost);
                post.save();            
                res.render('formMonan', {error: false});
            }else{
                res.render('formMonan', {error: 'Tên món ăn đã tồn tại'});
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }        
};

export const updateMonan = async (req, res) => {
    try {
        const id = req.params.id;
        const updatePost = req.body;

        await MonanModel.findOneAndUpdate({_id: id}, updatePost, {new: true}); // return in place and save

        res.redirect('/monan');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }        
};

export const deleteMonan = async (req, res) => {
    try {
        const id = req.params.id;
        await MonanModel.deleteOne({_id: id}); // return in place and save
        res.redirect('/monan');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }        
};

// export not default