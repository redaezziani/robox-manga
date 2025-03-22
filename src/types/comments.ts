export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  mangaId: string;
  parentId: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    emailVerified: boolean;
    profile: null | {
      image?: string;
    };
  };
  replies: Comment[];
  likes: string[];
  _count: {
    replies: number;
  };
}

export interface CreateCommentDto {
  content: string;
  parentId?: string;
}

export interface CommentsResponse {
  success: boolean;
  data: Comment[];
}

export interface CommentResponse {
  success: boolean;
  data: Comment;
}
