"use client";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) =>
                    toast.success(
                        `You're now following ${data.following.username}`
                    )
                )
                .catch(() => toast.error("Something went wrong!"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) =>
                    toast.success(
                        `You have unfollowed ${data.following.username}`
                    )
                )
                .catch(() => toast.error("Something went wrong!"));
        });
    };

    const onClick = isFollowing ? handleUnfollow : handleFollow;

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
                    toast.success(`Blocked the user ${data.blocked.username}`);
                })
                .catch(() => toast.error("Something went wrong!"));
        });
    };

    return (
        <>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button disabled={isPending} onClick={handleBlock}>
                Block
            </Button>
        </>
    );
};
