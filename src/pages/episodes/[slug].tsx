import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";

import { api } from "../../services/api";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { usePlayer } from "../../contexts/playerContext";

import styles from "./episode.module.scss";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  description: string;
  publishedAt: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  // const router = useRouter();

  // When using fallback: true in getStaticPaths
  // if (router.isFallback) {
  //   return <p>Loading...</p>;
  // }

  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Go back" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Play episode" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

// For dynamic SSG pages
// e.g. there is no single page for "episode"
// each episode has something unique that makes it dynamic
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data.map((episode: Episode) => {
    return {
      params: {
        slug: episode.id,
      },
    };
  });

  return {
    // NextJS generates a static page for each path during "yarn build"
    paths: paths,
    // What NextJS does if there is no static page generated
    // fallback: false -> returns 404
    // incremental static regeneration:
    // fallback: true -> creates static page making requests on client-side
    // fallback: 'blocking' -> creates static page making requests on server-side
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: enUS,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(data.file.duration),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
