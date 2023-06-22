console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  

}); // end doc ready

function setupClickListeners() {
  // Listener to update koala transfer status
  $( '#viewKoalas' ).on( 'click', '.transfer-btn', transferReady )
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

// initial GET request for ALL koalas
function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then((response) => {
    // create console log to make sure it works
    console.log('GET /koalas response:', response);
    // render koalas
    // render(response);
  })
} // end getKoalas



function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  
  // Post the DATA recieved from the user
  $.ajax({
    method:'POST',
    url:'/koalas',
    data: newKoala
  }).then((response) => {
    // EMPTY THE VALUES
    $('#nameIn').val(''),
    $('#ageIn').val(''),
    $('#genderIn').val(''),
    $('#readyForTransferIn').val(''),
    $('#notesIn').val(''),
    // GET the Koalas
    getKoalas();
    console.log('My response', response);
    // CATCH ANY ERRORS
  }).catch((error) => {
    console.log('Catch any Errors', error);
  })
}

// TODO ADD PUT req to update transfer status
function transferReady() {
  console.log('in transferReady');
  const koalaId = $(this).parent().parent().data('id');

  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`
  }).then((response) => {
    console.log( 'Koala ready for transfer!' );
    getKoalas();
  }).catch((error) => {
    console.log( 'Error changing transfer status', error )
    alert( 'Transfer status NOT updated!' );
    resizeBy.sendstatus(500);
  });
}