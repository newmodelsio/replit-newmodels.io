export default function FeaturedPost({ featured }) {

  const isGif = featured?.thumbnail?.toLowerCase().endsWith('.gif');

  return (
    <>
      {featured && (
        <div className="flex justify-center my-10">
          <div className="max-w-xl">
            <a href={featured.link} target="_blank">
              {isGif ?
                <img
                  src={featured.thumbnail}
                  alt=""
                  fetchPriority="high"
                />
                :
                <img
                  src={featured.thumbnail}
                  alt=""
                  width={800}
                  height={800}
                  style={{ width: '100%', height: 'auto' }}
                />
              }

              <div className="flex text-center">
                <div
                  className={`p-10 text-4xl font-bold uppercase ${featured.modifiers}`}
                  dangerouslySetInnerHTML={{ __html: featured.text }}
                ></div>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
