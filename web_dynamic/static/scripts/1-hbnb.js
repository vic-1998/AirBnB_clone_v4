$(document).ready(function () {
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
