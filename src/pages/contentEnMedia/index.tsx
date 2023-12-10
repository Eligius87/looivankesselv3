
import React, { useState, useEffect } from 'react';
import Image, { type ImageProps } from 'next/image'
import { Container } from "@/components/Container"
import Link from 'next/link';
import { getAllVideos, Video } from '../api/videos';
import { Podcast, getAllPodcasts } from '../api/podcasts';
import { Conference, getAllConferences } from '../api/conferences';
// import BeatLoader from "react-spinners/BeatLoader";

// kaartje
function PreviewCard(props: {titel: string, image: string, url: string, tags: string[], iconType: string}) {
  const truncateDescription = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'podcast':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        );
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15.75 10.5L20.47 5.78C20.5749 5.67524 20.7085 5.60392 20.8539 5.57503C20.9993 5.54615 21.15 5.561 21.2869 5.61771C21.4239 5.67442 21.541 5.77045 21.6234 5.89367C21.7058 6.01688 21.7499 6.16176 21.75 6.31V17.69C21.7499 17.8382 21.7058 17.9831 21.6234 18.1063C21.541 18.2295 21.4239 18.3256 21.2869 18.3823C21.15 18.439 20.9993 18.4538 20.8539 18.425C20.7085 18.3961 20.5749 18.3248 20.47 18.22L15.75 13.5M4.5 18.75H13.5C14.0967 18.75 14.669 18.5129 15.091 18.091C15.5129 17.669 15.75 17.0967 15.75 16.5V7.5C15.75 6.90326 15.5129 6.33097 15.091 5.90901C14.669 5.48705 14.0967 5.25 13.5 5.25H4.5C3.90326 5.25 3.33097 5.48705 2.90901 5.90901C2.48705 6.33097 2.25 6.90326 2.25 7.5V16.5C2.25 17.0967 2.48705 17.669 2.90901 18.091C3.33097 18.5129 3.90326 18.75 4.5 18.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        );
      case 'conference':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.55006 8.45583C3.32085 10.2105 3.18427 11.976 3.1409 13.745C5.53988 14.7471 7.83686 15.9778 10.0001 17.42C12.1635 15.9777 14.4608 14.7471 16.8601 13.745C16.8167 11.976 16.6801 10.2105 16.4509 8.45583M16.4509 8.45583C17.1801 8.21083 17.9192 7.98416 18.6659 7.77749C15.9464 5.87103 13.0434 4.24073 10.0001 2.91083C6.95672 4.24101 4.05372 5.87159 1.33423 7.77833C2.07863 7.98382 2.81724 8.20974 3.54923 8.45583C5.77311 9.20343 7.93085 10.135 10.0001 11.2408C12.069 10.135 14.2273 9.20349 16.4509 8.45583ZM5.62506 12.5C5.79082 12.5 5.94979 12.4341 6.067 12.3169C6.18421 12.1997 6.25006 12.0408 6.25006 11.875C6.25006 11.7092 6.18421 11.5503 6.067 11.4331C5.94979 11.3158 5.79082 11.25 5.62506 11.25C5.4593 11.25 5.30033 11.3158 5.18312 11.4331C5.06591 11.5503 5.00006 11.7092 5.00006 11.875C5.00006 12.0408 5.06591 12.1997 5.18312 12.3169C5.30033 12.4341 5.4593 12.5 5.62506 12.5ZM5.62506 12.5V9.43749C7.03901 8.55861 8.49948 7.75688 10.0001 7.03583M4.1609 16.6608C4.62587 16.197 4.99459 15.6458 5.24587 15.039C5.49714 14.4322 5.62601 13.7818 5.62506 13.125V11.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        );
      }
    }

  return(
    <div className='flex flex-col gap-2'>
      <div className='relative w-[150px] h-[150px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]'>
        <Image src={ props.image } fill alt="" className="rounded-2xl" />
      </div>
      <div className="flex flex-row w-[150px] md:w-[150px] lg:w-[200px] items-center justify-between">
        <div className='text-[16px] md:text-lg lg:text-xl font-bold pt-2'>
          {props.titel}
        </div>
        <div className='flex flex-row items-center justify-between '>
          {renderIcon(props.iconType)}
        </div>
      </div>
      <div>
        {props.tags.map((tag) => (
          <span className='text-[10px] md:text-sm lg:text-md border border-gray-500 rounded-full px-2 py-1 mr-1'>{tag}</span>
        ))}
      </div>
    </div>
  )
}

// zodat content past bij de grootte van het scherm
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: innerWidth,
    height: innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

