export default function Content( { params } ) {
    console.log("de params:", params);
    return <h1>Dit is de slug: {params}</h1>;
} 