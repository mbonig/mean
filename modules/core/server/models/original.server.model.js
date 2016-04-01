'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Original Schema
 */
var OriginalSchema = new Schema({
    name: {
        required: 'Please enter a name',
        type: String
    },
    description: String,
    imageId: Schema.ObjectId,
    position: Number,
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

OriginalSchema.index({'$**': 'text'});
mongoose.model('Original', OriginalSchema);
