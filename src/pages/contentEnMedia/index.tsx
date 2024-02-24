import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { Container } from "../../components/Container"
import Link from 'next/link';
import { getAllVideos, Video } from '../api/videos';
import { Podcast, getAllPodcasts } from '../api/podcasts';
import { Blogs, getAllBlogs } from '../api/blogandinterview';
import FormatedDate from '@/components/FormatedDate';
import { getDictionary } from '../api/dictionary';
import { NextSeo } from 'next-seo';
import PreviewCard from '@/components/PreviewCard';
import BlogCard from '@/components/BlogCard';
// kaartje
function Button(props: { text: string, url: string }) {
  return (
    <Link href={props.url}>
      <button className='rounded-full shadow-md px-4 py-1 text-sm md:text-md bg-white mt-6 transition ease-in-out hover:ring-teal-400'>{props.text} <span className='ml-2'>→</span></button>
    </Link>
  )
}


type Props = {
  dictionary: any
  podcasts: Podcast[],
  videos: Video[],
  blogs: Blogs[]
}

// de echte component
export default function ContentEnMedia({ dictionary, podcasts, videos, blogs }: Props) {
  const dict = dictionary.media

  {/* <BeatLoader className="mt-2" color='grey' loading={true} size={5} aria-label="Loading Spinner" data-testid="loader"/> */ }
  return (
    <>
      <NextSeo
        title={dict.header1}
        description={dict.header1}
      />
      <div >
        <Container className="mt-9 flex justify-center items-center">
          <h1 className="text-center p-10 text-4xl font-bold tracking-tight text-zinc-800 sm:text-8xl mb-5">
            {dict.header1}
          </h1>

          {/* <BeatLoader color='grey' className="mt-2" loading={true} size={5} aria-label="Loading Spinner" data-testid="loader"/> */}
          {/* Podcast Section */}
          <span>
            <div className="text-center xs:text-left mt-16 text-md md:text-lg lg:text-2xl xl:text-4xl font-bold pb-6">Podcasts & Radio</div>
            <div className="flex flex-row flex-wrap justify-center xs:justify-start items-start gap-10">
              {podcasts && podcasts.slice(0, 4).map((podcast) => (
                <Link key={podcast.id} href={`contentEnMedia/podcast/${encodeURIComponent(podcast.titel)}`}>
                  <PreviewCard
                    key={podcast.id}
                    titel={podcast.titel}
                    image={podcast.images[0]}
                    url={podcast.url}
                    tags={podcast.tags}
                    iconType={podcast.icon}
                    datum={podcast.datum}
                  />
                </Link>
              ))
              }
            </div>
            <Button text={dict.buttonpod} url="contentEnMedia/podcasts" />
          </span>

          {/* Videos Section */}
          <span>
            <div className="text-center xs:text-left text-md md:text-lg lg:text-2xl xl:text-4xl font-bold py-6">Video's</div>
            <div className="flex flex-row flex-wrap justify-center xs:justify-start items-start gap-10">
              {videos && videos.slice(0, 4).map((video) => (
                <Link className="w-[150px] md:w-[150px] lg:w-[200px]" key={video.id} href={`contentEnMedia/video/${encodeURIComponent(video.titel)}`}>
                  <PreviewCard
                    key={video.id}
                    titel={video.titel}
                    image={video.image}
                    url={video.vid_url}
                    tags={video.tags}
                    iconType={video.icon}
                    datum={video.datum}
                  />
                </Link>
              ))
              }
            </div>
            <Button url="contentEnMedia/videos" text={dict.buttonvid} />
          </span>

          <span>
            <div className="text-center xs:text-left text-md md:text-lg lg:text-2xl xl:text-4xl mt-16 font-bold pb-6">Blog posts & interviews</div>
            <div className="flex flex-row flex-wrap justify-center xs:justify-start items-center gap-2">
              {blogs && blogs.slice(0, 4).map((blog) => (
                <BlogCard
                  key={blog.id}
                  titel={blog.titel}
                  beschrijving={blog.beschrijving}
                  url={blog.url}
                  datum={blog.datum}
                />
              ))
              }
            </div>
            <Button url="contentEnMedia/blogs" text={dict.buttonblog} />
          </span>
        </Container>
      </div>
    </>
  );
};

export async function getServerSideProps({ locale }: any) {
  const videos = await getAllVideos();
  const podcasts = await getAllPodcasts();
  const blogs = await getAllBlogs();
  const dictionary = await getDictionary(locale);
  return {
    props: {
      dictionary,
      podcasts: podcasts,
      videos: videos,
      blogs: blogs
    }
  }
}