"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = ({ params}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname(); 
  const userID = params.id;
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userID}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (pathName) fetchPosts();
  }, [pathName]);
  //   const handleEdit = (post) => {
  //     router.push(`/update-prompt?id=${post._id}`);
  //   };

  //   const handleDelete = async (post) => {
  //     const hasConfirmed = confirm(
  //       "Are you sure you want to delete this prompt?"
  //     );

  //     if (hasConfirmed) {
  //       try {
  //         await fetch(`/api/prompt/${post._id.toString()}`, {
  //           method: "DELETE",
  //         });

  //         const filteredPosts = userPosts.filter((item) => item._id !== post._id);

  //         setUserPosts(filteredPosts);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
    console.log("pathName: ", pathName.split("/")[2]);
    console.log("data: ",userPosts);
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. We'll be able to see ${userName} exceptional prompts and inspire others with the power of your imagination`}
      data={userPosts}
      //   handleEdit={handleEdit}
      //   handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
