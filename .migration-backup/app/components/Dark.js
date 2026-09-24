import DiscordPost from "../components/DiscordPost"
import DiscordSubmit from "../components/DiscordSubmit"
import { useState, useEffect } from "react"
import { getDiscord } from "../api/discord"

const Placeholder = () => (
  <div className="flex flex-col gap-5 animate-pulse">
    <div className="w-full bg-[#2b2d31] aspect-square rounded"></div>
    <div className="flex flex-col gap-2">
      <div className="w-full bg-[#2b2d31] p-3 rounded"></div>
      <div className="w-full bg-[#2b2d31] p-3 rounded"></div>
    </div>
  </div>
)

export default function Dark() {
  const [topLinks, setTopLinks] = useState([])
  const [discordReplies, setDiscordReplies] = useState([])
  const [bulletinBoard, setBulletinBoard] = useState([])

  const getTopLinks = async () => {
    const response = await getDiscord("834797161081602088")
    setTopLinks(response)
  }

  const getDiscordReplies = async () => {
    const response = await getDiscord("844287069345939506")
    setDiscordReplies(response.filter((item) => item.referenced_message))
  }

  const getBulletinBoard = async () => {
    const response = await getDiscord("932043003055456336")
    setBulletinBoard(response)
  }

  useEffect(() => {
    getTopLinks()
    getDiscordReplies()
    getBulletinBoard()
  }, [])

  return (
    <>
      <div className="md:hidden top-0 overflow-y-scroll p-5 border-b border-zinc-600 flex gap-5 justify-between uppercase text-[11px] bg-[#36393f] text-zinc-300">
        <div className="flex w-full gap-5 justify-between ">
          <a href="#top-links">#TOP-LINKS</a>
          <a href="#nm-discord-replies">#NM-DISCORD-REPLIES</a>
          <a href="#bulletin-board">#BULLETIN-BOARD</a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-x overflow-hidden divide-zinc-800 bg-[#36393f] text-white font-discord min-h-screen">
        <div id="top-links" className="flex flex-col gap-5 p-5">
          <div className="hidden md:block">#TOP-LINKS</div>
          {topLinks.length ? (
            <>
              {topLinks.slice(0, 10).map((post) => (
                <DiscordPost key={post.id} post={post} />
              ))}
            </>
          ) : (
            <Placeholder />
          )}
        </div>
        <div id="nm-discord-replies" className="flex flex-col gap-5 p-5">
          <DiscordSubmit />
          <div>#NM-DISCORD-REPLIES</div>
          {discordReplies.length ? (
            <>
              {discordReplies.slice(0, 5).map((post) => (
                <>
                  <div className="bg-[#2b2d31] rounded border-l-4 p-4 text-zinc-300 border-zinc-900">
                    {post.referenced_message?.content}
                  </div>
                  <DiscordPost key={post.id} post={post} />
                </>
              ))}
            </>
          ) : (
            <Placeholder />
          )}
        </div>
        <div id="bulletin-board" className="flex flex-col gap-5 p-5">
          <div>#BULLETIN-BOARD</div>

          {bulletinBoard.length ? (
            <>
              {bulletinBoard.slice(0, 10).map((post) => (
                <DiscordPost key={post.id} post={post} />
              ))}
            </>
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </>
  )
}
