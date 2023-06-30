import React, {useEffect, useState} from 'react';
import './App.css';
import DB from './shared/DB.json';
import { PostList, PostType } from './components/PostList';
import { v1 } from 'uuid';
////если экспортируется функция как: export function PostList(),
////то импортируется PostList в фигурных скобках,
//// а если как export default... то без фигруных скобок


export type FilterValuesType = 'all' | 'favorites';

let dataPosts = DB;

function App() {
  let [posts, setPosts] = useState<Array<PostType>>(dataPosts);

  let [filter, setFilter] = useState<FilterValuesType>('all');

  let postsForPostList = posts;

  if(filter === 'favorites') {
    postsForPostList = posts.filter(postItem => postItem.isLike === true)
  }
/////////////////////
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
////////////////////
  function deletePost(id: string) {
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
    if (post) {
      post.isLike = isLike;
    }   
    setPosts([...posts]);
  }


  return (
    <div className="App">
      <div className="form">
            <PostList mainTitle='Adding and Search a Post'
              posts={postsForPostList}
              deletePost={deletePost}
              changeFilter={changeFilter}
              addPost={addPost}
              changePostLiked={changeStatus}
            />
      </div>
    </div>
  );
}


export default App;
   