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
    const [searchTerm, setSearchTerm] = useState("");

    const matchesSearch = (item: any) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        const fieldsToSearch = [
            item.titel,
            item.beschrijving,
            item.zin_besc,
        ];

        return fieldsToSearch.some(field =>
            field && field.toLowerCase().includes(searchLower)
        );
    };

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
            if (!searchTerm && selectedTags.length === 0) return null;

            const filteredPodcasts = podcasts.filter(podcast =>
                matchesSearch(podcast) && (selectedTags.length === 0 || selectedTags.some(tag => podcast.tags.includes(tag)))
            );

            if (filteredPodcasts.length === 0) return null;

            const matchingTag = selectedTags.filter(tag => podcasts.some(podcast => podcast.tags.includes(tag)));
            return (
                <div>
                    <h1 className="text-4xl font-bold py-10">
                        {`Podcasts - ${matchingTag.length ? `${matchingTag.join(' - ')}` : ''}`}
                    </h1>
                    <ul className="flex flex-row flex-wrap gap-10">
                        {filteredPodcasts.map(podcast => (
                            <PreviewCard
                                key={podcast.id}
                                titel={podcast.titel}
                                image={podcast.images[0]}
                                url={podcast.url}
                                tags={podcast.tags}
                                iconType={podcast.icon}
                                datum={podcast.datum}
                            />
                        ))}
                    </ul>
                </div>
            )
        }

        const renderBlogs = () => {

            if(!searchTerm && selectedTags.length === 0) return null;

            const filteredBlogs = blogs.filter(blog =>
                matchesSearch(blog) && (selectedTags.length === 0 || selectedTags.some(tag => blog.tags.includes(tag)))
            );

            if (filteredBlogs.length === 0) return null;

            const matchingTag = selectedTags.filter(tag => blogs.some(blog => blog.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                        {`Blogs & Interviews - ${matchingTag.length ? `${matchingTag.join(' - ')}`: ''}`}
                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {filteredBlogs.map(blog =>
                                     (
                                        <BlogCard
                                            key={blog.id}
                                            titel={blog.titel}
                                            beschrijving={blog.beschrijving}
                                            url={blog.url}
                                            datum={blog.datum}
                                        />
                                    ))}
                        </ul>
                    </div>
                )
        }

        const renderVideos = () => {
            if(!searchTerm && selectedTags.length === 0) return null;

            const filteredVideos = videos.filter(video =>
                matchesSearch(video) && (selectedTags.length === 0 || selectedTags.some(tag => video.tags.includes(tag)))
            );

            if (filteredVideos.length === 0) return null;
            const matchingTag = selectedTags.filter(tag => videos.some(video => video.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Videos - ${matchingTag.length ? `${matchingTag.join(' - ')}`: ''}`}
                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                                    {filteredVideos.map(video =>
                                    (
                                        <PreviewCard
                                            key={video.id}
                                            titel={video.titel}
                                            image={video.image}
                                            url={video.vid_url}
                                            tags={video.tags}
                                            iconType={video.icon}
                                            datum={video.datum}
                                        />
                                    ))}
                        
                        </ul>
                    </div>
                )
        }

        const renderLezingen = () => {
            if(!searchTerm && selectedTags.length === 0) return null;

            const filteredLezingen = lezingen.filter(lezing =>
                matchesSearch(lezing) && (selectedTags.length === 0 || selectedTags.some(tag => lezing.tags.includes(tag)))
            );

            if (filteredLezingen.length === 0) return null;
            const matchingTag = selectedTags.filter(tag => lezingen.some(lezing => lezing.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Lezingen - ${matchingTag.length ? `${matchingTag.join(' - ')}`: ''}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                                    {filteredLezingen.map(lezing =>
                                    (
                                        <PublicatieCard
                                            key={lezing.id}
                                            titel={lezing.titel}
                                            publicatie_url={lezing.url}
                                            zin_besc={lezing.beschrijving}
                                            datum={lezing.datum}
                                        />
                                    ))}
                
                        </ul>
                    </div>
                )
        }

        const renderPublicatie = () => {
            if(!searchTerm && selectedTags.length === 0) return null;

            const filteredPublicaties = publicaties.filter(publicatie =>
                matchesSearch(publicatie) && (selectedTags.length === 0 || selectedTags.some(tag => publicatie.tags.includes(tag)))
            );

            if (filteredPublicaties.length === 0) return null;
            const matchingTag = selectedTags.filter(tag => publicaties.some(publicatie => publicatie.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Publicaties - ${matchingTag.length ? `${matchingTag.join(' - ')}`: ''}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                            {filteredPublicaties.map(publicatie => 
                            (
                                <PublicatieCard
                                    key={publicatie.id}
                                    titel={publicatie.titel}
                                    publicatie_url={publicatie.publicatie_url}
                                    zin_besc={publicatie.zin_besc}
                                    datum={publicatie.datum}
                                />
                            ))}
    
                        </ul>
                    </div>
                )
        }

        const renderVakken = () => {
            if(!searchTerm && selectedTags.length === 0) return null;

            const filteredVakken = vakken.filter(vak =>
                matchesSearch(vak) && (selectedTags.length === 0 || selectedTags.some(tag => vak.tags.includes(tag)))
            );

            if (filteredVakken.length === 0) return null;
            const matchingTag = selectedTags.filter(tag => vakken.some(vak => vak.tags.includes(tag)));
                return (
                    <div>
                        <h1 className="text-4xl font-bold py-10">
                            {`Vakken - ${matchingTag.length ? `${matchingTag.join(' - ')}`: ''}`}

                        </h1>
                        <ul className="flex flex-row flex-wrap gap-10">
                                        {filteredVakken.map(vak =>
                                        (
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
                                    ))
                                }
                        </ul>
                    </div>
                )
        }

        const renderUitlichting = () => {
            const [open, setopen] = useState<number | null>(null);

            const toggle = (index: number) => {
                if (open === index) {
                    return setopen(null);
                }
                setopen(index);
            };

            if(!searchTerm && selectedTags.length === 0) return null;

            const filteredUitlichtingen = uitlichting.filter(uitlicht =>
                matchesSearch(uitlicht) && (selectedTags.length === 0 || selectedTags.some(tag => uitlicht.tags.includes(tag)))
            );

            if (filteredUitlichtingen.length === 0) return null;
            const matchingTag = selectedTags.filter(tag => uitlichting.some(text => text.tags.includes(tag)));
            
            return (
                <div>
                    <h1 className="text-4xl font-bold py-10">
                        {`Onderwijs Initiatieven - ${matchingTag.length ? `${matchingTag.join(' - ')}`: ''}`}
                    </h1>
                    <ul className="flex flex-row flex-wrap gap-10">
                        {filteredUitlichtingen.map((text, index) => (
                            <Accordionitem
                                key={text.id}
                                open={open === index}
                                toggle={() => toggle(index)}
                                title={text.titel}
                                desc={text.beschrijving}
                            />
                        ))}
                    </ul>
                </div>
            );
        };


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
            <div className="mb-8">
                <input
                    type="text"
                    placeholder={dict.zoeken}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                
            </div>
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

