'use client'

import { useEffect, useState } from "react";
import { api } from "../services/api";

type Episodes = {
  id: string;
  title: string;
  published_at: string;
}

interface episodes {
  episodes: Episodes[]
}

export default function Home() {
  const [episodes, setEpisodes] = useState<episodes[]>([])

  useEffect(() => {
    api.get('episodes', {
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      }
    })
      .then(response => setEpisodes(response.data))
  }, [])

  return (
    <div>
      <h1>Index</h1>
      <pre>{JSON.stringify(episodes, null, 2)}</pre>
    </div>
  );
}

