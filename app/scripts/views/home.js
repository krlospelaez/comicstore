/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/home.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},
        
        el: '.general-view',

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
        	//this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template());
            console.log(this.$el);
            return this;
        }
    });

    return HomeView;
});
