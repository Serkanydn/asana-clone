const Joi = require('joi');

const createValidation = Joi.object({
    title: Joi.string().required().min(3),
    sectionId: Joi.string().required().min(8),
    projectId: Joi.string().required().min(8),

    assignedTo: Joi.string().min(8),
    description: Joi.string().min(3),
    dueDate: Joi.date().min(3),
    statuses: Joi.array(),
    order: Joi.number(),
    isComplated: Joi.boolean(),
    comments: Joi.array(),
    media: Joi.array(),
    subTasks: Joi.array(),

})

const updateValidation = Joi.object({
    title: Joi.string().min(3),
    sectionId: Joi.string().min(8),
    projectId: Joi.string().min(8),

    assignedTo: Joi.string().min(8),
    description: Joi.string().min(3),
    dueDate: Joi.date().min(3),
    statuses: Joi.array(),
    order: Joi.number(),
    isComplated: Joi.boolean(),
    comments: Joi.array(),
    media: Joi.array(),
    subTasks: Joi.array(),
})


const commentValidation = Joi.object({
    comment:Joi.string(),
    _id:Joi.string().min(24)
}) 

module.exports = {
    createValidation,
    updateValidation,
    commentValidation
}