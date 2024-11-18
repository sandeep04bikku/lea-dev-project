import React, { useEffect, useRef } from 'react';

const ViewImagePdfModal = ({ showModal, handleCloseModal, modalContent }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        if (showModal) {
            // Add event listener when modal is shown
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove event listener when modal is hidden
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Clean up: remove event listener when component unmounts or showModal becomes false
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, handleCloseModal]);

    // Inline style to control display based on showModal state
    const modalStyle = {
        display: showModal ? 'block' : 'none'
    };

    return (
        <>
            {/* Modal container */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={modalStyle}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content" ref={modalRef}>
                        {/* Modal header */}
                        <div className="modal-header">
                            <h5 className="modal-title">Government Certificate</h5>
                            {/* Close button */}
                            <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            {modalContent}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal backdrop */}
            {showModal && <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>}
        </>
    );
};

export default ViewImagePdfModal;
