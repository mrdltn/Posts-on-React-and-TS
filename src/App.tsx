import React, {useEffect, useState} from 'react';
import './App.css';
import DB from './shared/DB.json';
import { PostList, PostType } from './components/PostList';
import { v1 } from 'uuid';
// import {SearchPost} from './components/Search/SearchPost';
// import PostListSearch from './components/Search/PostListSearch';
// import SearchPost from './components/Search/SearchPost';
////если экспортируется функция как: export function PostList(),
////то импортируется PostList в фигурных скобках,
//// а если как export default... то без фигруных скобок


export type FilterValuesType = 'all' | 'favorites';

let dataPosts = DB;

function App() {

  // let posts: Array<PostType> = [
  //   {id:v1(), title: "Redux", body: "lern Redux very well", isLike: true},
  //   {id:v1(), title: "Usestate", body: "usestateUseste...usestate", isLike: true},
  //   {id:v1(), title: "..state", body: "stateState.....state", isLike: false},
  //   {id:v1(), title: "React", body: "use React in your projects", isLike: false},
  // ]
  let [posts, setPosts] = useState<Array<PostType>>(dataPosts);

  let [filter, setFilter] = useState<FilterValuesType>('all');

  // const [searchTerm, setSearchTerm] = useState('');
  // console.log(searchTerm);
  

  let postsForPostList = posts;
  if(filter === 'favorites') {
    postsForPostList = posts.filter(postItem => postItem.isLike === true)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
////////////////////
  // const filterTitles = (searchText: string, listOfTitles:any) => {
  //   if(!searchText) {
  //       return listOfTitles;
  //   }
  //   return listOfTitles.filter(({ title }) => 
  //       title.toLowerCase().includes(searchText.toLowerCase())
  // )}

  // function findPost() {
  //   // const [searchTerm, setSearchTerm] = useState('');

  //   useEffect(() => {
  //     const Debounce = setTimeout(() => {
  //         const filteredTitles = filterTitles(searchTerm, posts);
  //         setPosts(filteredTitles);
  //     }, 500);

  //     return () => clearTimeout(Debounce);
  //   }, [searchTerm]);
  // }

///////////////////

////////////////////
  function deletePost(id: string) {
    // debugger
    let filteredPosts = posts.filter(postItem => postItem.id !== id)
    setPosts(filteredPosts);
  }
///////////////////
  function addPost(title: string, body: string) {
    let newPost = {id: v1(), title: title, body: body, isLike: false}
    let newPosts = [newPost, ...posts];
    setPosts(newPosts);
  }
///////////////////
  function changeStatus(postItem: string, isLike: boolean) {
    let post = posts.find(p => p.id === postItem);
    // const heartFill = isLike ? 'red' : '#DBD7D2';
    if (post) {
      post.isLike = isLike;
    }   
    setPosts([...posts]);
  }

////////////////////
  // const handleChange = (e: { target: { value: any; }; }) => {
  //   console.log(e.target.value);
  // }
  // const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setSearchTerm(e.target.value)
  // }


  return (
    <div className="App">
      <div className="form">
        <form className="search_form">
          {/* <input 
            autoFocus
            autoComplete='off'
            type="text"
            placeholder="Search post by title"
            className="search_input"
            id='search'
            onChange = {handleChange} 
          /> */}

            <PostList mainTitle='Adding and Search a Post'
              posts={postsForPostList}
              deletePost={deletePost}
              changeFilter={changeFilter}
              addPost={addPost}
              changePostLiked={changeStatus}
              // findPost={findPost}
            />
        </form>
      </div>
    </div>
  );
}


export default App;
   