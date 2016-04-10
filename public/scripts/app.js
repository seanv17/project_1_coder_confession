/* CLIENT-SIDE JS
 */

var allAliases = [];
var $confessions;

$(document).ready(function() {
  console.log('app.js loaded!');

  var $confessions = $('#confessions');

$.ajax({
  method: 'GET',
  url: 'api/aliases',
  success: getAliasesSuccess,
  error: getAliasesError
});

  // Event listener for confession form submit
  $('#confession-form').on('submit', function(e) {
    e.preventDefault();
    console.log('form check');
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.ajax({
      method: 'POST',
      url: '/api/aliases',
      data: formData,
      success: newAliasSuccess,
      error: newAliasError
    });
  });

  // Event listener to delete a single submission
  $confessions.on('click', '.deleteSubmission', function() {
   $.ajax({
     method: 'DELETE',
     url: '/api/aliases/'+$(this).data('aliasid')+'/confessions/submission/'+$(this).data('submissionid'),
     success: deleteSubmissionSuccess
   });
  });

  // Event listener to delete entire confession (alias, email, confession)
  $confessions.on('click', '.deleteAlias', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/aliases/'+$(this).attr('data-id'),
      success: deletedAliasSuccess,
      error: deletedAliasError
    });
  });

  // Edit songs modal trigger
  $('#editSubmissionModal').on('click', 'button#editSubmissionModal', handleUpdateSubmissionSave);

  function handleUpdateSubmissionSave(event) {
  // build all the submission objects up
  var $modal = $('#editSubmissionModal');
  if($modal.find('form').length < 1) {
    // if there are no form elements, then there are no submission to update
    $modal.modal('hide');
    return;
  }
  // snag the aliasId from the first form object on the modal
  var aliasId = $modal.find('form').data('aliasid');

  var updatedSongs = [];
  $modal.find('form').each(function () {
    // in here this is a form element
    var aConfession = {};
    aSubmission._id = $(this).attr('id');
    aConfession.name = $(this).find('input.submission-name').val();
    console.log('found updated data for song: ', aSong);
    updatedSongs.push(aSong);
  });
  // at this point we should have an array of songs to PUT to the server
  //   this is going to be a lot of requests and after all of them we have to update the page again
  //   maybe we should display a spinner to let the user know the requests are processing ?
  //   but let's just take the easy route - hide the modal and continue processing in the background
  $modal.modal('hide');
  updateMultipleSongs(albumId, updatedSongs);
}

// End of document ready
});

// this function takes a single alias and renders it to the page
  function renderAlias(alias) {
    console.log('rendering alias:', alias);
    var aliasHtml = $('#confession-template').html();
    var aliasTemplate = Handlebars.compile(aliasHtml);
    var html = aliasTemplate(alias);
    $('#confessions').prepend(html);
  }

function getAliasesSuccess(json){
  json.forEach(function(alias){
  console.log("sanity check for app.js");
  renderAlias(alias);
  });
}

function getAliasesError(json){
  console.log('uh ohhhhhhh');
      $('#confession-template').append('Failed to load aliases, is the server working?');
    }

function newAliasSuccess(alias){
  console.log('alias after POST', alias);
  renderAlias(alias);
  $("#confession-form")[0].reset();
  location.reload();
}

function newAliasError(alias){
  console.log('awww-mann something went wrong!');
}

function deleteSubmissionSuccess (json) {
  var alias = json;
  var aliasId = alias._id;
  // find the alias with the correct ID and update it
  for(var index = 0; index < allAliases.length; index++) {
    if(allAliases[index]._id === aliasId) {
      allAliases[index] = alias;
      break;  // we found our submission - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  renderAlias();
  location.reload();
}

function deleteSubmissionError() {
  console.log('delete submission error!');
}

function deletedAliasSuccess(json) {
  var alias = json;
  console.log(json);
  var aliasId = alias._id;
  console.log('delete alias', aliasId);
  // find the alias with the correct ID and remove it from our allAliases array
  for(var index = 0; index < allAliases.length; index++) {
    if(allAliases[index]._id === aliasId) {
      allAliases.splice(index, 1);
      break;
    }
  }
  renderAlias();
  location.reload();
}

function deletedAliasError() {
  console.log('delete alias error!');
}
