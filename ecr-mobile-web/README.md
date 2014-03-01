ECR Mobile App
--

# Use Cases

1. User opens the app for the first time, see the ECR route in northbound or southbound?

2. User opens the app, it will determine if it is a weekday or weekend and change the select at the bottom left.

3. Press the reverse in the bottom right changes it from south <-> north, so clicking on a result is reflected correctly

4. Open the app, click on a station, see the times. Minimize the app, what shows now?

5. On the times table, each hour should be on one line with the current hour highlighted and indented

--

# Application Logic 

App loads, determines whether its weekend or weekday. Was it north bound or south bound from previous time? (can skip for now and always default to north). Clicking on a station should reflect north or south.