/*global define*/

define([
    'underscore',
    'backbone',
    'models/user',
    'localstorage'
], function (_, Backbone, UserModel) {
    'use strict';

    var SessionCollection = Backbone.Collection.extend({
        model: UserModel,
        localStorage: new Store('session-data')
    });

    return SessionCollection;
});