// de echte component
export default function ContentEnMedia() {
  const [videos, setVideos] =useState<Video[]>([])
  const [podcasts, setPodcasts] =useState<Podcast[]>([])
  const [conferences, setConferences] =useState<Conference[]>([])
  const [loadingVideos, setLoadingVideos] = useState(true);  // Loading state for videos
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);  // Loading state for podcasts
  const [loadingConferences, setLoadingConferences] = useState(true);  // Loading state for conferences

  useEffect(() => {
    getAllVideos().then(data => {
      setVideos(data);
      setLoadingVideos(false);  // Update loading state for videos
    });
    getAllPodcasts().then(data => {
      setPodcasts(data);
      setLoadingPodcasts(false);  // Update loading state for podcasts
    });
    getAllConferences().then(data => {
      setConferences(data);
      setLoadingConferences(false);  // Update loading state for conferences
    });
  }, []);
  
  const size = useWindowSize();

  const getVideoCount = () => {
    if (size && size.width && size.width >= 1024) { // 'lg' breakpoint
      return 4;
    } else if (size && size.width && size.width >= 768) { // 'md' breakpoint
      return 3;
    } else {
      return 2;
    }
  };
{/* <BeatLoader className="mt-2" color='grey' loading={true} size={5} aria-label="Loading Spinner" data-testid="loader"/> */}
  return (
    <div>
      <Container className="mt-9">
      <h1 className="text-center p-10 text-4xl font-bold tracking-tight text-zinc-800 sm:text-8xl mb-5">
          Content en Media
      </h1>
     {/* Videos Section */}
     <span>
      <div className="text-[32px] font-bold pb-6">Video's</div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {loadingVideos ? <div className="flex">
         <span className='ml-2 text-gray-500'>Video's ophalen</span></div> :
          videos && videos.slice(0, getVideoCount()).map((video) => (
            <Link className="w-[150px] md:w-[150px] lg:w-[200px]" key={video.id} href={`contentEnMedia/video/${encodeURIComponent(video.titel)}`}>
              <PreviewCard
                key={video.id}
                titel={video.titel}
                image={video.image}
                url={video.vid_url}
                tags={video.tags}
                iconType={video.icon}
              />
            </Link>
          ))
          }
        </div>
        <Link href={'contentEnMedia/video' }>
          <button className='rounded-full shadow-md px-4 py-1 text-md bg-white mt-6'>Bekijk alle video's <span className='ml-2'>→</span></button>
        </Link>
     </span>
{/* <BeatLoader color='grey' className="mt-2" loading={true} size={5} aria-label="Loading Spinner" data-testid="loader"/> */}
      {/* Podcast Section */}
      <span>
      <div className="mt-16 text-[32px] font-bold pb-6">Podcasts</div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {loadingPodcasts ? <div className="flex">
         <span className='ml-2 text-gray-500'>Podcasts ophalen</span></div> : 
          podcasts && podcasts.slice(0, getVideoCount()).map((podcast) => (
            <Link key={podcast.id} href={`contentEnMedia/video/${encodeURIComponent(podcast.titel)}`}>
              <PreviewCard
                key={podcast.id}
                titel={podcast.titel}
                image={podcast.images[0]}
                url={podcast.url}
                tags={podcast.tags}
                iconType={podcast.icon}
              />
            </Link>
          ))
          }
        </div>
        <Link href={'contentEnMedia/podcast'}>
          <button className='rounded-full shadow-md px-4 py-1 text-md bg-white mt-6'>Bekijk alle Podcasts <span className='ml-2'>→</span></button>
        </Link>
     </span>
{/* <BeatLoader className="mt-2" color='grey' loading={true} size={5} aria-label="Loading Spinner" data-testid="loader"/> */}
      {/* Conferences Section */}
      <span>
        <div className="mt-16 text-[32px] font-bold pb-6">Conferences</div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {loadingConferences ? <div className="flex">
           <span className='ml-2 text-gray-500'>Conferences ophalen</span></div> :
            conferences && conferences.slice(0, getVideoCount()).map((conference) => (
              <Link key={conference.id} href={`contentEnMedia/video/${encodeURIComponent(conference.titel)}`}>
                <PreviewCard
                  key={conference.id}
                  titel={conference.titel}
                  image={conference.images[0]}
                  url={conference.url}
                  tags={conference.tags}
                  iconType={conference.icon}
                />
              </Link>
            ))
            }
          </div>
          <Link href={'contentEnMedia/conference' }>
            <button className='rounded-full shadow-md px-4 py-1 text-md bg-white mt-6'>Bekijk alle Conferences <span className='ml-2'>→</span></button>
          </Link>
     </span>
      </Container>
    </div>
  );
};

