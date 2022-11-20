import { Siderbar } from './components/Sidebar';
import { Header } from './components/Header'
import { Post } from './components/Post';
import styles from './App.module.css';
import './global.css'

function App() {
  //array de post;

  const posts = [
    {
      id: 1,
      author:  {
        avatarUrl: "https://github.com/Diego-Lopes.png",
        name: "Diego Lopes",
        role: "CTO @Don Studio",
      },
      content:[
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: "👉 jane.design/doctorcare"},
        {type: 'links', content: ["#novoprojeto" ,"#nlw" ,"#rocketseat"]}
      ],
      publishedAt: new Date('2022-11-15 20:30:10')
    },
    {
      id: 2,
      author:  {
        avatarUrl: "https://github.com/diego3g.png",
        name: "Diego Fernandes",
        role: "CTO @Rocketseat",
      },
      content:[
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: "👉 jane.design/doctorcare"},
        {type: 'links', content: ["#novoprojeto" ,"#nlw" ,"#rocketseat"]}
      ],
      publishedAt: new Date('2022-11-10 21:30:10')
    }
  ]
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Siderbar />
        <main>
          {
            posts.map((post)=> {
              return(
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
            })
          }
        </main>
      </div>
    </>
  )
}

export default App
