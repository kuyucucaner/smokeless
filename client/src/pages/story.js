import React, { useState, useEffect } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { getStories , addStory } from '../redux/slices/story-slice';

const Story = () => {
    const dispatch = useDispatch();
    const { stories ,  error, loading } = useSelector((state) => state.story);
    const [ storyText , setStoryText] = useState("");

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);
    useEffect(() => {
        console.log("Stories:", stories);
      }, [stories]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStory(storyText));
        setStoryText("");
    }

    return ( 
        <div>
            <h2>Sigara bırakma hikayeleri</h2>
            <form  onSubmit={handleSubmit}>
                <textarea value={storyText} 
                placeholder=" hikayeyi girin" 
                onChange={(e) => setStoryText(e.target.value)} />
        <button type="submit">Paylaş</button>
        
        </form>

      {loading && <p>Yükleniyor...</p>}
      {error && <p>Hata: {error}</p>}

      <ul>
        {stories && stories.length > 0 ? (
          stories.map((story) => (
            <li key={story.story_id}>
              <strong>{story.email}</strong> - {story.story_text} <br />
              <small>{new Date(story.created_at).toLocaleDateString()}</small>
            </li>
          ))
        ) : (
          <p>Henüz hikaye bulunmamaktadır.</p>
        )}
      </ul>
        </div>
    )
};

export default Story;
