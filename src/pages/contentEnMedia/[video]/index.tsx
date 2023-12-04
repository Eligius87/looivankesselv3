import {Video , getVideo, getAllVideos} from '../../api/videos';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@/components/Container';

type Props = {
    video: Video
    }

const Video = ({video}: Props) => {
    return (
        <div>
            <Container>
                <div className='flex flex-col'>
                    <h1>{video.titel}</h1>
                    <p>{video.beschrijving}</p>
                    <p>{video.vid_url}</p>
                    <p>{video.tags}</p>
                </div>

            </Container>
        </div>
    )
};

export default Video;

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const video = await getVideo(params?.video as string);
    if (video == null) {
        return {
            notFound: true,
        };
    }
    return {
        props: { video }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await getAllVideos()).map(video => ({
        params: { video: video.titel },
    }))

    return {
        paths,
        fallback: false
    };
}