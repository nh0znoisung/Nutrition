import mongoose from 'mongoose';


// Total of 13 attributes => Draw chart
const schema = new mongoose.Schema({
    id: String,
    name: String,
    image:
    {
        data: Buffer,
        contentType: String
    },
    unit: String,
    min: Number, //
    max: Number,

    time: [Boolean], //6 types, true or false
    // sang: Boolean, 
    // giua_sang: Boolean,
    // trua: Boolean,
    // giua_trua: Boolean,
    // toi: Boolean,
    // dem: Boolean,

    chinh: Number, //0: chinh, 1:phụ, 2: rau, 3:tráng miệng

    list_nguyenlieu: [{String: Number}], // or new schema
    list_monan: [String], 
    
}, 
// Auto create a attribute called createdAt and updatedAt
{timestamps: true}
);

export const MonanModel = mongoose.model('Monan', schema);