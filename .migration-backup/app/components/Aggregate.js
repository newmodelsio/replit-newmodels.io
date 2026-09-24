"use client"

import Dark from "../components/Dark"
import Toggle from "../components/Toggle"
import Search from "../components/Search"
import { useState } from "react"
import Clear from "../components/Clear"

export default function AltAggregate({ data }) {
  const [toggle, setToggle] = useState("Clear")

  return (
    <>
      <Toggle toggle={toggle} setToggle={setToggle} />
      {(() => {
        switch (toggle) {
          case "Clear":
            return <Clear data={data} />
          case "Dark":
            return <Dark />
          case "Archive":
            return <Search />
          default:
            return null
        }
      })()}
    </>
  )
}
