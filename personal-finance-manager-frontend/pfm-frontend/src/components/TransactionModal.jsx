import { useEffect, useState } from "react";
import api from "../services/api";


export function TransactionModal({ isOpen, onRequestClose, onTransactionSuccess, transactionToEdit, onRequestDelete }) {


    const [type, setType] = useState("REVENUE");
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [date, setDate] = useState('');

    const [categories, setCategories] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleCreateNewTransaction = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            if (transactionToEdit) {
                await api.put(`api/transactions/edit/${transactionToEdit.id}`, {
                    type, amount, description, categoryId: Number(categoryId), date
                });
            } else {
                await api.post('api/transactions/create', {
                    type, amount, description, categoryId: Number(categoryId), date
                });
            }

            onRequestClose();
            onTransactionSuccess();
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    }



    useEffect(() => {
        if (transactionToEdit) {
            setType(transactionToEdit.type);
            setAmount(transactionToEdit.amount);
            setDescription(transactionToEdit.description);
            setCategoryId(transactionToEdit.category.id);
            setDate(transactionToEdit.date);
        } else {
            setType("REVENUE");
            setAmount(0.0);
            setDescription("");
            setCategoryId("");
            setDate("");
        }

    }, [transactionToEdit, isOpen])

    useEffect(() => {
        async function fetchCategories() {

            const response = await api.get("/api/categories");
            setCategories(response.data);
        }
        fetchCategories();
    }, [])

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg flex flex-col gap-2 p-5 w-full max-w-md ">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">{transactionToEdit ? "Edit transaction" : "New transaction"}</h2>
                    <button
                        onClick={onRequestClose}
                        className="text-xl">✕</button>
                </div>
                <form onSubmit={handleCreateNewTransaction} >
                    <div className="mt-3 ml-10 flex flex-col gap-5">
                        <div className="flex gap-5 items-center">
                            <span>Date</span>
                            <input
                                required
                                type="date"
                                value={date}
                                onChange={(e) => { setDate(e.target.value) }}
                                className="p-2  w-full text-center rounded-lg focus:outline-none focus:bg-gray-200 transition-colors" />
                        </div>
                        <div className="flex gap-5 items-center">
                            <span>Description</span>
                            <input
                                required
                                type="text"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                className="p-2 w-full text-center rounded-lg focus:outline-none focus:bg-gray-200 transition-colors" />
                        </div>
                        <div className="flex gap-5 items-center">
                            <span>Amount</span>
                            <div className="flex gap-2 items-center justify-center w-full">
                                <span >R$</span>
                                <input
                                    required
                                    step={'0.01'}
                                    type="number"
                                    value={amount}
                                    onChange={(e) => { setAmount(e.target.value) }}
                                    className="p-2 w-full text-center rounded-lg focus:outline-none focus:bg-gray-200 transition-colors" />
                            </div>
                        </div>
                        <div className="flex gap-5 items-center">
                            <span>Type</span>
                            <div className="w-full flex justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setType('REVENUE');
                                    }}
                                    className={`${type == 'REVENUE' ? 'bg-green-500 text-white ' : 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'} p-2 rounded-lg`}>Revenue</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setType('EXPENSE');
                                    }}
                                    className={`${type == 'EXPENSE' ? 'bg-red-500 text-white' : 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'} p-2 rounded-lg`}>Expense</button>
                            </div>
                        </div>
                        <div className="flex gap-5 items-center">
                            <span>Category</span>
                            <select
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                }}
                                className='w-full p-3 rounded-lg border border-gray-300 text-center hover:bg-gray-300 cursor-pointer'>
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-5 items-center justify-center">

                            <button type='submit'
                                disabled={isLoading}
                                className={`bg-green-500 rounded-lg p-2 text-white hover:bg-green-600 shadow-lg disabled:bg-green-500/50 disabled:cursor-default  ${!transactionToEdit && 'w-full'}`}>
                                {transactionToEdit ? "Save changes" : "Add"}
                            </button>

                            {transactionToEdit && (<button type="button"
                                onClick={onRequestDelete}
                                className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600 shadow-lg w-24">
                                Delete
                            </button>)}
                        </div>


                    </div>
                </form>
            </div>
        </div>
    )

}