import { useEffect, useState } from "react";
import api from "../services/api";


export function CategoryModal({ isOpen, onRequestClose, onCategoriesSuccessful, categoryToEdit }) {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setIsLoading(true);

            if (categoryToEdit) {
                await api.put(`/api/categories/edit/${categoryToEdit.id}`, {
                    name
                });

            } else {
                await api.post("/api/categories/create", {
                    name
                });
            }

        
            onCategoriesSuccessful();
            onRequestClose();

        } catch {
            alert('Error to create a category.');
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name)
        } else {
            setName("");
        }
    }, [categoryToEdit, isOpen])

    if (!isOpen) return null;

    return (
        <div className="fixed flex inset-0 bg-black/50 items-center justify-center">
            <div className="flex flex-col bg-white rounded-lg shadow-lg gap-5 p-5 w-full max-w-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">{categoryToEdit ? "Edit category" : "New category"}</h2>
                    <button
                        onClick={onRequestClose}
                        className="text-xl ">
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="w-full flex justify-center items-center gap-5">
                        <span>Name</span>
                        <input
                            required
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className="p-2 border text-left rounded-lg focus:outline-none focus:bg-gray-200 transition-colors"
                            type="text"
                            placeholder="e.g: Membership" />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 transition-colors disabled:bg-green-500/50 disabled:cursor-default w-full mt-5">{categoryToEdit ? "Save changes" : "Create"}</button>
                </form>
            </div>
        </div>
    )
}