/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var LoanModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
        	userId: '',
        	comicId: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return LoanModel;
});
