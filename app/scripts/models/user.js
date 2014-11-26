/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
        	sessionId: '',
        	userName: '',
        	password: '',
        	fullName: '',
        	email: '',
        	userSince: '',
        	picture: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png'
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return UserModel;
});
