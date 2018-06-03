angular.module('myApp', ['ngTable'])
  .constant('SERVER_URL', 'https://adelaidedenim.com/ppsr/api/v1')
  .controller('ParticipantCtrl', function ($scope, $http, NgTableParams, SERVER_URL, $timeout) {
    // $scope.baseUrl = 'http://localhost/ppsr/api/v1';
    $scope.baseUrl = 'https://adelaidedenim.com/ppsr/api/v1';
    $scope.loading = false;
    $scope.exporting = false;

    $scope.table = new NgTableParams({
      count: 10,
      page: 1
    }, {
        getData: getData
      });

    function getData(params) {
      var npm = params.filter().npm ? params.filter().npm : '';
      return $http.get($scope.baseUrl + '/participants/get-attendants.php?page=' + params.page() + '&limit=' + params.count() + '&npm=' + npm).then(function (response) {
        params.total(response.data.total);
        return response.data.data;
      }).catch(function (err) {
        console.log('err', err);
      });
    }

    $scope.reload = function () {
      $scope.table.reload();
      $timeout(function () {
        $scope.reload();
      }, 3000);
    };

    $scope.reload();
  });