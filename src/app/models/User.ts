import mongoose, {Schema , Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date
}

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isMessageAccepting:boolean;
    isVerified:boolean;
    messages:Message[];
}

const MessageSchema = new Schema<Message>({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
const UserSchema = new Schema<User>({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        // match:[,"enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"password should has atleast 8 characters"],
        minlength:8,
        min:8
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifyCodeExpiry:{
        type:Date,
        required:true
    },
    isMessageAccepting:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default userModel;