import Head from 'next/head'
import {Inter} from 'next/font/google'
import Link from "next/link";
import Layout from "@/components/layout";
import utilStyles from "@/styles/utils.module.css";
import {getSortedPostsData} from "@/lib/posts";


export const getStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
        <Head>
            <title>Create Next App</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <p>Hi, I`m Sangmin</p>
            <p>
            (This is a sample website - you`ll be building a site like this on {' '}
            <Link href="https://nextjs.org/learn">our Next.js tutorial</Link>.)
            </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, title }) => (
                    <li className={utilStyles.listItem} key={id}>
                        {title}
                        <br />
                        {id}
                        <br />
                        {date}
                    </li>
                ))}
            </ul>
        </section>
    </Layout>
  )
}
