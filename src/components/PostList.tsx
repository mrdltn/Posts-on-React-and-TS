import React, {useState, ChangeEvent, KeyboardEvent, MouseEventHandler} from "react";
import { FilterValuesType } from "../App";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './PostList.css';


export type PostType = {
    id: string
    title: string
    body: string
    isLike: boolean
}

type PropsType = {
    mainTitle: string
    posts: Array<PostType>
    changeFilter: (value: FilterValuesType) => void
    deletePost: (id: string) => void
    addPost: (title: string, body: string) => void
    changePostLiked: (postItem: string, isLike: boolean) => void

}


export function PostList(propsiki: PropsType) {
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");

    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPostTitle(e.currentTarget.value)
    }
    const onNewBodyChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPostBody(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            propsiki.addPost(newPostTitle, newPostBody);
            setNewPostTitle("");
            setNewPostBody("");
        }
    }

    const addPost = () => {
        if (newPostTitle.trim() !== "" && newPostBody.trim() !== "") {
            propsiki.addPost(newPostTitle.trim(), newPostBody.trim());
            setNewPostTitle("");
            setNewPostBody("");

        } else {
            setError('Title and Body is required')
        }
    }

    const onAllClickHandler = () => propsiki.changeFilter('all');
    const onFavoritesClickHandler = () => propsiki.changeFilter('favorites');

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value)
      }

    return (
      <div>
        <h3>{propsiki.mainTitle}</h3>
        <div>
            <input 
                placeholder="Add new title Post"
                value={newPostTitle}
                // onChange={(e) => {setNewPostTitle(e.currentTarget.value)}}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className = { error ? 'error' : "" }          
            />
            <input 
                placeholder="Add new body Post"
                value={newPostBody}
                // onChange={(e) => {setNewPostBody(e.currentTarget.value)}}
                onChange={onNewBodyChangeHandler}
                onKeyPress={onKeyPressHandler}
                className = { error ? 'error' : "" }  
            />

            <button onClick={addPost}>+</button> 
            { error && <div className="error-message">{error}</div> }
        </div>
            <br />
        <div>
            <input 
                autoFocus
                autoComplete='off'
                type="text"
                placeholder="Search post by title"
                className="search_input"
                onChange = {handleChange} 
            />
        </div>
        <br />

        <ul>
            {
                propsiki.posts.filter((postItem) => {
                    return searchTerm.toLowerCase() === '' ? postItem : postItem.title
                    .toLowerCase()
                    .includes(searchTerm)
                    })
                    .map(postItem => {
                        const onDeleteHandler = () => {propsiki.deletePost(postItem.id)};
                    
                        const onPostChangeHandler = () => {
                            propsiki.changePostLiked(postItem.id, !postItem.isLike);
                        }
                        
                        const heartFill = postItem.isLike ? 'red' : '#DBD7D2';
                        
                        // debugger;
                        return <li key={postItem.id}>
                                    <span className="title">{postItem.title}</span>
                                    <p>{postItem.body}
                                        <button onClick={onDeleteHandler} className="deleteBtn">
                                            <DeleteForeverIcon />
                                        </button>
                                    </p>
                                    <div>
                                        <button onClick={onPostChangeHandler} className="heart">
                                            <FavoriteIcon style = {{fill: heartFill}} />
                                        </button>
                                    </div>                        
                                    <br />
                                </li> 
                    })
                // map - это метод массива, который на основе каждого элемента в массиве создает какой-то другой элемент, на выходе получаем массив с этими новыми элементами
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All posts</button>
            <button onClick={onFavoritesClickHandler}>Favorites posts</button>
        </div>
      </div>
    )
  }
