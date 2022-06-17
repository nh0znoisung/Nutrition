import mongoose from "mongoose";

// 13 columns
const schema = new mongoose.Schema({
    // ID
    id: String, // ID
    name: String,
    // 17 columns
    Thaibo: Number,
    Nangluong: Number,
    Protein: Number,
    Proteintv: Number,
    Lipid: Number,
    Lipidtv: Number,
    Cellulose: Number,
    Cholesterol: Number,
    Canxi: Number,
    Phospho: Number,
    Sat: Number,
    Natri: Number,
    Kali: Number,
    Beta_caroten: Number,
    vitA: Number,
    vitB: Number,
    vitC: Number,
}, 
{timestamps: true}
);

// NL, Prodv, Protv, Lipittv, Lipitdv, Glucid, Xo

export const NguyenlieuModel = mongoose.model('Nguyenlieu', schema);