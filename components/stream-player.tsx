"use client";

import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream | null;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {
    return <div>Stream Player</div>;
};
