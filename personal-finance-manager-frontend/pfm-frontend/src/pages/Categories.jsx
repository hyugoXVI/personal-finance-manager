import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import api from "../services/api";
import { CategoryModal } from "../components/CategoryModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

export function Categories() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState(null);

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const handleOpenConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    }

    const handleCloseConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    }

    async function fetchCategories() {
        try {
            setIsLoading(true);

            const response = await api.get('api/categories');
            setCategories(response.data);
        } catch {
            alert("Couldn't load the categories.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-100">

                <Header />
                <main className="max-w-4xl mx-auto mt-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">My Categories</h1>
                        <button
                            onClick={() => {
                                setIsNewCategoryModalOpen(true);
                            }}
                            className="bg-green-500 rounded-lg text-white shadow-lg p-2 ">+ New Category</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        {isLoading ? (<div className="col-span-3">
                            <h1 className="text-center text-4xl">Loading categories.</h1>
                        </div>) : (
                            categories.map(c => (
                                <div
                                    key={c.id}
                                    className="flex justify-between bg-white rounded-lg shadow-lg py-4 px-3">
                                    <span className="ml-4 bg-gray-200 text-gray-600 font-medium rounded-full px-2">{c.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setCategory(c);
                                                setIsNewCategoryModalOpen(true);
                                            }}
                                            className="hover:text-black/50 transition-colors"><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg></button>

                                        <button
                                            onClick={() => {
                                                setCategory(c);
                                                handleOpenConfirmDeleteModal();
                                            }}
                                            className="hover:text-black/50 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
                <CategoryModal isOpen={isNewCategoryModalOpen} onRequestClose={() => {
                    setIsNewCategoryModalOpen(false)
                    setCategory(null);
                }} onCategoriesSuccessful={fetchCategories}
                    categoryToEdit={category} />

                <ConfirmDeleteModal isOpen={isConfirmDeleteModalOpen} onRequestClose={handleCloseConfirmDeleteModal}
                onConfirm={async () => {

                    await api.delete(`api/categories/delete/${category.id}`);
                    
                    setCategory(null);
                    fetchCategories();
                }}
                      />
            </div>
        </>
    )
}