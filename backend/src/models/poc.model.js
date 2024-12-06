import mongoose,{Schema} from "mongoose";

const PocSchema = new Schema({
    pocNumber:{
        type:Number,
        required:true,
        unique:true
    },
    pocName:{
        type:String,
        required:true,
        unique:true
    },
    head:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Poc = mongoose.model("Poc",PocSchema);
