"use client"

import Linkify from "../utils/linkify"

export default function DiscordPost({ post }) {
  console.log({ post })
  return (
    <>
      <div className="flex flex-col gap-3 text-lg">
        <div className="postContent text-zinc-200  overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: Linkify(post.content) }} />
        </div>
        {post.embeds && (
          <>
            {post.embeds.map((embed, index) => (
              <div
                key={"embed" + index}
                className=" bg-[#2b2d31] rounded border-l-4 p-4 border-zinc-900"
              >
                <a
                  href={embed.url}
                  className="flex flex-col gap-3"
                  target="_blank"
                >
                  <div className="text-[#1daaf9]">{embed.title}</div>
                  <div className="text-zinc-300">{embed.description}</div>
                  {embed.thumbnail && (
                    <div className="rounded overflow-hidden">
                      <img
                        src={embed.thumbnail.url}
                        className="opacity-0 transition-opacity"
                        onLoad={(e) => {
                          e.currentTarget.classList.remove("opacity-0")
                        }}
                        alt=""
                      />
                    </div>
                  )}
                </a>
              </div>
            ))}
          </>
        )}
        {post.attachments && (
          <>
            {post.attachments.map((attachment) => (
              <a href={attachment.url} key={attachment.url} target="_blank">
                <div className=" bg-[#2b2d31] rounded border-l-4 p-4 border-zinc-900 text-[#1daaf9]">
                  <img
                    src={attachment.url}
                    className="opacity-0 transition-opacity"
                    onLoad={(e) => {
                      e.currentTarget.classList.remove("opacity-0")
                    }}
                    alt=""
                  />
                  {attachment.filename}
                </div>
              </a>
            ))}
          </>
        )}
        {post.reactions && (
          <div className="flex gap-3">
            {post.reactions.map((reaction, index) => (
              <div
                key={"emoji" + index}
                className="flex items-center gap-2 bg-zinc-800 p-1 rounded"
              >
                {reaction.emoji.id ? (
                  <img
                    className=" max-w-4 max-h-4"
                    src={
                      "https://cdn.discordapp.com/emojis/" +
                      reaction.emoji.id +
                      ".png"
                    }
                    alt=""
                  />
                ) : (
                  <div>{reaction.emoji.name}</div>
                )}
                <div className="font-bold">{reaction.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
