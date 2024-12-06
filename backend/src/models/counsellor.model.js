import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const CounsellorSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true
        },
        department:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
    },{
        timestamps:true
    }
)


//pre save hooks in the mongoose schema
CounsellorSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    //hash the password before saving it to the database 
    this.password = await bcrypt.hash(this.password,10);
    next();
})

//method toc compare the passwords 
CounsellorSchema.methods.isPasswordCorrect = async function(password){
    /*
        This function takes the password entered by the user during login and compares it with the password that is stored in the database.
        as we are using the bcrypt library we have to use it asynchronously. 
    */
    return await bcrypt.compare(password,this.password);
}

//method to generate access token 
CounsellorSchema.generateAccessToken = function(){
    //payload 
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

CounsellorSchema.generateRefrestToken = function(){
    return jwt.sign({
        _id:this_id,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const Counsellor = mongoose.model("Counsellor",CounsellorSchema);