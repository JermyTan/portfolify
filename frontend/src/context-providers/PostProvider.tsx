import React, { createContext } from "react";
import useAxios from "axios-hooks";

export type Image = {
  post: number;
  thumbnail_url: string;
  image_url: string;
  image_id: string;
};

export type Post = {
  id: number;
  created_at: number;
  title: string;
  image: Image | null;
  content: string;
};

type PostContextType = {
  posts: Post[];
  getPosts: () => void;
  isLoading: boolean;
};

export const PostContext = createContext<PostContextType>({
  posts: [],
  getPosts: () => {},
  isLoading: true,
});

type Props = {
  children: React.ReactNode;
};

function PostProvider({ children }: Props) {
  const [{ data: response, loading }, refetch] = useAxios({
    url: "/posts",
    method: "get",
    baseURL: "http://localhost:8000",
  });

  return (
    <PostContext.Provider
      value={{
        getPosts: refetch,
        posts: response?.data ?? [],
        isLoading: loading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
