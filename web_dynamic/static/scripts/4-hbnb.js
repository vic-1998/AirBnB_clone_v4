$(document).ready(function () {
  const url = 'http://' + hostname + ':5001/api/v1/status';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  })

  loadPlaces();

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

  $('BUTTON').click(function () {
    loadPlaces(JSON.stringify({ 'amenities': Object.keys(amenitiescheck) }))
  });
});

const hostname = window.location.hostname

const showPlaces = function (data) {
  $('SECTION.places').empty();
  $('SECTION.places').append(data.map(place => {
    sEnd = function (num) {
      return num != 1 ? "s" : ""
    }
    return `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">
                  ${place.price_by_night}
                </div>
              </div>
              <div class="information">
                <div class="max_guest">
                  ${place.max_guest} Guest${sEnd(place.max_guest)}
                </div>
                <div class="number_rooms">
                  ${place.number_rooms} Bedroom${sEnd(place.number_rooms)}
                </div>
                <div class="number_bathrooms">
                  ${place.number_bathrooms} Bathroom${sEnd(place.number_bathrooms)}
                </div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`;
  }));
}

const loadPlaces = function (filters = '{}') {
  $.ajax({
    url: 'http://' + hostname + ':5001/api/v1/places_search/',
    type: 'POST',
    data: filters,
    contentType: 'application/json',
    dataType: 'json',
    success: showPlaces
  });
}
