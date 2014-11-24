/*global define*/

define([
    'underscore',
    'backbone',
    'models/user',
    'localstorage'
], function (_, Backbone, UserModel) {
    'use strict';

    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        localStorage: new Store('user-data') //Backbone.LocalStorage
    });

    return UserCollection;
});
