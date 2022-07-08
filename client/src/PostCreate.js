import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/posts', {
            title
        });
        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input 
                        className='form-control' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
}

export default PostCreate;