import { useState } from "react";

export function ConfirmDeleteModal({ isOpen, onRequestClose, onConfirm }) {

    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;
    return (

        <div className="flex fixed inset-0 bg-black/50 items-center justify-center">
            <div className="flex flex-col gap-5 p-2 bg-white rounded-lg shadow-lg  justify-center items-center">
                <svg className='text-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
                <h1 className="text-4xl">Are you sure?</h1>
                <span className="text-lg text-gray-500">Are you sure about this process? By pressing Confirm, there's no comeback.</span>
                <div className="flex gap-10">
                    <button
                        onClick={async () => {
                            try {
                                setIsLoading(true);
                                
                                await onConfirm();
                                onRequestClose();
                            }
                            catch (error) {

                                alert(error);
                            } finally {
                                setIsLoading(false);
                            }

                        }}
                        disabled={isLoading}
                        className="p-2 bg-red-500 text-white rounded-lg text-lg hover:bg-red-600 transition-colors disabled:bg-red-500/50 disabled:cursor-default">Confirm</button>

                    <button onClick={onRequestClose}
                        className="p-2 rounded-lg border-2 border-black/50 text-lg hover:bg-gray-200 ">Cancel</button>
                </div>
            </div>
        </div>
    )
}