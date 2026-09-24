"use client"

import { useState } from "react"
import Link from "next/link"
import Block from "./Block"

export default function Nav({ data }) {
  const [toggleNav, setToggleNav] = useState(false)

  return (
    <div>
      <div
        className="cursor-pointer z-30 fixed top-0 right-0 m-3 md:m-5 bg-zinc-100 text-zinc-700 rounded-full p-2"
        onClick={() => setToggleNav(!toggleNav)}
      >
        {toggleNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        )}
      </div>
      {toggleNav && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full fadeIn cursor-pointer"
            onClick={() => {
              setToggleNav(false)
            }}
          >
            <div className="bg-black opacity-10 w-full h-full"></div>
          </div>
          <div className="bg-white slideIn ease-in-out w-full md:w-1/3 h-screen fixed top-0 right-0 z-20 p-5 md:p-10 flex flex-col gap-5 overflow-y-scroll border-l">
            <div className="flex flex-col gap-5">
              {data.about.map((block) => (
                <Block key={block.id} block={block} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
