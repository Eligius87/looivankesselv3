import { Container } from "../../components/Container";
import { getAllBlogs, Blogs } from "../api/blogandinterview";
import { getAllPodcasts, Podcast } from "../api/podcasts";
import { getAllVideos, Video } from "../api/videos";
import { getAllLezingen, Lezingen } from "../api/lezingen";
import { getAllPublicaties, Publicaties } from "../api/publicaties";
import { getAllVakken, Vakken } from "../api/overzichtvakken";
import { getAllUitlichtings, Uitlichting } from "../api/uitlichting";
import { getDictionary } from "../api/dictionary";
import { useState } from "react";
import PreviewCard from "../../components/PreviewCard";
import BlogCard from "@/components/BlogCard";
import PublicatieCard from "@/components/PublicatieCard";
import VakkenCard from "@/components/VakkenCard";
import Accordionitem from "@/components/AccordionItem";

type Props = {
    podcasts: Podcast[];
    blogs: Blogs[];
    videos: Video[];
    lezingen: Lezingen[];
    publicaties: Publicaties[];
    vakken: Vakken[];
    uitlichting: Uitlichting[];
    dictionary: any;
}


export default function Zoeken({ podcasts, blogs, videos, lezingen, publicaties, vakken, dictionary, uitlichting }: Props) {
    const dict = dictionary.zoeken;
    const podcastTags = Array.from(new Set(podcasts.flatMap(podcast => podcast.tags)))
    const blogsTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))
    const videoTags = Array.from(new Set(videos.flatMap(video => video.tags)))
    const lezingTags = Array.from(new Set(lezingen.flatMap(lezing => lezing.tags)))
    const publicatieTags = Array.from(new Set(publicaties.flatMap(publicatie => publicatie.tags)))
    const vakkenTags = Array.from(new Set(vakken.flatMap(vak => vak.tags)))
    const uitlichtingTags = Array.from(new Set(uitlichting.flatMap(uitlichting => uitlichting.tags)))

    const allTags = Array.from(new Set([...podcastTags, ...blogsTags, ...videoTags, ...lezingTags, ...publicatieTags, ...vakkenTags, ...uitlichtingTags]))
    const cleanedTags = allTags.filter(tag => tag && tag.trim() !== "")
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    function handleTagClick(tag: string) {
        setSelectedTags(prevTags => {
            let newTags;
            if (prevTags.includes(tag)) {
                newTags = prevTags.filter(prevTag => prevTag !== tag)
            } else {
                newTags = [...prevTags, tag]
            }
            console.log(newTags)
            return newTags;
        })
    }

    function renderContent() {
        const renderPodcasts = () => {
            if (podcasts.some(podcast => selectedTags.some(tag => podcast.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => podcasts.some(podcast => podcast.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Podcasts - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {podcasts.map(podcast => {
                                if (selectedTags.some(tag => podcast.tags.includes(tag))) {
                                    return (
                                        <PreviewCard
                                            key={podcast.id}
                                            titel={podcast.titel}
                                            image={podcast.images[0]}
                                            url={podcast.url}
                                            tags={podcast.tags}
                                            iconType={podcast.icon}
                                            datum={podcast.datum}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }

        const renderBlogs = () => {
            if (blogs.some(blog => selectedTags.some(tag => blog.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => blogs.some(blog => blog.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Blogs & Interviews - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {blogs.map(blog => {
                                if (selectedTags.some(tag => blog.tags.includes(tag))) {
                                    return (
                                        <BlogCard
                                            key={blog.id}
                                            titel={blog.titel}
                                            beschrijving={blog.beschrijving}
                                            url={blog.url}
                                            datum={blog.datum}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }

        const renderVideos = () => {
            if (videos.some(video => selectedTags.some(tag => video.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => videos.some(video => video.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Videos - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {videos.map(video => {
                                if (selectedTags.some(tag => video.tags.includes(tag))) {
                                    return (
                                        <PreviewCard
                                            key={video.id}
                                            titel={video.titel}
                                            image={video.image}
                                            url={video.vid_url}
                                            tags={video.tags}
                                            iconType={video.icon}
                                            datum={video.datum}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }

        const renderLezingen = () => {
            if (lezingen.some(lezing => selectedTags.some(tag => lezing.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => lezingen.some(lezing => lezing.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Lezingen - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {lezingen.map(lezing => {
                                if (selectedTags.some(tag => lezing.tags.includes(tag))) {
                                    return (
                                        <PublicatieCard
                                            key={lezing.id}
                                            titel={lezing.titel}
                                            publicatie_url={lezing.url}
                                            zin_besc={lezing.beschrijving}
                                            datum={lezing.datum}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }

        const renderPublicatie = () => {
            if (publicaties.some(publicatie => selectedTags.some(tag => publicatie.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => publicaties.some(publicatie => publicatie.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Publicaties - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {publicaties.map(publicatie => {
                                if (selectedTags.some(tag => publicatie.tags.includes(tag))) {
                                    return (
                                        <PublicatieCard
                                            key={publicatie.id}
                                            titel={publicatie.titel}
                                            publicatie_url={publicatie.publicatie_url}
                                            zin_besc={publicatie.zin_besc}
                                            datum={publicatie.datum}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }

        const renderVakken = () => {
            if (vakken.some(vak => selectedTags.some(tag => vak.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => vakken.some(vak => vak.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Vakken - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {vakken.map(vak => {
                                if (selectedTags.some(tag => vak.tags.includes(tag))) {
                                    return (
                                        <VakkenCard
                                            key={vak.titel}
                                            link={vak.link}
                                            titel={vak.titel}
                                            traject={vak.traject}
                                            periode={vak.periode}
                                            vaktext="Vak"
                                            trajecttext="Traject"
                                            periodetext="Periode"
                                            color=""
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }

        const renderUitlichting = () => {
            const [open, setopen] = useState<number | null>(null);

            const toggle = ((index: any) => {
                if (open === index) {
                    return setopen(null);
                }
                setopen(index)
            })
            if (uitlichting.some(text => selectedTags.some(tag => text.tags.includes(tag)))) {
                const matchingTag = selectedTags.filter(tag => uitlichting.some(text => text.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Onderwijs Initiatieven - ${matchingTag.join(' - ')}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {uitlichting.map((text, index) => {
                                if (selectedTags.some(tag => text.tags.includes(tag))) {
                                    return (
                                        <Accordionitem
                                            key={text.id}
                                            open={false}
                                            toggle={() => {toggle(index)}}
                                            title={text.titel}
                                            desc={text.beschrijving}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </div>
                )
            }
        }


        return (
            <>
                {renderPodcasts()}
                {renderBlogs()}
                {renderVideos()}
                {renderLezingen()}
                {renderPublicatie()}
                {renderVakken()}
                {renderUitlichting()}
            </>
        )
    }


    return (
        <Container>
            <h1 className="text-center py-10 text-4xl font-bold">{dict.header}</h1>
            <div>
                <ul className="flex flex-row flex-wrap gap-4">
                    {cleanedTags.map((tag, index) => {
                        const isSelected = selectedTags.includes(tag)
                        return (
                            <li key={tag} className={`${isSelected ? 'ring-teal-600 text-teal-600 transform scale-[105%]' : 'ring-zinc-200 text-zinc-900 hover:ring-teal-600 hover:text-teal-600'} ring-1 shadow-lg transition ease-in-out py-3 px-3 flex justify-center items-center rounded-lg cursor-pointer`} onClick={() => handleTagClick(tag)}>{tag}</li>
                        )
                    })}
                </ul>
            </div>
            <div>
                {renderContent()}
            </div>
        </Container>
    );
}


export async function getServerSideProps({ locale }: any) {
    const dictionary = await getDictionary(locale);
    const podcasts = await getAllPodcasts(locale);
    const blogs = await getAllBlogs(locale);
    const videos = await getAllVideos(locale);
    const lezingen = await getAllLezingen(locale);
    const publicaties = await getAllPublicaties(locale);
    const vakken = await getAllVakken(locale);
    const uitlichting = await getAllUitlichtings(locale);

    return {
        props: {
            podcasts,
            blogs,
            videos,
            lezingen,
            publicaties,
            vakken,
            uitlichting,
            dictionary
        }
    }
}
