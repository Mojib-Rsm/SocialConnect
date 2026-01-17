
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightBar from './components/RightBar';
import { Post } from './types';
import { db } from './services/db';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'syncing'>('syncing');

  useEffect(() => {
    const initData = async () => {
      setDbStatus('syncing');
      try {
        const fetchedPosts = await db.getPosts();
        setPosts(fetchedPosts);
        setDbStatus('connected');
      } catch (err) {
        console.error("Initialization error:", err);
        setDbStatus('error');
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  const addNewPost = async (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    const success = await db.savePost(newPost);
    if (!success) {
      setDbStatus('error');
    } else {
      setDbStatus('connected');
    }
  };

  const likePost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('sc_posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F2F5]">
      <Navbar dbStatus={dbStatus} />
      
      <div className="flex flex-1 pt-14 lg:px-4 max-w-[1600px] mx-auto w-full">
        <aside className="hidden lg:block w-[360px] sticky top-14 h-[calc(100vh-56px)] overflow-y-auto pb-4">
          <Sidebar />
        </aside>

        <main className="flex-1 w-full max-w-[680px] mx-auto pb-8 pt-4 px-2 sm:px-0">
          {isLoading ? (
            <div className="space-y-4">
              <div className="bg-white rounded-xl h-32 animate-pulse" />
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {dbStatus === 'error' && (
                <div className="mb-4 p-3 bg-white border border-red-200 text-red-600 text-sm rounded-lg flex items-center justify-between shadow-sm">
                  <span>Connection issue. Using Offline Mode.</span>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md font-semibold transition"
                  >
                    Retry
                  </button>
                </div>
              )}
              <Feed posts={posts} onAddPost={addNewPost} onLikePost={likePost} />
            </>
          )}
        </main>

        <aside className="hidden xl:block w-[360px] sticky top-14 h-[calc(100vh-56px)] overflow-y-auto pb-4">
          <RightBar />
        </aside>
      </div>
    </div>
  );
};

export default App;
