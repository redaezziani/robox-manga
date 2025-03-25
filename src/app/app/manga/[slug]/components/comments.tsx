"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { Heart, Reply, Trash2, MessageCircle } from "lucide-react"
import { useComments, useCreateComment, useToggleLike, useDeleteComment } from "../store/comments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface CommentProps {
  comment: {
    id: string
    user: {
      name: string
      profile?: {
        image: string
      }
    }
    createdAt: string
    content: string
    likes: string[]
    replies?: CommentProps['comment'][]
    userId: string
  }
  onReply: (parentId: string, content: string) => void
  onLike: (commentId: string) => void
  onDelete: (commentId: string) => void
  currentUserId: string
  level?: number
}

const Comment = ({ comment, onReply, onLike, onDelete, currentUserId, level = 0 }: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  return (
    <div className={cn("flex", level > 0 ? "mr-4  mt-4" : "mt-6")}>
      <div className="flex-1">
        <div className="flex py-2 gap-4">
          <Avatar className="h-10  w-10 shrink-0">
            <AvatarImage src={comment.user.profile?.image} />
            <AvatarFallback className="bg-primary/10">{comment.user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{comment.user.name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-xs">
                {format(new Date(comment.createdAt), "PP", { locale: ar })}
              </span>
            </div>

            <div className="rounded-2xl  p-3">
              <p className="text-sm">{comment.content}</p>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(comment.id)}
                className={cn(
                  "h-auto px-0 text-muted-foreground hover:text-primary",
                  comment.likes.includes(currentUserId) && "text-primary",
                )}
              >
                <Heart size={16} className={comment.likes.includes(currentUserId) ? "fill-current" : ""} />
                <span className="mr-1 text-xs">{comment.likes.length}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="h-auto px-0 text-muted-foreground hover:text-primary"
              >
                <Reply size={16} />
                <span className="mr-1 text-xs">رد</span>
              </Button>

              {comment.userId === currentUserId && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(comment.id)}
                  className="h-auto px-0 text-destructive hover:text-destructive/80"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {isReplying && (
          <div className="flex gap-2 mr-14 mt-4">
            <Input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="اكتب ردك..."
              className="flex-1 h-10 text-sm"
            />
            <Button
              size="sm"
              onClick={() => {
                onReply(comment.id, replyContent)
                setReplyContent("")
                setIsReplying(false)
              }}
            >
              رد
            </Button>
          </div>
        )}

        {(comment.replies && comment.replies.length > 0) && (
          <div className="space-y-4 mr-6">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onLike={onLike}
                onDelete={onDelete}
                currentUserId={currentUserId}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface CommentsSectionProps {
  mangaId: string
}

const CommentsSection = ({ mangaId }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("")
  const { data: comments = [], isLoading } = useComments(mangaId)
  const { mutate: createComment, isLoading: isCreating } = useCreateComment()
  const { mutate: toggleLike } = useToggleLike()
  const { mutate: deleteComment } = useDeleteComment()

  const handleCreateComment = () => {
    if (!newComment.trim() || isCreating) return;
    createComment(
      { mangaId, content: newComment },
      {
        onSuccess: () => setNewComment("")
      }
    );
  }

  return (
    <div className="space-y-6" dir="rtl" lang="ar">
      <div className="flex items-center gap-2 border-b pb-4">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">التعليقات ({comments.length})</h2>
      </div>

      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="اكتب تعليقك..."
          className="flex-1"
        />
        <Button
          onClick={handleCreateComment}
        >
          تعليق
        </Button>
      </div>

      <div className="divide-y divide-border">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={(parentId, content) => {
              createComment({ mangaId, content, parentId })
            }}
            onLike={(commentId) => {
              toggleLike({ commentId, mangaId })
            }}
            onDelete={(commentId) => {
              deleteComment({ commentId, mangaId })
            }}
            currentUserId={comment.userId}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentsSection