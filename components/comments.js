import { DateTime } from "luxon";

export default function Comments({ comments }) {
  return (
    <div className="mt-10 space-y-3">
      {comments.map(({ id, createdAt, text, user }) => {
        return (
          <div key={id} className="flex items-center space-x-2">
            <img
              src={user.picture}
              alt={user.name}
              width={40}
              className="rounded-3xl"
            />
            <div>
              <div className="space-x-2">
                <b>{user.name}</b>{" "}
                <time className="text-gray-400 text-xs">
                  ({DateTime.fromMillis(createdAt).toRelative()})
                </time>
              </div>
              <p>{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
