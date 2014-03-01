function MasterController($scope, RouteData, Direction) {

    $scope.items = RouteData.items;

    $scope.showDetail = function(index) {
        var selectedItem = RouteData.items[index];
        RouteData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('../detail.html', {
            title: selectedItem.title
        });
    };

    $scope.direction = Direction.get();

    $scope.changeDirection = function() {
        Direction.change();
        $scope.direction = Direction.get();
    };

    $scope.$watch('direction', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log(newValue);
            $scope.items = RouteData.items.reverse();
        }
    });
}

function DetailController($scope, RouteData, Direction) {
    $scope.item = RouteData.selectedItem;
    $scope.direction = Direction.get();
}

function TimeOfWeekController($scope, Date) {

    var day = Date.getDay(),
        whatsToday = 0,
        timeOfTheWeek = '';

    // Depending on the day we chose which index of the opens to show
    // We will choose weekend if its Sunday or Saturday
    switch (day) {
        case 0: // Sunday
            whatsToday = 1;
            break;
        case 1: // Monday
            whatsToday = 0;
            break;
        case 2: // Tuesday
            whatsToday = 0;
            break;
        case 3: // Wednesday
            whatsToday = 0;
            break;
        case 4: // Thursday
            whatsToday = 0;
            break;
        case 5: // Friday
            whatsToday = 0;
            break;
        case 6: // Saturday
            whatsToday = 1;
            break;
        default:
            // If date broke and we dont have a match, lets assume its a weekday
            whatsToday = 0;
            break;
    }

    $scope.typeOptions = [{
        name: 'Weekday',
        value: 'weekday'
    }, {
        name: 'Weekend',
        value: 'weekend'
    }];

    timeOfTheWeek = $scope.typeOptions[whatsToday].value;

    // save the global state so other controller can access it
    Date.setTimeOfTheWeek(timeOfTheWeek); 

    $scope.form = {
        type: timeOfTheWeek
    };
}
