const {mongoose} = require("../bd/conexion");

const productoSchema = new mongoose.Schema({
    producto: {
        type:String,
        required:true
    },
    descripcion: {
        type:String,
        required:true
    },
    precio: {
        type:String,
        required:true
    },
    status: {
        type:Boolean,
        default:true
        
    },   
});

module.exports = mongoose.model("producto", productoSchema); //