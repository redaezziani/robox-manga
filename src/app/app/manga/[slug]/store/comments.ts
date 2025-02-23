import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentsResponse, CommentResponse, CreateCommentDto } from '@/types/comments';

const COMMENTS_API = 'http://192.168.31.181:8000/api/comments';
const USER_ID = '4ebfaa91-aceb-4176-bf1e-989bed1dba37'; // TODO: Get this from your auth system

// Fetch comments
export function useComments(mangaId: string) {
    return useQuery({
        queryKey: ['comments', mangaId],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<Comment[]>(
                    `${COMMENTS_API}/manga/${mangaId}?userId=${USER_ID}`
                );
                return response.data || []; // API returns array directly
            } catch (error) {
                console.error('Error fetching comments:', error);
                return []; // Return empty array on error
            }
        },
        initialData: [], // Provide initial data
        retry: 1, // Limit retry attempts
    });
}

// Create comment
export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ mangaId, content, parentId }: CreateCommentDto & { mangaId: string }) => {
            try {
                const response = await axiosInstance.post<CommentResponse>(
                    `${COMMENTS_API}/manga/${mangaId}?userId=${USER_ID}`,
                    { content, parentId }
                );
                return response.data.data;
            } catch (error) {
                console.error('Error creating comment:', error);
                throw error;
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['comments', variables.mangaId]);
        }
    });
}

// Toggle like
export function useToggleLike() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ commentId }: { commentId: string }) => {
            const response = await axiosInstance.post<CommentResponse>(
                `${COMMENTS_API}/${commentId}/like?userId=${USER_ID}`
            );
            return response.data.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['comments']);
        }
    });
}

// Delete comment
export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ commentId }: { commentId: string }) => {
            await axiosInstance.delete(
                `${COMMENTS_API}/${commentId}?userId=${USER_ID}`
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']);
        }
    });
}
