import { Fragment } from "react"

// Keep Discord text as React text nodes. Never turn user-authored content into HTML.
const tokenPattern = /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|[\w.+-]+@[\w.-]+\.[a-z]{2,}|<:\w+:\d+>|<@!?\d+>/gi

export default function Linkify(inputText = "") {
  const parts = []
  let last = 0
  for (const match of inputText.matchAll(tokenPattern)) {
    const start = match.index
    if (start > last) parts.push(inputText.slice(last, start))
    const value = match[0]
    const key = `${start}-${value}`
    if (/^<:\w+:(\d+)>$/.test(value)) {
      const id = value.match(/\d+/)[0]
      parts.push(<img key={key} className="inline max-w-4 max-h-4" src={`https://cdn.discordapp.com/emojis/${id}.png`} alt="emoji" />)
    } else if (value.startsWith("<@")) {
      parts.push(<span key={key}>@<span style={{ color: "lightgrey", filter: "blur(3px)" }}>abcdefgh</span></span>)
    } else {
      const href = value.startsWith("www.") ? `https://${value}` : value.includes("@") && !value.includes("://") ? `mailto:${value}` : value
      parts.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer">{value}</a>)
    }
    last = start + value.length
  }
  if (last < inputText.length) parts.push(inputText.slice(last))
  return <Fragment>{parts}</Fragment>
}