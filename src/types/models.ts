export interface CommentModel {
  id: number;
  user_id: number;
  post_id: number;

  body: string;

  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;

  post: PostModel;
  user: UserModel;
}

export interface PostModel {
  id: number;
  user_id: string | number;

  title: string;
  slug: string;
  body: string;
  preview: string;
  topic_id: string;
  featured_image?: string;

  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;

  comments: Array<Comment>;
  comments_count: number;
  topic: TopicModel;
  tags: Array<TagModel>;
  user: UserModel;
}

export interface ProfileModel {
  id: number;
  user_id: number;

  avatar: string;
  bio: string;
}

export interface TagModel {
  id: number;

  title: string;
  slug: string;

  created_at: string;
  updated_at: string | null;
}

export interface TopicModel {
  id: number;

  title: string;
  slug: string;

  created_at: string;
  updated_at: string | null;

  posts_count?: number;
}

export interface UserModel {
  id: string | number;

  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  phone_verified_at: string | null;

  created_at: string;
  updated_at: string | null;

  comments_count?: number;
  posts_count?: number;
  profile?: ProfileModel;
}
