$(document).ready(function () {
  const hostname = window.location.hostname
  const url = 'http://' + hostname + ':5001/api/v1/status';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  })

  const amenitiescheck = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenitiescheck[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiescheck[$(this).data('id')];
    }
    const list = Object.values(amenitiescheck);
    if (list.length > 0) {
      $('div.amenities > h4').text(Object.values(amenitiescheck).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
