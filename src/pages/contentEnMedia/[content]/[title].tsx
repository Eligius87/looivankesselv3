import { useRouter } from 'next/router';
import { Video, getVideo, getAllVideos } from '../../api/videos'; // Adjust the import path as needed
import { Container } from '../../../components/Container';

type Props = {
  video: Video;
};


export default function VideoDetail({ video }: Props) {
  const router = useRouter();
  console.log(video.vid_url)

  // If the page has not yet generated, this will be displayed initially
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  // Function to transform YouTube URL to embed URL
  const transformYouTubeUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=' || 'youtu.be/')) {
      return url.replace('youtube.com/watch?v=', 'youtube.com/embed/');
    }
    return url;
  };

  const embedUrl = transformYouTubeUrl(video.vid_url);

  return (
    <Container>
      <div>
        <h2 className="text-center p-10 text-2xl font-bold tracking-tight text-zinc-800 sm:text-4xl mb-5">
          {video.titel}
        </h2>
        <div className="relative w-full pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={video.titel}
            allowFullScreen
            sandbox='allow-scripts allow-same-origin allow-popups allow-presentation'
          ></iframe>
        </div>
        <p className="mt-6 text-md">{video.beschrijving}</p>
      </div>
    </Container>
  );
};


export async function getServerSideProps({ params }: any) {
  const video = await getVideo(params.title);
  return {
    props: {
      video,
    },
  };
}