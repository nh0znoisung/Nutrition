import mongoose from 'mongoose';


// Total of 13 attributes => Draw chart
const schema = new mongoose.Schema({
    monanID: String,
    nguyenlieuID: String,
    luongnguyenlieu: Number,
}, 
// Auto create a attribute called createdAt and updatedAt
{timestamps: true}
);

export const MonanNguyenlieuModel = mongoose.model('MonanNguyenlieu', schema);