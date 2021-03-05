require(["esri/config","esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], function (esriConfig, Map, MapView, FeatureLayer) {

esriConfig.apiKey =  "AAPK6221ccc708944717801b1e737e84e229ARkRORCTCsMHPkG82l8m647wlPBVSru5T3Z9cJ0JjaSyfYk-s0mQw-UiHP3Xv8jT"; 

const map = new Map({
          basemap: "arcgis-topographic" // Basemap layer service
        });

const view = new MapView({
          map: map,
          center: [-118.805, 34.027], // Longitude, latitude
          zoom: 13, // Zoom level
          container: "viewDiv" // Div element
        });

  // Define a pop-up for Trailheads
      const popupTrailheads = {
        "title": "Trailhead",
        "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
      }
      
       const trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
        popupTemplate: popupTrailheads
      });

      map.add(trailheads);
  
    // Define a popup for Trails
      const popupTrails = {
        title: "Trail Information",
        content: [{
         type: "media",
          mediaInfos: [{
            type: "column-chart",
            caption: "",
            value: {
              fields: [ "ELEV_MIN","ELEV_MAX" ],
              normalizeField: null,
              tooltipField: "Min and max elevation values"
              }
            }]
        }]
      }
      
      const trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        outFields: ["TRL_NAME","ELEV_GAIN"],
        popupTemplate: popupTrails
      });

      map.add(trails,0);
  
  // Define popup for Parks and Open Spaces
      const popupOpenspaces = {
        "title": "{PARK_NAME}",
        "content": [{
          "type": "fields",
          "fieldInfos": [
            {
              "fieldName": "AGNCY_NAME",
              "label": "Agency",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "TYPE",
              "label": "Type",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "ACCESS_TYP",
              "label": "Access",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },

            {
              "fieldName": "GIS_ACRES",
              "label": "Acres",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },

              "stringFieldOption": "text-box"
            }
          ]
        }]
      }
      
      const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
        outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
        popupTemplate: popupOpenspaces
      });

      map.add(openspaces,0);
  
 });
