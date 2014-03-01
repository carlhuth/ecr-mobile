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

    $scope.changeDirection = function() {
        Direction.change();
        $scope.direction = Direction.get();
    }

    $scope.$watch('direction', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log(newValue);
            $scope.items = Data.items.reverse();
        }
    });
}

function DetailController($scope, Data, Direction) {
    $scope.item = Data.selectedItem;
    $scope.direction = Direction.get();
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
