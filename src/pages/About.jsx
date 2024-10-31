import React from "react";
import { Card, Button } from "flowbite-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4 text-lg">
        Welcome to our articles platform! We are dedicated to providing a space
        where writers can express their thoughts and share their knowledge with
        the world. Our mission is to foster creativity and connect people through
        the power of storytelling.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
      <p className="mb-4 text-lg">
        Our mission is to empower writers of all levels to share their stories
        and insights with a global audience. We believe that every voice matters
        and that sharing knowledge can inspire positive change.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.name} className="w-full max-w-xs">
            <img src={member.avatar} alt={member.name} className="rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
              <Button color="light" className="mt-3" href={member.linkedIn}>
                Connect on LinkedIn
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


const teamMembers = [
  {
    name: "Me",
    role: "Founder & CEO",
    bio: "Me is a passionate writer and entrepreneur who believes in the power of storytelling.",
    avatar: "https://via.placeholder.com/150",
    linkedIn: "#", 
  },
  {
    name: "Farhod Nazarov",
    role: "Editor",
    bio: "Farxod is an experienced editor with a love for literature and helping writers refine their craft.",
    avatar: "https://via.placeholder.com/150",
    linkedIn: "#", 
  },
  {
    name: "Mavlono",
    role: "Content Strategist",
    bio: "Mavlono is a content strategist who specializes in helping brands tell their stories effectively.",
    avatar: "https://via.placeholder.com/150",
    linkedIn: "#", 
  },
];

export default About;