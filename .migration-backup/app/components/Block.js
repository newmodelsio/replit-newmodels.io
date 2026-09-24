"use client"

import Image from "next/image"
import Section from "./Section"
import Post from "./Post"

export default function Block({ block }) {
  return (
    <>
      <div className="block" key={block.id}>
        {(() => {
          switch (block.type) {
            case "section":
              return <Section section={block} />
            case "text":
              return (
                <div
                  className={`${block.modifiers} leading-[1.55]`}
                  dangerouslySetInnerHTML={{ __html: block.text }}
                ></div>
              )
            case "image":
              return (
                <div className="flex flex-wrap">
                  {block.link ? (
                    <a href={block.link} target="_blank">
                      <img className="w-full" src={block.src} alt="Decorative image" />
                    </a>
                  ) : (
                    <img className="w-full" src={block.src} alt="Decorative image" />
                  )}
                  {block.caption && (
                    <div
                      className="my-2 text-xs"
                      dangerouslySetInnerHTML={{ __html: block.caption }}
                    ></div>
                  )}
                </div>
              )
            case "post":
              return <Post block={block} />
            case "hr":
              return <hr />
            case "heading":
              return (
                <div
                  className="font-bold mb-5  text-[red] text-4xl leading-tight tracking-[-0.01em] text-center"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                ></div>
              )
            case "embed":
              return (
                <div>
                  <div dangerouslySetInnerHTML={{ __html: block.iframe }}></div>
                </div>
              )
            case "quote":
              return (
                <div
                  dangerouslySetInnerHTML={{ __html: block.text }}
                  className="p-10"
                ></div>
              )
            default:
              return null
          }
        })()}
      </div>
    </>
  )
}
