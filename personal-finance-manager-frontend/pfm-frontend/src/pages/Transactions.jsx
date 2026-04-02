import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import api from "../services/api";
import { TransactionModal } from "../components/TransactionModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";


export function Transactions() {

    const [transactions, setTransactions] = useState({
        content: [],
        last: true,
        first: true,
        totalPages: 0,
        number: 0
    });

    const [transaction, setTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const filteredTransactions = transactions.content?.filter(filteredTransaction =>
        (filteredTransaction.description.toLowerCase().includes(searchInput.toLowerCase()))
    ) || [];

    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [isElementSelected, setIsElementSelected] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);

    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);

    }

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    function handleOpenConfirmDeleteModal() {
        setIsConfirmDeleteModalOpen(true);
    }

    function handleCloseConfirmDeleteModal() {
        setIsConfirmDeleteModalOpen(false);

    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    const formatDate = (date) => {

        const dateToFormat = date.split("-");

        return `${dateToFormat[2]}/${dateToFormat[1]}/${dateToFormat[0]}`
    }



    const fetchAllTransactions = useCallback(async (pageNumber = 0) => {
        try {
            setIsLoading(true);

            const response = await api.get(`/api/transactions?page=${pageNumber}`);
            setTransactions(response.data);
        } catch (error) {
            alert(error)
        }
        finally {
            setIsLoading(false)
        }
    }, [])

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePreviousPage = () => {
        if (!transactions.first) {
            setPage(page - 1);
        }
    }

    useEffect(() => {

        fetchAllTransactions(page);

    }, [fetchAllTransactions, page])

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main className="max-w-4xl mx-auto mt-8 py-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <h1 className="font-bold text-2xl">Entire History</h1>
                        <div className="flex gap-5 items-center">
                            <input
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                                value={searchInput}
                                className="rounded-lg shadow-lg p-2 focus:outline-none focus:bg-gray-200 focus:placeholder:text-gray-600 transition-colors "
                                type="text"
                                placeholder="Search..." />
                            <div className="flex items-center gap-5">
                                <button
                                    onClick={handleOpenNewTransactionModal}
                                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors w-40">+ New Transaction</button>

                                <button
                                    onClick={handleOpenConfirmDeleteModal}
                                    className="whitespace-nowrap flex bg-red-500 gap-1 text-white rounded-lg p-2 hover:bg-red-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg> Delete All
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg mt-10 overflow-hidden">
                        {isLoading ? <div className="text-2xl text-center ">Loading transactions</div> :
                            transactions.content.length == 0 ? <div className="text-2xl text-center">You haven't created a transaction yet.</div> :
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left py-3 px-4 text-gray-600 ">Date</th>
                                            <th className="text-left py-3 px-4 text-gray-600">Description</th>
                                            <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                                            <th className="text-left py-3 px-4 text-gray-600">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredTransactions.length == 0 ?
                                            (<tr>
                                                <td colSpan={4} className="text-center py-6 text-gray-600">No transaction found for {searchInput}</td>
                                            </tr>) : (
                                                filteredTransactions.map(t => (
                                                    <tr
                                                        key={t.id}
                                                        onClick={() => {
                                                            setTransaction(t);
                                                            setIsElementSelected(true);
                                                            handleOpenNewTransactionModal();
                                                        }}
                                                        className="hover:bg-gray-100 transition-colors cursor-pointer">
                                                        <td className="px-4 py-3">{formatDate(t.date)}</td>
                                                        <td className="px-4 py-3 font-medium">{t.description}</td>
                                                        <td className={`px-4 py-3 font-medium ${t.type == 'REVENUE' ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(t.amount)}</td>
                                                        <td className="px-4 py-3">{t.category.name}</td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                    {!isLoading && (
                        <div className="flex justify-between items-center mt-3">
                            <span>Page {transactions.number + 1} of {transactions.totalPages}</span>

                            <div className="flex gap-5">
                                <button
                                    className="p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-800 disabled:cursor-default disabled:bg-blue-800/50 cursor-pointer w-24 transition-colors"
                                    onClick={handlePreviousPage}
                                    disabled={transactions.first}
                                >
                                    Previous
                                </button>

                                <button
                                    className="p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-800 disabled:cursor-default disabled:bg-blue-800/50 cursor-pointer w-24 transition-colors"
                                    onClick={handleNextPage}
                                    disabled={transactions.last}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                </main>

                <TransactionModal isOpen={isNewTransactionModalOpen}
                    onRequestClose={() => {
                        setTransaction(null);
                        handleCloseNewTransactionModal()
                    }}
                    onTransactionSuccess={() => {
                        setPage(0);
                        fetchAllTransactions(0);
                    }}
                    transactionToEdit={transaction}
                    onRequestDelete={() => {
                        
                        handleCloseNewTransactionModal();
                        handleOpenConfirmDeleteModal();
                    }}
                />
                <ConfirmDeleteModal isOpen={isConfirmDeleteModalOpen}
                    onRequestClose={() => {
                        handleCloseConfirmDeleteModal();
                        setIsElementSelected(false);
                    }}
                    onConfirm={async () => {
                        if (isElementSelected) {

                            await api.delete(`api/transactions/delete/${transaction.id}`);
                            setTransaction(null);
                            setPage(0);
                            fetchAllTransactions(0);
                        } else {
                            await api.delete('api/transactions/deleteAll');
                            setTransaction(null);
                            setPage(0);
                            fetchAllTransactions(0);
                        }

                        setPage(0);
                        fetchAllTransactions(0);
                    }}
                />
            </div>

        </>
    )
}