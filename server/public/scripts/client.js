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
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
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