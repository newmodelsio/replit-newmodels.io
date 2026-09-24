import { useState, useEffect } from "react"
import { postDiscord } from "../api/discord"

export default function DiscordSubmit() {
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const submitMessage = async () => {
    if (!message.trim() || sending) return
    setSending(true)
    setError("")
    try {
      await postDiscord(message.trim())
      setSuccess(true)
    } catch {
      setError("Message could not be sent. Please try again later.")
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    setSuccess(false)
  }, [message])

  return (
    <>
      <textarea
        className="w-full bg-[#40454b] mb-1 p-5 rounded outline-none"
        placeholder="Ask the NM Discord"
        value={message}
        maxLength={2000}
        onChange={(e) => {
          setMessage(e.target.value)
          setError("")
        }}
      ></textarea>
      {error && <p role="alert" className="mb-2 text-sm text-red-300">{error}</p>}
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
          disabled={sending || !message.trim()}
          className="w-full text-center bg-[#748bd9] p-3 rounded mb-5"
        >
          {sending ? "Sending" : "Submit"}
        </button>
      )}
    </>
  )
}
