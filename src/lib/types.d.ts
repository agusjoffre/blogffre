export type Tag = {
  name: string;
  id?: string;
};

export type Source = {
  name: string;
  id?: string;
};

export type Post = {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  tags: Tag[];
  sources: Source[];
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type User = {
  id?: string;
  fullname: string;
  username: string;
  studyarea?: string;
  role: "admin" | "user";
  image_url?: string;
  email: string;
};

export type SourcePost = {
  source_id: string;
  post_id: string;
};

export type SourcePostPosgres = {
  error: any;
  data: SourcePost[];
  count: number | null;
  status: number;
  statusText: string;
};

export type TagPost = {
  tag_id: string;
  post_id: string;
};

export type TagPostPosgres = {
  error: any;
  data: TagPost[];
  count: number | null;
  status: number;
  statusText: string;
};

export type SourcePosgres = {
  error: any;
  data: Source[];
  count: number | null;
  status: number;
  statusText: string;
};

export type TagPosgres = {
  error: any;
  data: Tag[];
  count: number | null;
  status: number;
  statusText: string;
};

export type UserPosgres = {
  error: any;
  data: User[];
  count: number | null;
  status: number;
  statusText: string;
};

export type PostPosgres = {
  error: any;
  data: Post[];
  count: number | null;
  status: number;
  statusText: string;
};
