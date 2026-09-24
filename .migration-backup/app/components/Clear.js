import Block from "./Block"

export default function ClearMinimal({ data }) {

  // console.log(data.columnA)
  return (
    <>
      <div className="grid md:grid-cols-3 divide-x">
        <div className="flex flex-col px-5 gap-5 mb-5">
          <div className="w-full border-t "></div>
          {data.columnA.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
        <div className="flex flex-col px-5 gap-5 mb-5">
          <div className="w-full md:border-t"></div>
          {data.columnB.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
        <div className="flex flex-col px-5 gap-5 mb-5">
          <div className="w-full md:border-t"></div>
          {data.columnC.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </div>
      <div className="p-5 md:border-t">
        <strong>NEWSSTAND</strong>
        <div
          className="columns-2 md:columns-3"
          dangerouslySetInnerHTML={{ __html: data.links }}
        ></div>
      </div>
    </>
  )
}
