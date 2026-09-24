"use client"

import { useMemo, useState, useEffect } from "react"
import Filter from "./Filter"

export default function Search({ data }) {
  const [results, setResults] = useState()
  const [input, setInput] = useState("")

  const archive = data.archive
  const filterByYear = useMemo(() => {
    const years = new Set(
      archive
        .map((item) => item.published.match(/^\d{4}/)?.[0])
        .filter(Boolean),
    )
    return [...years]
      .sort((a, b) => b.localeCompare(a))
      .map((year) => ({ slug: year, text: year }))
  }, [archive])
  const filterByCategory = useMemo(() => {
    const counts = new Map()
    archive.forEach((item) => {
      item.tags.split(",").forEach((tag) => {
        const normalized = tag.trim()
        if (normalized) counts.set(normalized, (counts.get(normalized) ?? 0) + 1)
      })
    })
    return [...counts]
      .filter(([, count]) => count >= 10)
      .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
      .slice(0, 30)
      .map(([tag]) => ({ slug: tag, text: tag }))
  }, [archive])
  const filterByType = useMemo(() => {
    const types = new Set(archive.map((item) => item.type).filter(Boolean))
    return [...types].sort().map((type) => ({ slug: type, text: type }))
  }, [archive])

  function handleChange(key, value) {
    const updatedResults = archive.filter((item) => {
      return (
        item[key].toLowerCase().includes(value.toLowerCase()) &&
        item.title.toLowerCase().includes(input.toLowerCase())
      )
    })
    setResults(updatedResults)
  }

  useEffect(() => {
    setResults(archive)
  }, [archive])

  useEffect(() => {
    if (input) {
      handleChange("title", input)
    }
  }, [input])

  return (
    <>
      <div className="w-full border-b divide-x divide-zinc-300">
        <div className="flex justify-center">
          <div className="flex w-full md:w-1/3 px-5">
            <input
              className="p-5 w-full text-center uppercase text-sm"
              type="text"
              placeholder="Search New Models"
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            <svg
              id="search"
              className="w-[20px] opacity-40"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5 11a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Zm-.797 5.61a8 8 0 1 1 .948-1.163l5.331 4.479-.964 1.148-5.315-4.464Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {data ? (
        <>
          <Filter
            allResults={archive}
            filterByYear={filterByYear}
            filterByCategory={filterByCategory}
            filterByType={filterByType}
            handleChange={handleChange}
            input={input}
          />
          <br />
          {results?.length > 0 ? (
            <div className="p-5 md:columns-3 gap-5 min-h-screen">
              {results.map((result, index) => (
                <div
                  key={"result" + index}
                  className="flex flex-col mb-5 break-inside-avoid-column	"
                >
                  <a href={result.link} target="_blank">
                    <div className="flex gap-2">
                      <div
                        className="text-xs"
                        dangerouslySetInnerHTML={{ __html: result.published }}
                      ></div>
                      <div className="flex gap-2 text-xs uppercase">
                        {result.type?.includes("audio") && <div>🎧</div>}
                        {result.type?.includes("video") && <div>📹</div>}
                      </div>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: result.title }}
                    ></div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 min-h-screen">{/* No results found */}</div>
          )}
        </>
      ) : (
        <>
          <div className="p-5 md:columns-3 min-h-screen">
            {(() => {
              const arr = []
              for (let i = 0; i < 30; i++) {
                arr.push(
                  <div
                    key={i}
                    className="w-full h-[20px] bg-zinc-100 mb-5 rounded animate-pulse"
                  ></div>
                )
              }
              return arr
            })()}
          </div>
        </>
      )}
    </>
  )
}
