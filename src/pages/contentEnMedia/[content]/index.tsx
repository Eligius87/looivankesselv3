import { NextSeo } from 'next-seo';
import { Container } from '../../../components/Container';
import Image from 'next/image';
import { Video, getAllVideos } from '../../api/videos';
import { Podcast, getAllPodcasts } from '../../api/podcasts';
import { Blogs, getAllBlogs } from '../../api/blogandinterview';
import Link from 'next/link';
import { getDictionary } from '../../api/dictionary';
import FormatedDate from '../../../components/FormatedDate';
import BlogCard from '../../../components/BlogCard';
import { GetServerSideProps } from 'next';

type ContentProps = {
  videos?: Video[];
  podcasts?: Podcast[];
  blogs?: Blogs[];
  dictionary: any;
};

type ContentType = 'videos' | 'podcasts' | 'blogs';

// kaartje
function PreviewCard(props: { titel: string, datum: any, image: string, url: string, tags: string[], iconType: string }) {

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
            <path d="M15.75 10.5L20.47 5.78C20.5749 5.67524 20.7085 5.60392 20.8539 5.57503C20.9993 5.54615 21.15 5.561 21.2869 5.61771C21.4239 5.67442 21.541 5.77045 21.6234 5.89367C21.7058 6.01688 21.7499 6.16176 21.75 6.31V17.69C21.7499 17.8382 21.7058 17.9831 21.6234 18.1063C21.541 18.2295 21.4239 18.3256 21.2869 18.3823C21.15 18.439 20.9993 18.4538 20.8539 18.425C20.7085 18.3961 20.5749 18.3248 20.47 18.22L15.75 13.5M4.5 18.75H13.5C14.0967 18.75 14.669 18.5129 15.091 18.091C15.5129 17.669 15.75 17.0967 15.75 16.5V7.5C15.75 6.90326 15.5129 6.33097 15.091 5.90901C14.669 5.48705 14.0967 5.25 13.5 5.25H4.5C3.90326 5.25 3.33097 5.48705 2.90901 5.90901C2.48705 6.33097 2.25 6.90326 2.25 7.5V16.5C2.25 17.0967 2.48705 17.669 2.90901 18.091C3.33097 18.5129 3.90326 18.75 4.5 18.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" />
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

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative w-[150px] h-[150px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]'>
        <Image src={props.image} fill alt="" className="object-cover rounded-2xl" />
      </div>
      <div className="flex flex-row w-[150px] md:w-[150px] lg:w-[200px] items-start justify-between">
        <div className='text-[16px] md:text-sm font-bold pt-2'>
          {props.titel}
        </div>
        <div className='pt-2'>
          {renderIcon(props.iconType)}
        </div>
      </div>
      <div className='text-[10px] text-gray-500'><FormatedDate dateString={props.datum} /></div>
      <div>
        {props.tags.map((tag) => (
          <span className='text-[10px] md:text-sm lg:text-md border border-gray-500 rounded-full px-2 py-1 mr-1'>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Content({ videos, podcasts, blogs, dictionary }: ContentProps) {
  const dict = dictionary.media;
  const renderContent = () => {
    if (videos) {
      return videos.map(video => (
        <Link key={video.id} href={`/contentEnMedia/video/${encodeURIComponent(video.titel)}`}>
          <PreviewCard
            titel={video.titel}
            image={video.image}
            url={video.vid_url}
            tags={video.tags}
            iconType="video"
            datum={video.datum}
          />
        </Link>
      ));
    } else if (podcasts) {
      return podcasts.map(podcast => (
        <Link key={podcast.id} href={podcast.url} target='__blank'>
          <PreviewCard
            titel={podcast.titel}
            image={podcast.images[0]}
            url={podcast.url}
            tags={podcast.tags}
            iconType="podcast"
            datum={podcast.datum}
          />
        </Link>
      ));
    } else if (blogs) {
      return blogs.map(blog => (
        <BlogCard
          key={blog.id}
          titel={blog.titel}
          beschrijving={blog.beschrijving}
          datum={blog.datum}
          url={blog.url}
        />
      ));
    }
  };

  const content = videos ? 'videos' : podcasts ? 'podcasts' : 'blogs';
  return (
    <>
      <NextSeo
        title="Content en Media"
        description="Content en Media van de website"
      />
      <div>
        <Container>
          <h2 className="text-center p-10 text-2xl font-bold tracking-tight text-zinc-800 sm:text-4xl mb-5">
            {content == 'videos' ? 'Video\'s' : content == 'podcasts' ? 'Podcasts' : content == 'blogs' ? `${dict.blogs}` : ''}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {renderContent()}
          </div>
        </Container>
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps<ContentProps> = async ({ params, locale }) => {
  const content = params?.content as ContentType;
  const dictionary = await getDictionary(locale);

  if (content === 'videos') {
    const videos = await getAllVideos();
    return { props: { videos, dictionary } };
  } else if (content === 'podcasts') {
    const podcasts = await getAllPodcasts();
    return { props: { podcasts, dictionary } };
  } else if (content === 'blogs') {
    const blogs = await getAllBlogs();
    return { props: { blogs, dictionary } };
  }

  return { notFound: true };
};