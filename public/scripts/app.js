/* CLIENT-SIDE JS
 */

var $confessions;
var allAliases = [];

$(document).ready(function() {
  console.log('app.js loaded!');

  $confessions = $('#confessions');

$.ajax({
  method: 'GET',
  url: 'api/aliases',
  success: getAliasesSuccess,
  error: getAliasesError
});

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

  $confessions.on('click', '.deleteSubmission', function() {
   $.ajax({
     method: 'DELETE',
     url: '/api/aliases/'+$(this).data('aliasid')+'/confessions/submission/'+$(this).data('submissionid'),
     success: deleteSubmissionSuccess
   });
 });

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
}

function newAliasError(alias){
  console.log('awww-mann something went wrong!');
}

function deleteSubmissionSuccess(json) {
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
}
