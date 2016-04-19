/* CLIENT-SIDE JS
 */

var allAliases = [];
var $confessions;

$(document).ready(function() {
  console.log('app.js loaded!');

/* TODO: no need to use the var declaration for $confessions (it's declared above at line 5) -jc */
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
  $confessions.on('click', '.deleteSubmission', function() {
    var aliasId = $(this).data('aliasid');
    var submissionId = $(this).data('submissionid');
    console.log('aliasId: ', aliasId);
    console.log('submissionId: ', submissionId);

   $.ajax({
     method: 'DELETE',
     /* TODO: build the url external to the ajax call to make reading code easier -jc */
     url: '/api/aliases/'+ aliasId + '/confessions/submission/'+ submissionId,
     success: deleteSubmissionSuccess
     /* TODO: always include an error handler -jc */
   });
  });

  // Event listener to delete entire confession (alias, email, confession)
  $confessions.on('click', '.deleteAlias', function() {
    $.ajax({
      method: 'DELETE',
      /* TODO: build the url external to the ajax call to make reading code easier -jc */
      url: '/api/aliases/'+$(this).attr('data-id'),
      success: deletedAliasSuccess,
      error: deletedAliasError
    });
  });

  // Event listener to edit confession submission
  /* TODO: fix that weird click one clicks all bug lol -jc */
  $confessions.on('click', '.edit-submission', function(e) {
    e.preventDefault();
    var aliasId = $(this).data('aliasid');
    var submissionId = $(this).data('submissionid');
    console.log('aliasId: ', aliasId);
    console.log('submissionId: ', submissionId);
    var updateUrl = '/api/aliases/' + aliasId + '/confessions/submission/' + submissionId;
    console.log('update URL : ' + updateUrl);

    // when edit button is pressed
    // converts a submission text to an input field
    $(this).siblings(".individualSubmission")
      .html('<input class="edit-submission-text" value="' + $(this).siblings('.individualSubmission').text() + '"></input><button type="button" name="button" class="btn btn-success pull-right">Save</button>');

    // Event listener for updating changes
    $('.btn-success').on('click', function() {
      console.log('aliasId2: ', aliasId);
      console.log('submissionId2: ', submissionId);
      var capturedNewText = $('.edit-submission-text').val();
      console.log('capturedNewText: ', capturedNewText);

      var updateData = {
        aliasId : aliasId,
        submissionId : submissionId,
        newText :  capturedNewText
      };

      console.log('updateData: ', updateData);
      $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData,
        success: handleUpdateSuccess,
        error: handleUpdateError
      });

    });

  });


// End of document ready
});

function handleUpdateSuccess(json) {
  console.log('json: ', json);
  console.log('json.confessions.submission: ', json.confessions[0].submission);
  $('.individualSubmission')
    .html(json.confessions[0].submission);
    /* TODO: remove the save button after the udpate has been saved -jc */
}

function handleUpdateError(json) {
  console.log('Whats up with this json: ', json);
}

// this function takes a single alias and renders it to the page
  function renderAlias(alias) {
    console.log('rendering alias:', alias);
    var aliasHtml = $('#confession-template').html();
    var aliasTemplate = Handlebars.compile(aliasHtml);
    var html = aliasTemplate(alias);
    $('#confessions').prepend(html);
  }

// this function gets all the aliases on doc ready and displays them
function getAliasesSuccess(json){
  json.forEach(function(alias){
  console.log("sanity check for app.js");
  renderAlias(alias);
  });
}

function getAliasesError(json){
  console.log('uh ohhhhhhh');
  /* TODO: generally you don't want the user to see your errors unless it is directly their fault. This is not good to have on the production version. console.log the error and let the developers only see it. -jc */
      $('#confession-template').append('Failed to load aliases, is the server working?');
    }

// success function for creating a new alias (alias, email, confession)
function newAliasSuccess(alias){
  var aliasId = alias._id;
  console.log('alias after POST', alias);
  $('li[data-id=' + aliasId + ']').remove();
  renderAlias(alias);
  $("#confession-form")[0].reset();
}

function newAliasError(alias){
  console.log('awww-mann something went wrong!');
  /* TODO: always console.log your errors -jc */
}

// success function for deleting a submission within an alias
function deleteSubmissionSuccess (data) {
  var alias = json;
  var aliasId = alias._id;

  for(var index = 0; index < allAliases.length; index++) {
    if(allAliases[index]._id === aliasId) {
      allAliases.splice(index, 1);
      break;
    }
  }
  $('div[data-aliasid=' + aliasId + ']').remove();
}

function deleteSubmissionError() {
  console.log('delete submission error!');
  /* TODO: always console.log your errors -jc */

}

// success function to delete entire Alias (alias, email, submission)
function deletedAliasSuccess(json) {
  var alias = json;
  var aliasId = alias._id;

  for(var index = 0; index < allAliases.length; index++) {
    if(allAliases[index]._id === aliasId) {
      allAliases.splice(index, 1);
      break;
    }
  }
$('li[data-id=' + aliasId + ']').remove();
}

function deletedAliasError() {
  console.log('delete alias error!');
  /* TODO: always console.log your errors -jc */

}
