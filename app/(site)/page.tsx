"use client";

import { Button, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function App() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen flex items-center flex-col mt-10 gap-10 px-10">
      {session?.user && (
        <div>
          <User
            name={session.user.name}
            description={session.user.email}
            avatarProps={{
              src: session.user.image || "",
            }}
          />
        </div>
      )}
      <div className="text-4xl font-mono text-center">
        Revolutionize Team Formation with AI-Powered Collaboration
      </div>
      {!session && (
        <Button color="primary" as={Link} href="/api/auth/signin">
          Get Started
        </Button>
      )}
      <div className="text-lg px-20 space-y-4 text-justify indent-10">
        <p>
          In a world driven by collaboration, the importance of assembling the
          right team cannot be overstated. At Team AI, we understand the
          challenges of creating well-balanced, cohesive teams that leverage
          diverse skill sets while maximizing productivity. That&apos;s why
          we&apos;ve harnessed the power of artificial intelligence to simplify
          and optimize the team formation process.
        </p>
        <p>
          Our cutting-edge AI algorithms analyze a myriad of factors from
          individual skill sets and expertise to personal preferences and
          working styles to intelligently match and form teams. Whether
          you&apos;re embarking on a project, organizing an event, or seeking
          like-minded individuals for a creative endeavor, our platform
          streamlines the otherwise complex task of team formation.
        </p>
        <p>
          With a user-friendly interface and a commitment to precision, our
          platform ensures that teams are not just randomly pieced together but
          curated strategically for optimal synergy. It&apos;s about fostering
          collaboration that transcends boundaries and propels your projects
          toward success.
        </p>
        <p>
          Are you ready to experience a new era of team formation? Join us and
          witness how AI revolutionizes collaboration by creating teams that
          excel together effortlessly. Start forging partnerships that amplify
          creativity, efficiency, and innovation today.
        </p>
      </div>
    </div>
  );
}
