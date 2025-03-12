import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentsResponse, CommentResponse, CreateCommentDto } from '@/types/comments';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getCookies } from '@/lib/cookies';

const COMMENTS_API = 'http://localhost:8000/api/comments';

// Fetch comments
export function useComments(mangaId: string) {
    return useQuery({
        queryKey: ['comments', mangaId],
        queryFn: async () => {
            try {
                const token: RequestCookie | undefined = await getCookies();
                const headers = token ? { Authorization: `Bearer ${token.value}` } : {};
                
                const response = await axiosInstance.get<Comment[]>(
                    `${COMMENTS_API}/manga/${mangaId}`,
                    { headers }
                );
                return response.data || [];
            } catch (error) {
                console.error('Error fetching comments:', error);
                return [];
            }
        },
        initialData: [],
        retry: 1,
    });
}

// Create comment
export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ mangaId, content, parentId }: CreateCommentDto & { mangaId: string }) => {
            const token: RequestCookie | undefined = await getCookies();
            const headers = token ? { Authorization: `Bearer ${token.value}` } : {};
            
            const response = await axiosInstance.post<CommentResponse>(
                `${COMMENTS_API}/manga/${mangaId}`,
                { content, parentId },
                { headers }
            );
            return response.data.data;
        },
        onMutate: async ({ mangaId, content, parentId }) => {
            await queryClient.cancelQueries(['comments', mangaId]);
            const previousComments = queryClient.getQueryData<Comment[]>(['comments', mangaId]);

            // Create optimistic comment
            const optimisticComment: Comment = {
                id: Date.now().toString(),
                content,
                createdAt: new Date().toISOString(),
                likes: [],
                userId: 'temp-id',
                user: {
                    name: 'You',
                },
                parentId,
            };

            // Update comments in cache
            queryClient.setQueryData<Comment[]>(['comments', mangaId], (old = []) => {
                if (parentId) {
                    return old.map(comment => 
                        comment.id === parentId 
                            ? { ...comment, replies: [...(comment.replies || []), optimisticComment] }
                            : comment
                    );
                }
                return [...old, optimisticComment];
            });

            return { previousComments };
        },
        onError: (err, { mangaId }, context) => {
            queryClient.setQueryData(['comments', mangaId], context?.previousComments);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['comments', variables.mangaId]);
        },
    });
}

// Toggle like
export function useToggleLike() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ commentId, mangaId }: { commentId: string; mangaId: string }) => {
            const token: RequestCookie | undefined = await getCookies();
            const headers = token ? { Authorization: `Bearer ${token.value}` } : {};
            
            const response = await axiosInstance.post<CommentResponse>(
                `${COMMENTS_API}/${commentId}/like`,
                {},
                { headers }
            );
            return response.data.data;
        },
        onMutate: async ({ commentId, mangaId }) => {
            await queryClient.cancelQueries(['comments', mangaId]);
            const previousComments = queryClient.getQueryData<Comment[]>(['comments', mangaId]);

            // Update comments in cache
            queryClient.setQueryData<Comment[]>(['comments', mangaId], (old = []) => {
                return old.map(comment => {
                    if (comment.id === commentId) {
                        const hasLiked = comment.likes.includes('temp-id');
                        return {
                            ...comment,
                            likes: hasLiked 
                                ? comment.likes.filter(id => id !== 'temp-id')
                                : [...comment.likes, 'temp-id']
                        };
                    }
                    // Also check replies
                    if (comment.replies) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => {
                                if (reply.id === commentId) {
                                    const hasLiked = reply.likes.includes('temp-id');
                                    return {
                                        ...reply,
                                        likes: hasLiked 
                                            ? reply.likes.filter(id => id !== 'temp-id')
                                            : [...reply.likes, 'temp-id']
                                    };
                                }
                                return reply;
                            })
                        };
                    }
                    return comment;
                });
            });

            return { previousComments };
        },
        onError: (_, { mangaId }, context) => {
            queryClient.setQueryData(['comments', mangaId], context?.previousComments);
        }
    });
}

// Delete comment
export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ commentId, mangaId }: { commentId: string; mangaId: string }) => {
            const token: RequestCookie | undefined = await getCookies();
            const headers = token ? { Authorization: `Bearer ${token.value}` } : {};
            
            await axiosInstance.delete(`${COMMENTS_API}/${commentId}`, { headers });
        },
        onMutate: async ({ commentId, mangaId }) => {
            await queryClient.cancelQueries(['comments', mangaId]);
            const previousComments = queryClient.getQueryData<Comment[]>(['comments', mangaId]);

            // Update comments in cache
            queryClient.setQueryData<Comment[]>(['comments', mangaId], (old = []) => {
                // Filter out deleted comment from top level
                const filtered = old.filter(comment => comment.id !== commentId);
                
                // Also filter from replies
                return filtered.map(comment => {
                    if (comment.replies) {
                        return {
                            ...comment,
                            replies: comment.replies.filter(reply => reply.id !== commentId)
                        };
                    }
                    return comment;
                });
            });

            return { previousComments };
        },
        onError: (_, { mangaId }, context) => {
            queryClient.setQueryData(['comments', mangaId], context?.previousComments);
        }
    });
}