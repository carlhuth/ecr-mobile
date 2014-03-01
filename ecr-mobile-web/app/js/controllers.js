function MasterController($scope, Data, Direction) {
    $scope.items = Data.items;

    $scope.showDetail = function(index) {
        var selectedItem = Data.items[index];
        Data.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('../detail.html', {
            title: selectedItem.title
        });
    }

    $scope.direction = Direction.get();
}

function DetailController($scope, Data){
    $scope.item = Data.selectedItem;   
}

function TimeOfWeekController($scope) {

    $scope.typeOptions = [{
        name: 'Weekday',
        value: 'weekday'
    }, {
        name: 'Weekend',
        value: 'weekend'
    }, ];

    $scope.form = {
        type: $scope.typeOptions[0].value
    };
}

function DirectionsController($scope, Direction) {
    $scope.changeDirection = function() {
        Direction.change();
    }
}
