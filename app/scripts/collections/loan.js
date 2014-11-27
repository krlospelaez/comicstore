/*global define*/

define([
    'underscore',
    'backbone',
    'models/loan',
    'localstorage'
], function (_, Backbone, LoanModel) {
    'use strict';

    var LoanCollection = Backbone.Collection.extend({
        model: LoanModel,
        localStorage: new Store('loan-data')
    });

    return LoanCollection;
});
