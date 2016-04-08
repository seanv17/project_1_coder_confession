/* CLIENT-SIDE JS
 */

var $confessions;

$(document).ready(function() {
  console.log('app.js loaded!');

  $confession = $('#confession');

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

  $confessions.on('click', '.deleteSong', function() {
   $.ajax({
     method: 'DELETE',
     url: '/api/albums/'+$(this).data('albumid')+'/songs/'+$(this).data('songid'),
     success: deleteSongSuccess
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
