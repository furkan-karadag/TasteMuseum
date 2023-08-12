import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            required: true,
            type: String,
        },
        userType: {
            required: true,
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;