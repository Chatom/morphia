function initializeJS() {
  jQuery('.releasePicker').selectpicker();
  jQuery('.releasePicker').change(toggleDownload);
  jQuery('.distroPicker').bootstrapToggle();
  jQuery('.distroPicker').change(toggleDownload);

  var clipboard = new ZeroClipboard(jQuery(".clipboard button"));
  var clipBridge = $('#global-zeroclipboard-html-bridge');
  clipBridge.tooltip({title: "copy to clipboard", placement: 'bottom'});
  clipboard.on( 'copy', function(event) {
    clipBridge.attr('title', 'copied').tooltip('fixTitle').tooltip('show');
    $('#global-zeroclipboard-html-bridge').tooltip({title: "copied", placement: 'bottom'});
    var button = jQuery(".clipboard button");
    button.addClass('btn-success');
    clipboard.clearData();
    prefix = $('.distroPicker').prop('checked') ? "#maven" : "#gradle"
    releaseVersion = $('.releasePicker').selectpicker().val();
    activeSample = prefix + "-" + releaseVersion;
    clipboard.setText($(activeSample).text());

    button.animate({ opacity: 1 }, 400, function() {
      button.removeClass('btn-success');
      clipBridge.attr('title', 'copy to clipboard').tooltip('hide').tooltip('fixTitle');
    });
  });
};

var toggleDownload = function() {
  downloadLink = 'https://oss.sonatype.org/content/repositories/releases/org/mongodb/morphia/morphia';
  prefix = $('.distroPicker').prop('checked') ? "#maven" : "#gradle"
  releaseVersion = $('.releasePicker').selectpicker().val();
  activeVersion = $('.releasePicker option:selected').text();

  $('.releasePicker').selectpicker('refresh');

  activeSample = prefix + "-" + releaseVersion;
  activeLink = downloadLink +'/' + activeVersion + '/';

  $('.download').addClass('hidden');
  $(activeSample).removeClass('hidden');
  $('#downloadLink').attr('href', activeLink);
};

jQuery(document).ready(function(){
  initializeJS();
  jQuery('[data-toggle="tooltip"]').tooltip();
  jQuery("body").addClass("hljsCode");
  hljs.initHighlightingOnLoad();
});
