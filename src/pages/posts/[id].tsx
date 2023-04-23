import Layout from "@/components/layout";
import {getAllPostIds, getPostData} from "@/lib/posts";
import Head from "next/head";
import Date from "@/components/date";
import utilStyles from "@/styles/utils.module.css";

export const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}


/**
 * 개발 모드에서는 매 요청 때마다 실행됨.
 * 프로덕션 모드에서는 빌드 시점에 동적 경로를 구성하며, 매 요청시마다 구성하지 않음.
 * */
export const getStaticPaths = async () => {
    const paths = getAllPostIds();

    return {
        paths,
        /**
         * fallback이 false 인 경우 지원하지 않는 경로에 대해서 404 페이지를 리턴함.
         * */
        /**
         * fallback이 true 인 경우 지원하지 않는 경로에 대해서 404 페이지를 리턴하지 않음.
         * 대신 대체 페이지를 리턴함.
         * */
        fallback: false
    }
}

const Post = ({ postData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

export default Post;