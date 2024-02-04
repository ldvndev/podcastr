'use client'

import Image from 'next/image'
import { useEffect, useState } from "react";

import { api } from "../services/api";
import { dateFormatter } from "../utils/dataFormatter";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from './home.module.scss'

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    duration: number;
  };
}

export default function Home() {
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    api.get('episodes?_limit=12&_sort=published_at')
      .then(response => setEpisodes(response.data))
  }, [])  

  const formattedEpisodes = episodes.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      description: episode.description,
      url: episode.file.url,
      publishedAt: dateFormatter(episode.published_at),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration))
    }
  })

  const latestEpisodes = formattedEpisodes.slice(0, 2)
  const allEpisodes = formattedEpisodes.slice(2, formattedEpisodes.length)

    return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  objectFit='cover'
                />

                <div className={styles.episodeDetails}>
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th>Duração</th>
            </thead>
            <tbody>
              {allEpisodes.map(episode => {
                return (
                  <tr key={episode.id}>
                    <td>
                      <Image 
                        width={120}
                        height={120} 
                        src={episode.thumbnail} 
                        alt={episode.title} 
                        objectFit='cover'                     
                      />
                    </td>
                    <td>
                      <a href="">{episode.title}</a>
                    </td>
                    <td>{episode.members}</td>
                    <td>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button">
                        <img src="/play-green.svg" alt="Tocar episódios" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </section>
    </div>
  );
}


