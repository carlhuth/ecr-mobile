function MasterController($scope, Data, Direction) {

    $scope.items = Data.items;

    $scope.showDetail = function(index) {
        var selectedItem = Data.items[index];
        Data.selectedItem = selectedItem;
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
            $scope.items = Data.items.reverse();
        }
    });
}

function DetailController($scope, Data, Direction) {
    $scope.item = Data.selectedItem;
    $scope.direction = Direction.get();
}

function TimeOfWeekController($scope) {

    var date = new Date(),
        day = date.getDay(), //returns a number between 0-6
        whatsToday = 0;

    // Depending on the day we chose which index of the opens to show
    // We will choose weekend if its Sunday or Saturday
    switch(day) {
        // Sunday
        case 0:
            whatsToday = 1;
            break;
        // Monday
        case 1: 
            whatsToday = 0;
            break;
        // Tuesday
        case 2: 
            whatsToday = 0;
            break;
        // Wednesday
        case 3: 
            whatsToday = 0;
            break;
        // Thursday
        case 4:  
            whatsToday = 0;
            break;
        // Friday
        case 5: 
            whatsToday = 0;
            break;
        // Saturday
        case 6:
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

    $scope.form = {
        type: $scope.typeOptions[whatsToday].value
    };
}
