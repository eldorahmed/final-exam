import React from "react";
import { Card, Avatar, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { EditAdmin } from "./EditAdmin";

const UserProfile = () => {
    const admin = useSelector((state)=>state.app.admin)
  const { id, username, avatar, access_token, refresh_token } = admin;

  return (
    <div className="flex justify-center p-4">
      <Card className="max-w-sm w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="flex flex-col items-center">
          <Avatar
            img={avatar || "https://img.icons8.com/?size=100&id=107049&format=png"}
            alt={`${username}'s Avatar`}
            rounded={true}
            className="mb-4"
            size="xl"
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {username}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">User ID: {id}</p>
          <p className="text-gray-500 dark:text-gray-400">
            Access Token: {access_token.substring(0, 20)}... (hidden)
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Refresh Token: {refresh_token.substring(0, 20)}... (hidden)
          </p>
        </div>
        <div className="flex justify-center mt-4">
         <EditAdmin/>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;