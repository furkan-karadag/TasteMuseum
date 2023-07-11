import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        typeOfUser: {
            type: Number,
        },
        userDetails: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            contactNumber: {
                type: String,
            }
        }
    },

    {
        timestamps: true //Note: Timestamps will be used to save the time of creation or update.
    }
);

const User = mongoose.model("User", userSchema);

export default User;