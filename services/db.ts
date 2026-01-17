
import { Post } from '../types';
import { INITIAL_POSTS } from '../constants';

// আপনার স্ক্রিনশট থেকে পাওয়া নতুন এবং সঠিক URL
const DATABASE_URL = 'https://script.google.com/macros/s/AKfycbx0InpQv8KFebNsmwggwB38OKkG1Img-p0Nv1el9CVIejInFIt-mV9Nr7SOz7P8s0Ce/exec';

export const db = {
  /**
   * Google Sheet থেকে ডাটা আনার প্রক্রিয়া।
   */
  async getPosts(): Promise<Post[]> {
    try {
      // ক্যাশ সমস্যা এড়াতে এবং রিডাইরেক্ট হ্যান্ডেল করতে উন্নত কুয়েরি
      const fetchUrl = `${DATABASE_URL}?t=${Date.now()}&action=getPosts`;
      
      const response = await fetch(fetchUrl, {
        method: 'GET',
        mode: 'cors', // Google Apps Script সাধারণত রিডাইরেক্ট করে, তাই cors মুড জরুরি
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const rawData = await response.json();
      
      if (!rawData || !Array.isArray(rawData)) {
        console.warn("Invalid data format received from Sheets, using defaults.");
        return INITIAL_POSTS;
      }

      if (rawData.length === 0) return INITIAL_POSTS;

      // ডাটা প্রসেসিং (স্ট্রিং কমেন্টকে অ্যারেতে রূপান্তর)
      return rawData.map((item: any) => ({
        ...item,
        likes: Number(item.likes) || 0,
        comments: typeof item.comments === 'string' 
          ? (item.comments.startsWith('[') ? JSON.parse(item.comments) : []) 
          : (Array.isArray(item.comments) ? item.comments : [])
      }));
    } catch (error) {
      console.error("Critical connection error:", error);
      
      // কানেকশন ফেল করলে লোকাল ডাটাবেস থেকে লোড করবে
      const local = localStorage.getItem('sc_posts');
      return local ? JSON.parse(local) : INITIAL_POSTS;
    }
  },

  /**
   * নতুন পোস্ট সেভ করার প্রক্রিয়া।
   */
  async savePost(post: Post): Promise<boolean> {
    try {
      const postToSave = {
        ...post,
        comments: JSON.stringify(post.comments)
      };

      // প্রথমে লোকাল স্টোরেজে সেভ করে নিচ্ছি যেন ইউজার সাথে সাথে দেখতে পায়
      const currentLocal = JSON.parse(localStorage.getItem('sc_posts') || '[]');
      localStorage.setItem('sc_posts', JSON.stringify([post, ...currentLocal]));

      // গুগল শিটে পাঠানোর চেষ্টা
      await fetch(DATABASE_URL, {
        method: 'POST',
        mode: 'no-cors', // POST এর জন্য no-cors নিরাপদ কারণ আমরা রেসপন্স নিয়ে চিন্তিত নই
        headers: { 
          'Content-Type': 'text/plain;charset=utf-8' 
        },
        body: JSON.stringify(postToSave),
      });
      
      return true; 
    } catch (error) {
      console.error("Failed to save to cloud, saved locally only:", error);
      return false;
    }
  }
};
