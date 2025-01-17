import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth"); // Redirect to the auth page after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-5 right-5 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;