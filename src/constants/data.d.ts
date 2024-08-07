export interface Post {
  postId: number;
  emoji: string,
  userId: number;
  userName: string;
  content: string;
  timestamp: string;
  likes: number;
  commentCount: number;
}

declare const data: {
  posts: Post[];
};

export default data;
