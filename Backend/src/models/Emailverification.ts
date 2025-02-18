import mongoose from 'mongoose';

const EmailVerificationSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true } // Expire après 10 minutes
});

export default mongoose.model('EmailVerification', EmailVerificationSchema);