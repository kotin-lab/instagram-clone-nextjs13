// Components
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Post from "./Post";
import PostCommentsModal from "./PostCommentsModal";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  // Effects
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc')
      ),
      snapshot => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <>
      <div>
        {posts.map(post => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
      <PostCommentsModal />
    </>
  )
}
