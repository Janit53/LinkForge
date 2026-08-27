import mongoose from "mongoose";

// what is compound indexing???
const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ["active", "inactive", "expired"],
        default: "active"
    },
    lastAccessedAt: {
        type: Date,
        default: new Date()
    },
    expiresAt: {
        type: Date,
        default: null
    }

}, { timestamps: true });

export const shortUrl = mongoose.model("shortUrl", shortUrlSchema);
