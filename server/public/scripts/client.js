console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
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
    // call saveKoala with the new object
    saveKoala( koalaToSend );

    // Event listener that uses event delegation 
    $('#viewKoalas').on('click', '.delete-button', deleteKoala);

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
    render(response);
  })
} // end getKoalas



function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

// delete a koala with a given id
function deleteKoala() {
  // get the id of the koala to delete
  console.log('in deleteKoala: ', $(this));

  // Use DOM traversal to get the data id of the koalas table row
  const koalaId = $(this).parent().parent().data('id');

  // Send a delete request to the server
  $.ajax({
      method: 'DELETE',
      url: `/koalas/${koalaId}`
  })
      .then((response) => {
        console.log('deleted a koala');
        getKoalas();
      })
      .catch((error) => {
        console.log('Error in delete request - deleteKoala()', error);
        // Notifies the user with an alert window
        alert('Error with deleting a koala');
      })
}


// function render
function render(koalas) {
  $('#viewKoalas').empty();
  // loop through the koalas
  for (let i = 0; i < koalas.length; i++) {
    // if (${koalas[i].ready_to_transfer})
    $('#viewKoalas').append(`
    <tr data-id=${koalas[i].id}>
    <td>${koalas[i].name}</td>
    <td>${koalas[i].age}</td>
    <td>${koalas[i].gender}</td>
    <td>${koalas[i].ready_to_transfer}</td>
    <td>${koalas[i].notes}</td>
    <td>${koalas[i].mark_ready}</td>
    <td>${koalas[i].remove}</td>
    <td><button class='delete-button'>Delete</button></td>
</tr>
    `)
  }
}