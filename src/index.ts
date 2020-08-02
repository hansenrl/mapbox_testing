import mapboxgl from "mapbox-gl";
import hexGrid from "@turf/hex-grid";
import distance from "@turf/distance";

import { BBox, Units } from "@turf/turf";
import "./styles.css";
// analysis with turf https://docs.mapbox.com/help/tutorials/analysis-with-turf/

var center = { lon: -122.67, lat: 45.52 };

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFuc2VucmwiLCJhIjoiY2tkM3pxMWFnMXM5czJ1cXlhcW5mdndocyJ9.aJUQS0SZUHnSqGudprJloQ";
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/light-v10", // stylesheet location
  center: center, // starting position
  zoom: 12 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

var hospitals = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        Name: "VA Medical Center -- Leestown Division",
        Address: "2250 Leestown Rd"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.539487, 38.072916]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "St. Joseph East",
        Address: "150 N Eagle Creek Dr"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.440434, 37.998757]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Central Baptist Hospital",
        Address: "1740 Nicholasville Rd"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.512283, 38.018918]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "VA Medical Center -- Cooper Dr Division",
        Address: "1101 Veterans Dr"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.506483, 38.02972]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Shriners Hospital for Children",
        Address: "1900 Richmond Rd"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.472941, 38.022564]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Eastern State Hospital",
        Address: "627 W Fourth St"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.498816, 38.060791]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Cardinal Hill Rehabilitation Hospital",
        Address: "2050 Versailles Rd"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.54212, 38.046568]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "St. Joseph Hospital",
        ADDRESS: "1 St Joseph Dr"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.523636, 38.032475]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "UK Healthcare Good Samaritan Hospital",
        Address: "310 S Limestone"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.501222, 38.042123]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "UK Medical Center",
        Address: "800 Rose St"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.508205, 38.031254]
      }
    }
  ]
};
var libraries = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        Name: "Village Branch",
        Address: "2185 Versailles Rd"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.548369, 38.047876]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Northside Branch",
        ADDRESS: "1733 Russell Cave Rd"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.47135, 38.079734]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Central Library",
        ADDRESS: "140 E Main St"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.496894, 38.045459]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Beaumont Branch",
        Address: "3080 Fieldstone Way"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.557948, 38.012502]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Tates Creek Branch",
        Address: "3628 Walden Dr"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.498679, 37.979598]
      }
    },
    {
      type: "Feature",
      properties: {
        Name: "Eagle Creek Branch",
        Address: "101 N Eagle Creek Dr"
      },
      geometry: {
        type: "Point",
        coordinates: [-84.442219, 37.999437]
      }
    }
  ]
};

var bbox: BBox = [-122.8, 45.4, -122.5, 45.6];
var cellSide = 0.05;
var options = {
  units: "miles" as Units
};

var hexgridBig = hexGrid(bbox, cellSide, options);
var hexgridSmall = hexGrid(bbox, cellSide * 5, options);

map.on("load", function() {
  /*
  map.addLayer({
    id: 'hospitals',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: hospitals
    },
    layout: {
      'icon-image': 'hospital-15',
      'icon-allow-overlap': true
    },
    paint: {}
  });
  map.addLayer({
    id: 'libraries',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: libraries
    },
    layout: {
      'icon-image': 'library-15'
    },
    paint: {}
  });
  */

  map.addSource("hexgrid", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: []
    }
  });
});

//var popup = new mapboxgl.Popup();

map.on("mousemove", function(e) {
  /*
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['hospitals', 'libraries']
  });
  if (!features.length) {
    popup.remove();
    return;
  }
  var feature = features[0];

  popup.setLngLat(feature.geometry.coordinates)
    .setHTML(feature.properties.Name)
    .addTo(map);

  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
  */
});

var oldZoom = 12;

map.on("zoomend", function(e) {
  // Return any features from the 'libraries' layer whenever the map is clicked
  /*
  var libraryFeatures = map.queryRenderedFeatures(e.point, {
    layers: ['libraries']
  });
  if (!libraryFeatures.length) {
    return;
  }
  var libraryFeature = libraryFeatures[0];

  // Using Turf, find the nearest hospital to library clicked
  var nearestHospital = turf.nearest(libraryFeature, hospitals);
  */
  // If a nearest library is found
  if (true) {
    // Update the 'nearest-library' data source to include
    // the nearest library
    var zoomDiff = Math.abs(map.getZoom() - oldZoom);
    if (zoomDiff < 1) {
      return;
    }
    var newHexgrid;
    console.log(map.getZoom());
    if (map.getZoom() > 13) {
      newHexgrid = hexgridBig;
      oldZoom = map.getZoom();
    } else {
      newHexgrid = hexgridSmall;
      oldZoom = map.getZoom();
    }

    map.getSource("hexgrid").setData(newHexgrid);
    /* map.getSource('hexgrids').setData({
      type: 'FeatureCollection',
      features: [
        nearestHospital
      ]
    }); */
    // Create a new circle layer from the 'nearest-library' data source
    if (map.getLayer("hexgrid")) map.removeLayer("hexgrid");
    map.addLayer({
      id: "hexgrid",
      type: "fill",
      source: "hexgrid",
      paint: {
        "fill-color": "#00ffff",
        "fill-opacity": 0.5
      }
    });
  }
});

map.on("moveend", function(e) {
  var mapBounds = map.getBounds();
  var padding = 0.1;
  var newBbox: BBox = [
    mapBounds.getWest() - padding,
    mapBounds.getSouth() - padding,
    mapBounds.getEast() + padding,
    mapBounds.getNorth() + padding
  ];

  var boxDistance_km =
    mapBounds.getSouthEast().distanceTo(mapBounds.getSouthWest()) / 1000.0;
  var desiredCellSize_km = boxDistance_km / 10;

  var newHexgrid = hexGrid(newBbox, desiredCellSize_km, {
    units: "kilometers" as Units
  });
  console.log(
    `Bounding box is: ${newBbox}, cell size is: ${desiredCellSize_km}`
  );

  map.getSource("hexgrid").setData(newHexgrid);
  // Create a new circle layer from the 'nearest-library' data source
  if (map.getLayer("hexgrid")) map.removeLayer("hexgrid");
  map.addLayer({
    id: "hexgrid",
    type: "fill",
    source: "hexgrid",
    paint: {
      "fill-color": "#00ffff",
      "fill-opacity": 0.5
    }
  });
});
