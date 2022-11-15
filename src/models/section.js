const Mongoose = require('mongoose');

const SectionSchema = new Mongoose.Schema({
    name: String,
    userId: {
        type: Mongoose.Types.ObjectId,
        ref: 'user'
    },
    projectId: {
        type: Mongoose.Types.ObjectId,
        ref: 'project'
    },
    order: Number,
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = Mongoose.model('Section', SectionSchema)