import { GetStaticPaths, GetStaticProps } from 'next'
import { Publicaties, getPublicatie, getAllPublicaties } from '../../api/publicaties'

type ContentProps = {
    publicaties?: Publicaties[],
}

type ContentType = 'publicaties' | 'lezingen';

export default function index({ publicaties }: ContentProps) {

    function renderContent() {
        if (publicaties) {
            return publicaties.map(publicatie => (
                <div>{publicatie.titel}</div>
            ));
        }
    }

    return (
        <div>
            {renderContent()}
        </div>
    );    
}


export const getStaticProps: GetStaticProps<ContentProps> = async ({ params }) => {
  const content = params?.content;

  if (content === 'publicaties') {
    const publicaties = await getAllPublicaties();
    return { props: { publicaties: publicaties } };
  } else if (content === 'lezingen') {
    const podcasts = await getAllPublicaties();
    return { props: { podcasts } };
  }

  return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { content: 'publicaties' } },
    { params: { content: 'lezingen' } },
  ];

  return { paths, fallback: false };
};