'use strict';

/* Controllers */

var wemoDashControllers = angular.module('wemoDashControllers', []);

wemoDashControllers.controller('DeviceListCtrl', ['$scope', 'Devices',
  function($scope, Devices) {
    $scope.devices = Devices.query();
  }]);
