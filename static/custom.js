// Copyright 2021 Julien Nury. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

'use strict';

// Display error function
let displayError = function(message) {
  $('#errorModalLabel').empty().append("Error");
  $('#errorModalMessage').empty().append(message);
  $('#errorModal').modal('show');
}

// Trap errors
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  let message = '<pre>An error occurred in: ' + url + '<br>On line: ' + lineNumber + '<br>Message: ' + errorMsg + '</pre>'
  displayError(message);
  return false;
}

// Post form content
$('#submit-simple').click(function(element) {
  let url = $('#url-simple').val();
  if (url) {
    try {
      let apiUrl = 'api/sslyze';
      let data = {
        'protocol': 'https'

      };
      data.challengeResponse = challengeResponse;
      data.expectedIdentity = expectedIdentity;
      $.ajax({
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(data),
        contentType : 'application/json',
        dataType: "text",
        success: function(data, status, xhr) { $('#remoteStatus').empty().append(data); },
        error: function(request, status, error) { $('#remoteStatus').empty().append('ERROR: ' + request.responseText); }
      });


      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', apiUrl, true);
      xmlhttp.send();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            let response = JSON.parse(xmlhttp.responseText);
          } else {
            displayError('HTTP error: ' + xmlhttp.status);
          }
        }
      };

    } catch (error) {
      displayError('Error: ' + error);
    }
  }
  else {
    displayError('Please enter an URL');
  }
});