/*global define*/

define([
    'underscore',
    'backbone',
    'models/comment',
    'localstorage'
], function (_, Backbone, CommentModel) {
    'use strict';

    var CommentCollection = Backbone.Collection.extend({
        model: CommentModel,
        localStorage: new Store('comment-data')
    });

    return CommentCollection;
});
