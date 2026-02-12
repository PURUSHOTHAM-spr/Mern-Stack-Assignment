import { Schema,model } from "mongoose";
//create comment schema
const userCommentSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String
    },
})
const ArticleSchema=new Schema({
    author:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:[true,"author name is mandatory"]
    },
    title:{
        type:String,
        required:[true,"title is mandatory"]
    },
    category:{
        type:String,
        required:[true,"category is mandatory"]

    },
    content:{
        type:String,
        required:[true,"title is mandatory"]  
    },
        comments:[userCommentSchema],
        isArticleActive:{
            type:Boolean,
            default:true,

        },
    },
        {
                timestamps:true,
                Strict:"throw",
                versionKey:false
        });
        export const ArticleModel=model('author',ArticleSchema)