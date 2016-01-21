/*global angular*/

(function (angular) {
    'use strict';

    angular.module('ui.multiselectDropdown', [])
        .directive('multiselectDropdown', directiveFunction)
        .controller('multiselectDropdownController', ControllerFunction);

    
    // ----- directiveFunction -----
    
    directiveFunction.$inject = [];

    function directiveFunction() {

        var directive = {
            restrict: 'E',
            template: '<div class="multiselect-parent"><div class="multiselect-header drop-toggle" ng-click="vm.showMenu()"><span class="header-text drop-toggle">{{headerText}}</span><span class="down-caret carent-indicator drop-toggle"></span></div><ul class="multiselect-ul" ng-class="{shown : menuShown}"><li class="multiselect-li" ng-if="isSearchable"><input type="search" placeholder="Search" class="multiselect-search" ng-model="vm.searchValue"></li><li class="multiselect-li multiselect-options" ng-repeat="option in optionData" ng-hide="vm.filterData(option)"><a class="multiselect-anchor" ng-click="vm.selectListItems($event)" data-key="{{vm.isObjectArray ? option.key: null}}"><span class="multi-selector" ng-class="{\'icon-checked\': vm.getSelected(option), \'icon-unchecked\': !vm.getSelected(option)}" aria-hidden="true" ng-if="!singleSelect"></span>{{vm.isObjectArray ? option.value : option}}</a></li></ul></div>',
            scope: {
                header: '=',
                optionData: '=',
                selectedEvents: '=',
                singleSelect: '=',
                isSearchable: '=',
                selectedValues: '='
            },
            controller: 'multiselectDropdownController',
            controllerAs: 'vm'  
        };

        return directive;
    }


    // ----- ControllerFunction -----

    ControllerFunction.$inject = ['$scope', '$element', '$document'];

    function ControllerFunction($scope, $element, $document) {
        var self = this;
        var headerText = '';
        var isObjectArray = false;
        $scope.menuShown = false;
        self.selections = [];

        $scope.headerText = $scope.header;
        var options = $scope.optionData;
        // $scope.lists = $scope.optionData;

        $scope.$watch('selectedValues', function() {
            if($scope.selectedValues) {
                self.selections = $scope.selectedValues;
                updateHeaderText(self.selections);
                $scope.selectedEvents(self.selections);
            }
        });

        if(!options || options.length < 1) {
            return;
        }

        if(typeof options[0] === 'object') {
            self.isObjectArray = true;
        }

        $document.on('click', function(evt) {
            if($element !== evt.target && !$element[0].contains(evt.target)) {
                $scope.$apply(function() {
                    $scope.menuShown = false;
                });
            }
        });

        self.selectListItems = function($evt) {
            var currElm = $evt.currentTarget;
            var span = currElm.querySelector('span');

            if (!$scope.singleSelect) {
                if (span.classList.contains('icon-unchecked')) {
                    span.classList.remove('icon-unchecked');
                    span.classList.add('icon-checked');
                } else {
                    span.classList.remove('icon-checked');
                    span.classList.add('icon-unchecked');
                }

                self.selections = getSelectedOptions();
            } else {
                if (self.isObjectArray) {
                    self.selections = [{
                        key: currElm.dataset['key'],
                        value: currElm.textContent.trim()
                    }];
                } else {
                    self.selections = [currElm.textContent.trim()];
                }
            }

            updateHeaderText(self.selections);

            if($scope.selectedEvents && typeof $scope.selectedEvents === 'function') {
                $scope.selectedEvents(self.selections);
            }
        };

        self.showMenu = function() {
            $scope.menuShown = !$scope.menuShown;
        };

        self.filterData = function(data) {
            var value = self.searchValue;
            var isShown = false;
            var entry;

            if(value && value.length > 0) {
                if(typeof data === 'object') {
                    entry = data.value;
                } else {
                    entry = data;
                }

                entry = entry.toLowerCase();
                value = value.toLowerCase();

                if(entry.indexOf(value) === -1) {
                    isShown = true;
                } else {
                    isShown = false;
                }
            }

            return isShown;
        };

        self.getSelected = function(option) {
            var found = false;

            if(typeof option === 'object') {
                var length = self.selections.length;

                for(var inc = 0; inc < length; inc++) {
                    if(self.selections[inc].value === option.value) {
                        found = true;
                    }
                }
            } else {
                found = self.selections.indexOf(option) > -1;
            }

            return found;
        };

        function getSelectedOptions() {
            var elm = $element[0];
            var lists = elm.querySelectorAll('.multiselect-options');
            var selections = [];
            var listLength = lists.length;

            for (var inc = 0; inc < listLength; inc++) {
                var anchor = lists[inc].querySelector('a');
                var span = anchor.querySelector('span');

                if (span.classList.contains('icon-checked')) {
                    if(self.isObjectArray) {
                        selections.push({
                            key: anchor.dataset.key,
                            value: anchor.textContent.trim()
                        });
                    } else {
                        selections.push(anchor.textContent.trim());
                    }
                }
            }

            return selections;
        };

        function updateHeaderText(data) {
            if(!data) {
                return;
            }

            var length = data.length;

            if(data.length === 0) {
                $scope.headerText = $scope.header;
            } else if(length === 1) {
                if(typeof data[0] === 'object') {
                    $scope.headerText = data[0]['value'];
                } else  {
                    $scope.headerText = data[0];
                }
            } else if(length === $scope.optionData.length) {
                $scope.headerText = 'All items selected';
            } else {
                $scope.headerText = length + ' items selected';
            }
        };
    }
} (angular));
