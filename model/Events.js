const {Schema , model, Types} = require('mongoose')

const eventsModel = new Schema ({

    title : {
        type : String,
        required : true
    },

    notes : {
        type : String
    },

    start : {
        type : Date,
        required : true
    },

    end : {
        type : Date,
        required : true
    },

    user: {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required :true
    }

})
module.exports = model('Events' , eventsModel)