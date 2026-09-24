import { useState, useEffect } from "react"
import { postDiscord } from "../api/discord"

export default function DiscordSubmit() {
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const submitMessage = async () => {
    setSending(true)
    const response = await postDiscord(message)
    setSuccess(true)
  }

  useEffect(() => {
    setSuccess(false)
  }, [message])

  return (
    <>
      <textarea
        className="w-full bg-[#40454b] mb-1 p-5 rounded outline-none"
        placeholder="Ask the NM Discord"
        onChange={(e) => {
          setMessage(e.target.value)
        }}
      ></textarea>
      {success ? (
        <button
          onClick={submitMessage}
          className="w-full text-center bg-[#2b2d31] p-3 rounded mb-5 pointer-events-none"
        >
          Message Sent
        </button>
      ) : (
        <button
          onClick={submitMessage}
          className="w-full text-center bg-[#748bd9] p-3 rounded mb-5"
        >
          {sending ? "Sending" : "Submit"}
        </button>
      )}
    </>
  )
}
