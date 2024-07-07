import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    whoIsChecked: {
        type: String,
        default:"",
    },
    whatIsCheckedId: {
        type: String,
        default:"",
    },
    isChecked: {
        type: Boolean,
        default: false,
    },

});

const Like = mongoose.models.likes || mongoose.model("likes", likeSchema);

export default Like;