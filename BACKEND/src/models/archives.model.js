import mongoose from "mongoose";

const archivedShortUrlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },

        shortUrl: {
            type: String,
            required: true
        },

        clicks: {
            type: Number,
            required: true,
            default: 0
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["active", "inactive", "expired"],
            default: "expired"
        },

        lastAccessedAt: {
            type: Date,
            default: null
        },

        creationDate: {
            type: Date,
            required: true
        },

        expiredAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

export const archivedShortUrl = mongoose.model("archivedShortUrl", archivedShortUrlSchema);