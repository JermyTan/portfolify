import React, { createContext, useEffect } from "react";
import useAxios from "axios-hooks";
import { AxiosError } from "axios";

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
  getAllPosts: () => void;
  isLoading: boolean;
  error?: AxiosError;
};

export const PostContext = createContext<PostContextType>({
  posts: [],
  getAllPosts: () => {},
  isLoading: true,
});

type Props = {
  children: React.ReactNode;
};

function PostProvider({ children }: Props) {
  const [{ data: response, loading, error }, refetch] = useAxios(
    {
      url: "/posts/",
      method: "get",
      baseURL: process.env.REACT_APP_API_URL,
    },
    { manual: true }
  );

  useEffect(() => {
    if (error) {
      console.log(error, error?.response);
    }
  }, [error]);

  return (
    <PostContext.Provider
      value={{
        getAllPosts: refetch,
        posts: response?.data ?? [],
        isLoading: loading,
        error: error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
