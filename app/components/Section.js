"use client"

import { useState } from "react"

import Block from "./Block"

export default function Section({ section }) {
  const [offset, setOffset] = useState(3)

  return (
    <div key={section.title}>
      <div>
        <div className="section flex flex-col gap-5 border-b pb-5">
          {section.title && (
            <div>
              <div className="font-bold uppercase">{section.title}</div>
              <div
                className="text-zinc-400 leading-snug"
                dangerouslySetInnerHTML={{ __html: section.description }}
              ></div>
            </div>
          )}
          {section.posts && (
            <>
              {section.posts.slice(0, offset).map((block) => (
                <Block key={block.id} block={block} />
              ))}
              {section.posts.length > 3 && (
                <div>
                  {section.posts.length - offset > 0 ? (
                    <div
                      className="flex items-center justify-end cursor-pointer text-zinc-800 uppercase text-[10px]"
                      onClick={() => {
                        setOffset(offset + 10)
                      }}
                    >
                      View More{" "}
                      <span className="bg-black text-white font-bold flex justify-center items-center rounded-full px-1 pl-[5px] ml-2">
                        {section.posts.length - offset}+
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-end cursor-pointer text-zinc-800 uppercase text-[10px]"
                      onClick={() => {
                        setOffset(3)
                      }}
                    >
                      Hide
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
