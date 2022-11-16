const Mongoose = require('mongoose');
const logger = require('../scripts/logger/taskLogger');


const TaskSchema = new Mongoose.Schema({

    title: String,
    description: String,
    assignedTo: {
        type: Mongoose.Types.ObjectId,
        ref: 'user'
    },
    dueDate: Date,
    statuses: [String],
    sectionId: {
        type: Mongoose.Types.ObjectId,
        ref: 'section'
    },
    projectId: {
        type: Mongoose.Types.ObjectId,
        ref: 'project'
    },
    userId: {
        type: Mongoose.Types.ObjectId,
        ref: 'user'
    },
    order: Number,
    isComplated: Boolean,
    comments: [
        {
            comment: String,
            commentedAt: Date,
            userId: {
                type: Mongoose.Types.ObjectId,
                ref: 'user'
            },
        }
    ],
    media: [String],
    subTasks: [
        {
            type: Mongoose.Types.ObjectId,
            ref: 'task'
        }
    ]

},
    {
        timestamps: true,
        versionKey: false,
    }
)

TaskSchema.post('save', (doc) => {
    logger.log({
        level: 'info',
        message: doc
    })
})



module.exports = Mongoose.model('task', TaskSchema)