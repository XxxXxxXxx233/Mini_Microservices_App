import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:8080/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className='card w-50 m-2' key={post.id}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        );
    });

    return (
        <div className='d-flex flex-row flex-warp justify-content-between'>
            {renderedPosts}
        </div>
    );
}

export default PostList;