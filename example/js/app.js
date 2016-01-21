(function () {
    'use strict';

    angular.module('app', [
            'ui.multiselectDropdown'
        ])
        .controller('MainCtrl', ControllerFunction);

    function ControllerFunction() {
        var self = this;

        self.headerText = 'Array of Strings without Search';
        self.headerText2 = 'Array of Objects';
        self.headerText3 = 'Single Select';

        self.originHeaders = ['Apple', 'Banana', 'Mango'];

        self.originHeaders2 = [
            {key: '1', value: 'Apple'},
            {key: '2', value: 'Banana'},
            {key: '3', value: 'Mango'}
        ];

        self.selected = [{key: '2', value: 'Banana'}];

        self.resetDefaultSelection = function() {
            self.selected = [];
        }

        self.makeSelection = function() {
            self.selected = [
                {key: '2', value: 'Banana'},
                {key: '3', value: 'Mango'}
            ];
        }

        self.originSelectCallback1 = function(data) {
            self.values1 = data;
        };

        self.originSelectCallback2 = function(data) {
            self.values2 = data;
        };

        self.originSelectCallback3 = function(data) {
            self.values3 = data;
        };
    }
} ());