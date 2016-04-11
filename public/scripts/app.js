/* CLIENT-SIDE JS
 */

var allAliases = [];
var $confessions;

$(document).ready(function() {
  console.log('app.js loaded!');

  var $confessions = $('#confessions');
  var $confessionform = $('#confession-form');

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

  // Event listener for deleting a submission
  $confessions.on('click', '.row-of-confession', function() {
    var submissionId = $(this).data('submission-id');
    var aliasId = $(this).closest('form').data('alias-id');
    console.log('submissionId: ', submissionId);
    console.log('aliasId: ', aliasId);
   $.ajax({
     method: 'DELETE',
     url: '/api/aliases/'+ aliasId + '/confessions/submission/'+ submissionId,
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

//Event listener to edit a submission
/*  $confessionform.on('click', 'edit-submission', function () {
    $('#confession-form input').val('');
    $('#confession-form textarea').val('');
    var editSubmissionId = $(this).data('submissionId');
    console.log('editSubmissionId: ', editSubmissionId);

    $('#editSubmissionModal').attr('data-aliasId', editSubmissionId);
    $('#editSubmissionModal').modal('show');

      $('#editSubmissionModalSubmit').on('click', function(e) {
        e.preventDefault();
        $(this).off('click');
        console.log('editSubmissionId: ', editSubmissionId);
        $('#editSubmissionModal').modal('hide');
        var modalData = $('#confession-form').serialize();
        console.log('modalData: ', modalData);

          $.ajax({
            method: 'PUT',
            url: '/api/aliases/' + aliasId + 'confessions/submission/' +
          })
      });
  });*/


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

function deleteSubmissionSuccess (data) {
  var submissionId = data._id;
  var $formRow = $('span#' + submissionId);
  // since aliasId isn't passed to this function, we'll deduce it from the page
  var aliasId = $formRow.data('alias-id');
  // remove that alias edit form from the page
  $formRow.remove();
  fetchandReRenderAliasWithId(aliasId);
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

function fetchandReRenderAliasWithId(aliasId) {
  $.get('/api/aliases/' + aliasId, function(data) {
    // remove the current instance of the alias from the page
    $('button[data-alias-id=' + aliasId + ']').remove();
    // re-render it with the new alias data (including submissions)
    renderAlias(data);
  });
}
