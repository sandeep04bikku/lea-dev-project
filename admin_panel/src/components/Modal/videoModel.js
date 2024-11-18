import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.keyCode === 27 && isOpen) {
                handleVideoClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const handleVideoClose = () => {
        setIsPlaying(false);
        onClose();
    };

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal') && isOpen) {
            handleVideoClose();
        }
    };

    const toggleMute = () => {
        setIsMuted(prevState => !prevState);
    };

    return (
        <>
            {isOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={handleClickOutside}>
                    <div className="modal-dialog modal-dialog-centered modal-lg" style={{ margin: 'auto' }}>
                        <div className="modal-content" style={{ backgroundColor: 'black' }}>
                            <div className="modal-header">
                                <h5 className="modal-title text-white" style={{ fontSize: "22px" }}>Video Player</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleVideoClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                                    <ReactPlayer
                                        ref={videoRef}
                                        url={videoUrl}
                                        width="100%"
                                        height="100%"
                                        controls={true}
                                        playing={isPlaying}
                                        muted={isMuted}
                                        style={{ position: 'absolute', top: '0', left: '0' }}
                                    />
                                    <button 
                                        className="btn btn-sm btn-outline-light" 
                                        style={{ position: 'absolute', top: '10px', right: '10px' }} 
                                        onClick={toggleMute}>
                                        {isMuted ? '🔇' : '🔊'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default VideoModal;
