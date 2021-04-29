var google = {
  maps: {
    OverlayView: function () {},
    Marker: function () {},
    InfoWindow: function () {},
    LatLng: function(lat, lng) {
      return [lat, lng];
    },
    Geocoder: function () {},
    Circle: function () {},
    Size: function () {},
    Point: function () {},
    Map: function(obj) {
      return {
        getCenter: function() {
          return {
            lat: function () {
              return 0;
            },
            lng: function () {
              return 0;
            },
          };
        },
      }
    },
    MapTypeId: {ROADMAP: true},
    places: {
      Autocomplete: function() {
        return {
          PlaceResult: function(query) {
            return [];
          },
        }
      },
      AutocompleteService: function() {},
      PlacesService: function(obj) {
        return {
          PlacesServiceStatus: {
            OK: true
          },
          textSearch: function(query) {
            return [];
          },
          nearbySearch: function(query) {
            return [];
          }
        };
      }
    },
    event: {
      addListener: function() {},
    }
  }
};
