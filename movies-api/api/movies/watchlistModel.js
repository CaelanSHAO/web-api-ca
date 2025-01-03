import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    movieId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Watchlist', WatchlistSchema);
