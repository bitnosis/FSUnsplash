import React from 'react';
const FullScreenImage =  ({closeModal, image}) => {
    return (
        <div className="modal modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay bg-black absolute w-full h-full opacity-95"></div>
                <div className="modal-container fixed w-full h-full z-50 overflow-y-auto ">
	                <div onClick={() => closeModal()}  className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                      <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                      </svg>
                      Close
                    </div>
                    <div className="modal-content container mx-auto h-auto text-left p-4">
                      <div className="flex  items-center pb-2">
                      <img className="rounded-full" src={image.user.profile_image.medium} />
                        <p className="text-xl ml-5 font-bold text-white ">Photo By @{image.user.username}</p>
                      </div>
                      <div className="imageView mt-10">
                        <img className="rounded puff-in-center " src={image.src} />
                      </div>
                </div>
            </div>
        </div>
    )
}

export default FullScreenImage