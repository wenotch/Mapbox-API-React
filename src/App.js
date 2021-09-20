import React, { useEffect, useState } from "react";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function App() {
  const [location, setLocation] = useState([]);
  const getLocation = () => {
    console.log("location getter ran");
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([
        ...location,
        [position.coords.longitude, position.coords.latitude],
      ]);
      console.log(location);
    });
  };
  useEffect(() => {
    getLocation();
  }, []);
  const [viewport, setViewport] = useState({
    latitude: 6.465422,
    longitude: 3.406448,
    zoom: 5,
  });

  const data = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        // [
        //   [-67.13734, 45.13745],
        //   [-66.96466, 44.8097],
        //   [-68.03252, 44.3252],
        //   [-69.06, 43.98],
        //   [-70.11617, 43.68405],
        //   [-70.64573, 43.09008],
        //   [-70.75102, 43.08003],
        //   [-70.79761, 43.21973],
        //   [-70.98176, 43.36789],
        //   [-70.94416, 43.46633],
        //   [-71.08482, 45.30524],
        //   [-70.66002, 45.46022],
        //   [-70.30495, 45.91479],
        //   [-70.00014, 46.69317],
        //   [-69.23708, 47.44777],
        //   [-68.90478, 47.18479],
        //   [-68.2343, 47.35462],
        //   [-67.79035, 47.06624],
        //   [-67.79141, 45.70258],
        //   [-67.13734, 45.13745],
        // ],

        { location },
      ],
    },
  };

  return (
    <>
      <MapGL
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={
          "pk.eyJ1IjoiZW1tYW51ZWxud2Fub2NoaWUiLCJhIjoiY2t0bGozd2YwMDJpcjJ1czh2aHVscmk1eCJ9.XlprBONdRkZdwS4NYdKbGw"
        }
        onViewportChange={setViewport}
        {...viewport}
      >
        <Source id="maine" type="geojson" data={data} />
        <Layer
          id="maine"
          type="fill"
          source="maine"
          paint={{
            "fill-color": "red",
            "fill-opacity": 0.8,
          }}
        />
      </MapGL>

      <button onClick={getLocation}>Pick location</button>
    </>
  );
}
