import { Reply } from "lucide-react";
import { CommentInterface } from "../extensions/comment";

interface Props {
  comments: CommentInterface[];
  canComment: boolean;
  addComment: (parent_id?: string, comment?: string) => void;
}

export default function CommentList({
  comments,
  canComment,
  addComment,
}: Props) {
  return (
    comments.length > 0 && (
      <aside className="absolute flex flex-col gap-2 bg-white border rounded-md p-4 top-0 right-4 w-full max-w-sm">
        {comments.map((comment, index) => (
          <div key={index} className="rounded-md p-2 border-2">
            <div className="flex justify-between">
              <label>
                {comment.user.fullname}{" "}
                <span className="text-muted-foreground">
                  @{comment.user.username}
                </span>
              </label>
              {canComment && (
                <Reply
                  className="cursor-pointer"
                  onClick={() => addComment(comment.uuid!)}
                  size={20}
                />
              )}
            </div>
            {comment.parent_id && (
              <p className="my-2 pl-2 border-l-2 border-gray-600 text-gray-600">
                {comment.parent_title}
              </p>
            )}
            <p className="my-2">{comment.comment}</p>
            <div>
              <DisplayDate date={comment.date} />
            </div>
          </div>
        ))}
      </aside>
    )
  );
}

const DisplayDate = ({ date: _date }: { date: number | null }) => {
  if (!_date) return null;

  const $d = (d: number) => String(d).padStart(2, "0");

  const date: Date = new Date(_date);

  return (
    <div className="flex gap-2 items-center">
      {$d(date.getDate())}/{$d(date.getMonth() + 1)}/{date.getFullYear()} -{" "}
      {$d(date.getHours())}:{$d(date.getMinutes())}
    </div>
  );
};
