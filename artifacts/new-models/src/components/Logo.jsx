"use client"

import { useState, useEffect } from "react"

export default function Logo() {
  let a, b, c, d, e

  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

  function loadAPIs() {
    fetch(
      "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY"
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`NASA NEO API returned ${response.status}`)
        }
        return response.json()
      })
      .then(function (nasaData) {
        const nearEarthObjects = nasaData?.near_earth_objects
        const firstObject = nearEarthObjects
          ? Object.values(nearEarthObjects)
              .flat()
              .find((object) => Number.isFinite(object?.absolute_magnitude_h))
          : null

        if (firstObject) {
          a = firstObject.absolute_magnitude_h
          return
        }

        a = 1
        console.warn("NASA NEO response did not contain usable object data.")
      })
      .catch((error) => {
        a = 1
        console.warn("NASA NEO data is unavailable; using a neutral logo input.", error)
      })

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&current=cloud_cover"
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (data.current.cloud_cover == 0) {
          b = 0.1
        } else {
          b = data.current.cloud_cover / 100
        }
      })

    fetch("https://api.citybik.es//v2/networks/citi-bike-nyc")
      .then((x) => x.json())
      .then(function (data) {
        c = data.network.stations[0].free_bikes
      })

    var year = new Date().getFullYear()

    fetch(
      `https://api.gbif.org/v1/occurrence/search?year=${year}&familyKey=5314`
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        d = data.count
      })

    var btcs = new WebSocket("wss://ws.blockchain.info/inv")

    btcs.onopen = function () {
      btcs.send(JSON.stringify({ op: "unconfirmed_sub" }))
    }

    btcs.onmessage = function (onmsg) {
      var response = JSON.parse(onmsg.data)
      var amount = response.x.out[0].value
      var convert = amount / 10000000

      e = parseInt(convert)

      updateLogo()
    }

    const updateLogo = () => {
      let math = (a * b * c * d * e) / 5000

      if (math) {
        setData((prev) => [
          math,
          prev[0],
          prev[1],
          prev[2],
          prev[3],
          prev[4],
          prev[5],
          prev[6],
          prev[7],
        ])
      }
    }
  }

  useEffect(() => {
    loadAPIs()
  }, [])

  return (
    <svg
      id="mySVG"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1569.6 263.1"
      aria-label="New Models"
    >
      <g>
        <path
          className="st0"
          d="M61.1,56.5h43.5l56.7,83.3V56.5h43.9v150.6h-43.9l-56.4-82.7v82.7H61.1V56.5z"
          stroke="black"
          strokeWidth={data[0]}
        ></path>
        <path
          className="st0"
          d="M213.9,56.5h124.7v32.2h-78.1v23.9H333v30.7h-72.4V173h80.3v34.1h-127V56.5z"
          stroke="black"
          strokeWidth={data[1]}
        ></path>
        <path
          className="st0"
          d="M339.5,56.5h44.2l15.9,84.3l23.3-84.3h44l23.3,84.2l15.9-84.2h44L517,207.1h-45.6l-26.4-94.8l-26.3,94.8H373
        L339.5,56.5z"
          stroke="black"
          strokeWidth={data[2]}
        ></path>
        <path
          className="st0"
          d="M636,56.5h61.2l23.6,91.6l23.4-91.6h61.2v150.6h-38.1V92.3l-29.4,114.9h-34.5L674.1,92.3v114.9H636V56.5z"
          stroke="black"
          strokeWidth={data[3]}
        ></path>
        <path
          className="st0"
          d="M816.3,131.9c0-24.6,6.8-43.7,20.5-57.4C850.5,60.8,869.6,54,894,54c25.1,0,44.4,6.7,57.9,20.2
        c13.6,13.5,20.3,32.3,20.3,56.6c0,17.6-3,32-8.9,43.3c-5.9,11.3-14.5,20-25.7,26.3c-11.2,6.3-25.2,9.4-41.9,9.4
        c-17,0-31-2.7-42.2-8.1c-11.1-5.4-20.2-14-27.1-25.7C819.7,164.2,816.3,149.5,816.3,131.9z M862.8,132.1c0,15.2,2.8,26.1,8.5,32.8
        c5.7,6.6,13.3,10,23.1,10c10,0,17.7-3.3,23.2-9.8c5.5-6.5,8.2-18.2,8.2-35c0-14.2-2.9-24.5-8.6-31.1c-5.7-6.5-13.5-9.8-23.3-9.8
        c-9.4,0-16.9,3.3-22.6,10C865.6,105.8,862.8,116.8,862.8,132.1z"
          stroke="black"
          strokeWidth={data[4]}
        ></path>
        <path
          className="st0"
          d="M981,56.5h69.1c13.6,0,24.6,1.8,33,5.5c8.4,3.7,15.3,9,20.8,15.9c5.5,6.9,9.5,15,11.9,24.1
        c2.5,9.2,3.7,18.9,3.7,29.2c0,16.1-1.8,28.6-5.5,37.4c-3.7,8.9-8.7,16.3-15.3,22.3c-6.5,6-13.5,10-21,12
        c-10.2,2.7-19.5,4.1-27.7,4.1H981V56.5z M1027.5,90.6v82.3h11.4c9.7,0,16.6-1.1,20.8-3.2s7.3-5.9,9.7-11.3
        c2.3-5.4,3.5-14.1,3.5-26.1c0-16-2.6-26.9-7.8-32.8c-5.2-5.9-13.8-8.8-25.9-8.8H1027.5z"
          stroke="black"
          strokeWidth={data[5]}
        ></path>
        <path
          className="st0"
          d="M1126.9,56.5h124.7v32.2h-78.1v23.9h72.4v30.7h-72.4V173h80.3v34.1h-127V56.5z"
          stroke="black"
          strokeWidth={data[6]}
        ></path>
        <path
          className="st0"
          d="M1261,56.5h46.5V170h72.6v37.1H1261V56.5z"
          stroke="black"
          strokeWidth={data[7]}
        ></path>
        <path
          className="st0"
          d="M1370.2,157.3l44.3-2.8c1,7.2,2.9,12.7,5.9,16.4c4.8,6.1,11.6,9.1,20.5,9.1c6.6,0,11.8-1.6,15.4-4.7
        c3.6-3.1,5.4-6.7,5.4-10.8c0-3.9-1.7-7.4-5.1-10.5c-3.4-3.1-11.4-6-23.8-8.7c-20.4-4.6-35-10.7-43.7-18.3
        c-8.8-7.6-13.1-17.3-13.1-29.1c0-7.7,2.2-15.1,6.7-21.9c4.5-6.9,11.2-12.3,20.2-16.2c9-3.9,21.4-5.9,37-5.9
        c19.2,0,33.9,3.6,44,10.7c10.1,7.2,16.1,18.5,18,34.2l-43.9,2.6c-1.2-6.8-3.6-11.7-7.3-14.8c-3.7-3.1-8.9-4.6-15.5-4.6
        c-5.4,0-9.5,1.1-12.2,3.4c-2.7,2.3-4.1,5.1-4.1,8.4c0,2.4,1.1,4.6,3.4,6.5c2.2,2,7.4,3.8,15.6,5.5c20.3,4.4,34.9,8.8,43.7,13.3
        c8.8,4.5,15.2,10.1,19.2,16.7c4,6.6,6,14.1,6,22.3c0,9.7-2.7,18.6-8,26.7c-5.3,8.2-12.8,14.3-22.4,18.5c-9.6,4.2-21.7,6.3-36.3,6.3
        c-25.6,0-43.4-4.9-53.2-14.8S1371.5,172.5,1370.2,157.3z"
          stroke="black"
          strokeWidth={data[8]}
        ></path>
      </g>
    </svg>
  )
}
