import { Container, MyHeader } from "../../components/Layout";
import { GetStaticProps, GetStaticPaths } from 'next'
import { Colab } from "../../interface";
import Link from "next/link"


type Props = {
    item?: Colab,
    errors?: string
}


const sampleColabData: Colab[] = [
    {
        id: "id0001",
        createdAt: "2021",
        url: "https://colab.research.google.com/notebooks/intro.ipynb",
        name: "intro",
        skill: ["分岐"]
    },
    {
        id: "id0002",
        createdAt: "2021",
        url: "https://colab.research.google.com/notebooks/intro.ipynb#scrollTo=UdRyKR44dcNI",
        name: "id0002のページ",
        skill: ["分岐"]
    }]

const StaticPropsDetail = ({item, errors}: Props) => {
    if(errors){
        return(
            <>
            <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
            </p>
            </>
        )
    }
    else{
        const url = item === undefined? "error" : item.url
        return(
            <>
            <MyHeader/>
            <h1>{item?.name}</h1>
            <Link href={url}>
                <a>サイトにジャンプ</a>
            </Link>
            </>
        )
    }
}

export default StaticPropsDetail

// Get the paths we want to pre-render based on colabs
export const getStaticPaths: GetStaticPaths= async() => {
    const paths = sampleColabData.map((colab) => ({
            params: { id: colab.id.toString() }
    }))

    return ({ 
        paths,
        fallback: false,
    })
}

export const getStaticProps: GetStaticProps = async({params}) => {
    const id = params?.id
    const item = sampleColabData.find((data) => data.id === id)
    return {props: { item }}
    // try {
    //     const id = params?.id
    //     const item = sampleColabData.find((data) => data.id === id)
    //     return {props: { item }}
    // }
    // catch (err) {
    //     const ex:Error = err;
    //     return { props: { errors: ex.message } }
    // }
}




// export default function Post(){
//     return(
//         <>
//         <h2>Google Colaboratoryのプログラム</h2>
//         </>
//     )
// }



// id としてとりうる値のリストを返す
// export async function getStaticPaths(): GetStaticPaths{
//     const paths = [
//           {
//             params: {
//               id: 'uranai'
//             }
//           },
//           {
//             params: {
//               id: 'fizzbuzz'}
//           }
//         ]

//     return {
//         paths,
//         fallback: false
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     // Get the paths we want to pre-render based on users
//     const paths = sampleUserData.map((user) => ({
//       params: { id: user.id.toString() },
//     }))
  
//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
//   }

// // params.id を使用して、colabの投稿に必要なデータを取得する
// export async function getStaticProps({ params }): GetStaticProps {
    
// }

// export function getAllPostIds() {
//     const fileNames = fs.readdirSync(postsDirectory)

//     // 以下のような配列を返します:
//     // [
//     //   {
//     //     params: {
//     //       id: 'ssg-ssr'
//     //     }
//     //   },
//     //   {
//     //     params: {
//     //       id: 'pre-rendering'
//     //     }
//     //   }
//     // ]
//     return fileNames.map(fileName => {
//       return {
//         params: {
//           id: fileName.replace(/\.md$/, '')
//         }
//       }
//     })
//   }

// export function getPostData(id) {
//     const fullPath = path.join(postsDirectory, `${id}.md`)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    
  
//     // データを id と組み合わせる
//     return {
//       id,
//       ...matterResult.data
//     }
// }