"use server"

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK

export async function getDiscord(channelID) {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelID}/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function postDiscord(message) {
  try {
    const response = await fetch(
      `https://discord.com/api/webhooks/1125702245762211910/${DISCORD_WEBHOOK}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: message,
        }),
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
