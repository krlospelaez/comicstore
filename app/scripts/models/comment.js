/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CommentModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
        	userId: '',
        	userName: '',
        	comicId: '',
        	comment: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return CommentModel;
});
