// Components
import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: '1',
      username: 'codewithaung',
      userImg: 'https://i.pinimg.com/736x/e5/1c/30/e51c30d91a7ac242f487abd61ad7cd12.jpg',
      img: 'https://images.unsplash.com/photo-1683745768326-c30a9bd86719?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      caption: 'Nice picture'
    },
    {
      id: '2',
      username: 'aung_sna',
      userImg: 'https://i.pinimg.com/736x/e5/1c/30/e51c30d91a7ac242f487abd61ad7cd12.jpg',
      img: 'https://plus.unsplash.com/premium_photo-1681406994502-bb673c265877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      caption: 'New picture from my city'
    },
  ];

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
