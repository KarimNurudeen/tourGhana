const CHANNEL_ID = 'UC7Ljmeo_h3exS52Tl1tWhpw';
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, 'UU');
const REVALIDATE_SECONDS = 3600;

export type ChannelVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
};

function formatDuration(iso8601: string): string {
  const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = Number(match?.[1] ?? 0);
  const minutes = Number(match?.[2] ?? 0);
  const seconds = Number(match?.[3] ?? 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export async function getChannelVideos(maxResults = 12): Promise<ChannelVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY is not set; skipping channel video fetch.');
    return [];
  }

  const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  playlistUrl.searchParams.set('part', 'snippet');
  playlistUrl.searchParams.set('playlistId', UPLOADS_PLAYLIST_ID);
  playlistUrl.searchParams.set('maxResults', String(Math.min(maxResults, 50)));
  playlistUrl.searchParams.set('key', apiKey);

  const playlistRes = await fetch(playlistUrl, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!playlistRes.ok) {
    console.error('YouTube playlistItems request failed', await playlistRes.text());
    return [];
  }
  const playlistData = await playlistRes.json();

  const items: {
    videoId: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
  }[] = (playlistData.items ?? [])
    .filter((item: any) => item.snippet?.resourceId?.videoId)
    .map((item: any) => ({
      videoId: item.snippet.resourceId.videoId as string,
      title: item.snippet.title as string,
      // `maxres` is large (often 1-2MB) and not guaranteed to exist for
      // every upload, which was timing out Next's image optimizer.
      // `high` (480x360) is small, fast, and always available.
      thumbnail:
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ??
        item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt as string,
    }));

  if (items.length === 0) return [];

  const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  videosUrl.searchParams.set('part', 'contentDetails');
  videosUrl.searchParams.set('id', items.map((item) => item.videoId).join(','));
  videosUrl.searchParams.set('key', apiKey);

  const videosRes = await fetch(videosUrl, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  const durationById = new Map<string, string>();
  if (videosRes.ok) {
    const videosData = await videosRes.json();
    for (const video of videosData.items ?? []) {
      durationById.set(video.id, formatDuration(video.contentDetails?.duration ?? 'PT0S'));
    }
  }

  return items.map((item) => ({
    id: item.videoId,
    title: item.title,
    thumbnail: item.thumbnail,
    publishedAt: item.publishedAt,
    duration: durationById.get(item.videoId) ?? '',
  }));
}
