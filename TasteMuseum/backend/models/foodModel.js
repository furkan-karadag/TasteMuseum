import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
        },
        difficulty: {
            type: Number,
            required: true,
        },
        foodType: {
            type: String,
            required: true,
        },
        ingredients: [{
            type: String,
        }],
        cooking: {
            type: String,
        },
        calories: {
            type: Number,
        }
    },
);

const Food = mongoose.model("Food", foodSchema);

export default Food;