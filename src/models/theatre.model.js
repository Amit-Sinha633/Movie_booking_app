import mongoose from "mongoose"

const theatreSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        description:{
            type: String
        },
        city:{
            type:String,
            required: true
        },
        pinCode:{
            type: Number,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        movies:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie"
            }
        ]
    },
    {
        timestamps: true
    }
)

const Theatre = mongoose.model("Theatre",theatreSchema)

export default Theatre 