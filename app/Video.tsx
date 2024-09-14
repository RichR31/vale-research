'use client'

import React, { useState, useRef, useEffect } from 'react';
import option from './Option';
import Timeline from './timeline';
import { TimelineProps

 } from './timeline';
const descriptions = {
    'Cooperating/helping': 'Multiple characters contribute (e.g., offer their opinions or resources) toward a shared goal.',
    'Naming others\' emotions': 'One character states an emotion that another might feel (e.g., “You look sad.”).',
    'Resolving conflicts nonviolently': 'Characters resolve conflicting interests intentionally and peacefully (e.g., compromise).',
    'Decision-making': 'A character brainstorms, considers options, or assesses potential consequences (e.g., “How can I fix this? I could use tape or glue.”). Decision-making can be applied in either social or personal situations.',
    'Naming one\'s own emotions': 'A character identifies his or her emotions (e.g., “I’m happy,”) or asks viewers to name their emotion (e.g., “How do you feel?”).',
    'Managing one\'s own emotions': 'A character uses a nonviolent strategy to manage unwanted emotions (e.g., deep breathing or positive self-talk)'
};


interface Comment {
    time: string;
    text: string;
    width: number;
}

const dummyData: Comment[] = [
    {
        time: "00:10",
        text: "First comment",
        width: 0
    },
    {
        time: "00:30",
        text: "Second comment",
        width: 0
    },
    {
        time: "01:00",
        text: "Third comment",
        width: 0
    }
];



const data = [
    {
        name: 'Social-awareness and interpersonal skills',
        color: 'bg-fuchsia-300',
        skills: [
            'Cooperating/helping', "Naming others\' emotions", "Resolving conflicts nonviolently"
        ]
    },
    {
        name: 'Decision-making skills',
        color: 'bg-yellow-400',
        skills: [
            'Decision-making'
        ]
    },
    {
        name: 'Self-awareness and self-management skills',
        color: 'bg-cyan-500',
        skills: [
            'Naming one\'s own emotions', 'Managing one\'s own emotions'
            ]
    }
];





function Video() {
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [videoLength, setVideoLength] = useState(100);
    const [pausedTime, setPausedTime] = useState(null);
    const videoRef = useRef(null);
    const selectVideoRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const handleFileChange = (e:any) => {
        setSelectedFile(e.target.files[0]);
        
      };

    const handleClick = () => {
        selectVideoRef.current.click();
    };
    const handlePause = () => {
        if (videoRef.current != null){
            setPausedTime(videoRef.current.currentTime);
        }
        else{
            console.log("error with the video pause")
        }
    };

    const handleButtonClick = (e: any) => {
        if (videoRef.current != null) {
            videoRef.current.pause();
        } else {
            console.log("error with the video pause");
        }

        setSelectedSkill(e.target.id);
        setModalOpen(true);
    }

    


    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current != null) {
                setCurrentSeconds(videoRef.current.currentTime);  
            }
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, []);
    
    const content = data.map((category) => {
        return (
            <div className={'w-full h-fit flex flex-col items-center gap-2'} id={'c'+category.name}>
                <h2 className='text-black'>{category.name}</h2>
                <div className='w-full h-fit flex flex-col items-center gap-3'>
                    {category.skills.map((skill) => {
                        return (
                            <button id={skill} className={`w-fit px-6 py-1 rounded-2xl ${category.color} bg-white text-black flex justify-center items-center`} onClick={handleButtonClick}>
                                {skill}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    });

    const formatTime = (seconds: number) => {
        const minutes = Math.floor((seconds % 3600) / 60);
        seconds = Math.floor(seconds % 60);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,   
        '0')}`;
    };

    return (
        <div className='h-full w-full'>
            <div className='w-full h-[70%] bg-white flex  text-black'>
                {/* Modal */}
                <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center z-10 ${modalOpen ? 'block' : 'hidden'}`} >

                    <div className='w-full h-full fixed' onClick={() => setModalOpen(false)}></div>

                    <div className='w-[50rem] h-full bg-white flex flex-col items-center gap-5 rounded-xl py-5 px-8 z-20'>
                        <h2 className='text-black'>{selectedSkill}</h2>
                        <p className='text-black'>{descriptions[selectedSkill]}</p>
                        <p className='font-bold'>You are about to make a comment on second {formatTime(pausedTime)}</p>
                        <div className='w-full border flex justify-center'>
                            <textarea className='border border-black px-10 py-5 w-full' placeholder='Please describe the instance'></textarea>
                        </div>
                        <div className='w-full flex justify-center gap-5'>
                            <button className='bg-green-500 text-white px-10 py-3 rounded-xl'>Submit</button>
                            <button className='bg-red-500 text-white px-10 py-3 rounded-xl' onClick={() => setModalOpen(false)}>Cancel</button>
                        </div>

                    </div>
                </div>
                
                {/* Video page*/}
                <div className='h-full w-[70%] flex  bg-black justify-center'>

                    <input className='hidden' ref={selectVideoRef} type="file" accept=".mp4" onChange={handleFileChange} />
                    {selectedFile ? (
                        <video className='h-full w-full' ref={videoRef} controls onPause={handlePause} onLoadedMetadata={()=>setVideoLength(videoRef.current.duration)}>
                            <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                        </video>
                    ) : (
                        <button className={'h-full w-full flex flex-col items-center justify-center'} onClick={handleClick}>
                            <img className='h-[90%]' src="/upload.svg" alt="Upload" />
                            Click Here and upload a video 
                        </button>
                    )}
                    
                </div>

                {/* Sidebar */}
                {selectedFile ?(
                    <div className='h-full w-[30%] bg-orange-100 flex flex-col items-center justify-center gap-5'>
                        {content}
                    </div>
                ) :(
                    <div className='h-full w-[30%] bg-slate-400 flex flex-col items-center justify-center gap-5'>
                        <h2 className='text-white'>Please upload a video to get started</h2>
                    </div>)
                }
                
            </div>
            <div className='w-full h-[30%] bg-blue-200 flex items-center text-black absolute'>
                <div style={{ width: `${(currentSeconds / videoLength) * 100}%` }} className="bg-blue-500 h-full"></div>

            </div>
        </div>
    
    );
}

export default Video;

