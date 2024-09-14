import React, { useEffect, useRef } from 'react';

export interface Comment {
    time: string; // Format: "mm:ss"
    text: string;
    width: number; // Add the width property
}

export interface TimelineProps {
    videoLength: string; // Format: "mm:ss"
    comments: Comment[];
}

const Timeline: React.FC<TimelineProps> = ({ videoLength, comments }) => {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timelineRef.current) {
            const timelineWidth = timelineRef.current.offsetWidth;
            const videoLengthInSeconds = convertTimeToSeconds(videoLength);

            // Calculate the width of each comment based on the video length
            comments.forEach((comment) => {
                const commentTimeInSeconds = convertTimeToSeconds(comment.time);
                const commentWidth = (commentTimeInSeconds / videoLengthInSeconds) * timelineWidth;
                comment.width = commentWidth;
            });

            // Scroll to the last comment
            const lastComment = comments[comments.length - 1];
            if (lastComment) {
                timelineRef.current.scrollLeft = lastComment.width;
            }
        }
    }, [videoLength, comments]);

    const convertTimeToSeconds = (time: string): number => {
        const [minutes, seconds] = time.split(':');
        return parseInt(minutes) * 60 + parseInt(seconds);
    };

    return (
        <div className="timeline" ref={timelineRef}>
            {comments.map((comment, index) => (
                <div key={index} className="comment" style={{ width: comment.width }}>
                    {comment.text}
                </div>
            ))}
        </div>
    );
};

export default Timeline;