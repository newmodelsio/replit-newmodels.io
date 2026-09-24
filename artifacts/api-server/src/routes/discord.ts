import { Router, type IRouter } from "express";
import {
  GetDiscordMessagesParams,
  PostDiscordMessageBody,
  PostDiscordMessageResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const channels = new Set([
  "834797161081602088",
  "844287069345939506",
  "932043003055456336",
]);

router.get("/discord/:channelId", async (req, res): Promise<void> => {
  const params = GetDiscordMessagesParams.safeParse(req.params);
  if (!params.success || !channels.has(params.data.channelId)) {
    res.status(400).json({ error: "Invalid channel" });
    return;
  }
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    res.status(503).json({ error: "Discord is not configured" });
    return;
  }
  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${params.data.channelId}/messages`,
      { headers: { Authorization: `Bot ${token}` } },
    );
    if (!response.ok) {
      req.log.warn({ status: response.status }, "Discord messages unavailable");
      res.status(502).json({ error: "Discord messages unavailable" });
      return;
    }
    // Retain Discord's full message payload (embeds, attachments, reactions,
    // referenced_message); the frontend displays these nested fields.
    res.json(await response.json());
  } catch (error) {
    req.log.error({ error }, "Discord request failed");
    res.status(502).json({ error: "Discord messages unavailable" });
  }
});

router.post("/discord", async (req, res): Promise<void> => {
  const parsed = PostDiscordMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Message must be 1–2000 characters" });
    return;
  }
  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    res.status(503).json({ error: "Discord is not configured" });
    return;
  }
  try {
    const response = await fetch(
      `https://discord.com/api/webhooks/1125702245762211910/${webhook}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: parsed.data.message }),
      },
    );
    if (!response.ok) {
      req.log.warn({ status: response.status }, "Discord submission failed");
      res.status(502).json({ error: "Message could not be sent" });
      return;
    }
    res.json(PostDiscordMessageResponse.parse({ success: true }));
  } catch (error) {
    req.log.error({ error }, "Discord submission failed");
    res.status(502).json({ error: "Message could not be sent" });
  }
});

export default router;