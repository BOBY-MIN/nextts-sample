import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {CHARSET_utf8} from "@/common/constants";
import { remark} from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), 'src/posts');

export const getSortedPostsData = () => {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

/**
 * @/pages/posts/*.md 파일에 이름을 읽어와 객체 배열 형태로 전달하는 함수
 * 함수 구현체 내 반환객체 주석 참고
 *
 * 동적 경로 설정을 위해서는 반환체는 반드시 객체 배열형태여야 하며
 * params 내 id key는 @/pages/posts/[id].tsx 로 인해 결정된 명칭임.
 * */
export const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
       return {
           params: {
               id: fileName.replace(/\.md$/, '')
           }
       };
    });
}


/**
 * @/pages/posts/*.md 파일을 읽어 post data를 반환하는 함수
 * */
export const getPostData = async (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, CHARSET_utf8);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}