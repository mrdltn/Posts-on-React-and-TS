/// разметка для каждого поста //////

import { Component } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './PostComponent.css';


// export const PostComponent = ({ title, body, isLike, likePost, deletePost }) => {
//     const heartFill = isLike ? 'red' : '#DBD7D2';

//     return (
//         <div className="post">
//             <div className='postContent'>
//                 <h2>{title}</h2>
//                     <p>{body}</p>
//                     <div>
//                         <button onClick = {likePost}>
//                             <FavoriteIcon style = {{fill: heartFill}} />
//                         </button>
//                     </div>
//             </div>
//                 <button className = 'deleteBtn' onClick={deletePost}>
//                     <DeleteForeverIcon />
//                 </button>
//         </div>
//     )
// }