import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import ProfilePic from "../../../assets/default-profile.jpg";
import { useRouter } from "next/navigation";

export default function PostHeader({ user, postUserId, currentUserId, setDeletePost }) {
  const router = useRouter();

  return (
    <div className="flex items-center mb-4 hover:cursor-pointer" onClick={() => router.push(`/${user.id}/profile`)}>
      <img src={ProfilePic} alt={user.username} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h4 className="mb-0 font-semibold">{user.first_name} {user.last_name}</h4>
        <p className="text-sm text-gray-600">@{user.username}</p>
      </div>
      {postUserId === +currentUserId && (
        <Button variant="link" className="ml-auto text-border" onClick={() => setDeletePost(true)}>
          <FaTimes size={20} />
        </Button>
      )}
    </div>
  );
}
