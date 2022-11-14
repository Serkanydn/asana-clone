const Mongoose = require('mongoose');
const logger = require('../scripts/logger/projectLogger');

const ProjectSchema = new Mongoose.Schema({
    name: String,
    userId:{
        type:Mongoose.Types.ObjectId,
        ref:'user'
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

// ProjectSchema.pre('save', (next) => {
// console.log("this ",this);
// next();
// })


ProjectSchema.post('save', (doc) => {
    logger.log({
        level: 'info',
        message: doc
    })
})

module.exports = Mongoose.model('project', ProjectSchema)