"use client"

import { useState } from "react"

export default function Filter({
  allResults,
  filterByYear,
  filterByCategory,
  filterByType,
  handleChange,
  input,
}) {
  const [toggleFilter, setToggleFilter] = useState(true)

  function countItems(key, string) {
    return allResults.filter((item) => {
      return (
        item[key] &&
        item[key].includes(string) &&
        item["title"].toLowerCase().includes(input.toLowerCase())
      )
    }).length
  }

  return (
    <>
      {/* <div
        className="p-5 text-center uppercase text-[11px] border-b cursor-pointer"
        onClick={() => setToggleFilter(!toggleFilter)}
      >
        {toggleFilter ? "Filters –" : "Filters +"}
      </div> */}
      {toggleFilter && (
        <div className="grid  md:grid-cols-3 divide-x w-full uppercase text-sm border-b">
          <div className="flex flex-col p-5">
            <div className="font-bold">Year</div>
            {filterByYear.map((item) => (
              <div
                key={item.slug}
                className="flex gap-[4px] cursor-pointer"
                onClick={() => {
                  handleChange("published", item.slug)
                }}
              >
                <div className="hover:underline">{item.text}</div>
                <div>({countItems("published", item.slug)})</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col p-5">
            <div className="font-bold">Category</div>
            {filterByCategory.map((item) => (
              <div
                key={item.slug}
                className="flex gap-[4px] cursor-pointer"
                onClick={() => {
                  handleChange("tags", item.slug)
                }}
              >
                <div className="hover:underline">{item.text}</div>
                <div>({countItems("tags", item.slug)})</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col p-5">
            <div className="font-bold">Type</div>
            <div
              className="flex gap-[4px] cursor-pointer"
              onClick={() => {
                handleChange("type", "")
              }}
            >
              <div className="hover:underline">All</div>
              <div>({countItems("type", "")})</div>
            </div>
            {filterByType.map((item) => (
              <div
                key={item.slug}
                className="flex gap-[4px] cursor-pointer"
                onClick={() => {
                  handleChange("type", item.slug)
                }}
              >
                <div className="hover:underline">{item.text}</div>
                <div>({countItems("type", item.slug)})</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
