// Use data from database (MongoDB) in Model folder
import { NguyenlieuModel } from "../models/NguyenlieuModel.js"; 

export const getNguyenlieu = async (req, res) => {
    try{
        res.render('nguyenlieu', {data: await NguyenlieuModel.find()});
        // const posts = await NguyenlieuModel.find();
        // res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const searchIdNguyenlieu = async (req, res) => {
    // res.send("Hello World. This file from the controller");
    try{
        const id = req.params.id;
        // console.log('id: ', id);
        // const posts = await NguyenlieuModel.find();
        NguyenlieuModel.findOne({_id: id}).lean().exec(function(err,obj){
            if(err) res.status(500).json({message: err.message});
            
            res.render('updateNguyenlieu', {obj: obj, id: id});
        }); // return in place and save

    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const searchNguyenlieu = async (req, res) => {
    try{
        const name = req.body.ten;
        // const id = req.body.id;
        // console.log('id: ', id);
        const data_obj = await NguyenlieuModel.find();
        NguyenlieuModel.findOne({ten: name}, function(err, obj){
            if(err) res.status(500).json({message: err.message});

            if(!obj){
                //Object not found
                res.render('nguyenlieu', {data: data_obj, error: 'Nguyên liệu không tồn tại'});
            }else{
                // res.render('updateNguyenlieu', {obj: obj});
                res.redirect('update/' + obj._id);
            }
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const formNguyenlieu = async (req, res) => {
    try{
        res.render('formNguyenlieu', {error: false});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// Some filters + searching

export const createNguyenlieu = async (req, res) => {
    try {
        const newPost = req.body;
        const name = newPost.ten;

        NguyenlieuModel.findOne({ten: name}, function(err, obj){
            if(err) res.status(500).json({message: err.message});

            if(!obj){
                //Object not found
                const post = new NguyenlieuModel(newPost);
                post.save();    
                res.render('formNguyenlieu', {error: false});
            }else{
                res.render('formNguyenlieu', {error: 'Tên nguyên liệu đã tồn tại'});
            }
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }        
};

export const updateNguyenlieu = async (req, res) => {
    try {
        const id = req.params.id;
        const updatePost = req.body;

        await NguyenlieuModel.findOneAndUpdate({_id: id}, updatePost, {new: true}); // return in place and save

        res.redirect('/nguyenlieu');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }        
};

export const deleteNguyenlieu = async (req, res) => {
    try {
        const id = req.params.id;
        await NguyenlieuModel.deleteOne({_id: id}); // return in place and save
        res.redirect('/nguyenlieu');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }        
};

// export not default