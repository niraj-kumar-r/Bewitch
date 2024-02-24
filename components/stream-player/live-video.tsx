"use client";

import { useRef } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks, UseTracksOptions } from "@livekit/components-react";

interface LiveVideoProps {
    participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });

    return (
        <div ref={wrapperRef} className="relative h-full flex">
            <video ref={videoRef} width="100%" />
        </div>
    );
};
