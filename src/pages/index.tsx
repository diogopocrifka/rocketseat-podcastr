// import { useEffect } from "react";

export default function Home(props) {
  // SPA - Single-page Application (Works on ReactJS and NextJS)
  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return <h1>Index</h1>;
}

// SSR - Server-side Rendering (Works on NextJS)
// Runs everytime a user accesses this page
// export async function getServerSideProps() {
//   const response = await fetch("http://localhost:3333/episodes");
//   const data = await response.json();

//   return {
//     props: {
//       episodes: data,
//     },
//   };
// }

// SSG - Static Site Generation (Works on NextJS)
// Runs at set intervals and stores the static html page
// regardless of how many users are accessing this page
export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
