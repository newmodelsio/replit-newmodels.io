export async function getDiscord(channelId) {
  const response = await fetch(`/api/discord/${channelId}`);
  if (!response.ok) throw new Error('Discord messages are unavailable');
  return response.json();
}

export async function postDiscord(message) {
  const response = await fetch(`/api/discord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error('Message could not be sent');
  }
  return response.json();
}
