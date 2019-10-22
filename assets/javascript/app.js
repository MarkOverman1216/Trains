var firebaseConfig = {
  apiKey: 'AIzaSyDME490dn1HIc9--PxeIPSjxxPsnd5IrFc',
  authDomain: 'cookieclicker-65132.firebaseapp.com',
  databaseURL: 'https://cookieclicker-65132.firebaseio.com',
  projectId: 'cookieclicker-65132',
  storageBucket: 'cookieclicker-65132.appspot.com',
  messagingSenderId: '814099208753',
  appId: '1:814099208753:web:7f058d664709b95de01310',
  measurementId: 'G-PNTSKKT8RV',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var database = firebase.database()

$('#addTrain').on('click', function(event) {
  event.preventDefault()
  // Grabs user input
  var name = $('#trainName')
    .val()
    .trim()
  var dest = $('#destination')
    .val()
    .trim()
  var firstTrain = moment(
    $('#firstTrainTime')
      .val()
      .trim(),
    'HH:mm'
  ).format('X')
  var freq = $('#frequency')
    .val()
    .trim()
  // Creates local "temporary" object for holding employee data
  var newEmp = {
    trainName: name,
    destination: dest,
    frequency: freq,
    firstTrainTime: firstTrain,
  }
  // Uploads employee data to the database
  database.ref().push(newEmp)
  // Logs everything to console
  console.log(newEmp)
  // Clears all of the text-boxes
  $('#trainName').val('')
  $('#destination').val('')
  $('#firstTrainTime').val('')
  $('#frequency').val('')
})

database.ref().on('child_added', function(childSnapshot) {
  console.log(childSnapshot.val())
  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName
  var destination = childSnapshot.val().destination
  var frequency = childSnapshot.val().frequency
  var firstTrainTime = moment(childSnapshot.val().firstTrainTime, 'X')

  var minutesAway = frequency - (moment().diff(firstTrainTime, 'minutes') % frequency)
  var nextArrival = moment()
    .add(minutesAway, 'm')
    .format('hh:mm A')
  // Create the new row
  var newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td>').text(frequency),
    $('<td>').text(nextArrival),
    $('<td>').text(minutesAway)
  )
  // Append the new row to the table
  $('#trains').append(newRow)
})
