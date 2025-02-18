import mongoose from 'mongoose';

const ValidatedEmailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});

export default mongoose.model('ValidatedEmails', ValidatedEmailSchema);