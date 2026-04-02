import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import api from "../services/api";
import { useNavigate } from "react-router-dom";



export function Dashboard() {

    const [transactions, setTransactions] = useState([]);

    const [summary, setSummary] = useState({
        balance: 0,
        revenue: 0,
        expense: 0
    });

    const Maps = useNavigate();

    function formatCurrency(value) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency", currency: "BRL"
        }).format(
            value,
        )
    }

    useEffect(() => {
        try{

            async function fetchSummary() {
                const response = await api.get("/api/dashboard");
                setSummary({
                    balance: response.data.balance,
                    revenue: response.data.revenue,
                    expense: response.data.expense
                });
            }
            fetchSummary()
        } catch(error){
            alert(error);
        }
    }, [])

    useEffect(() => {
        async function fetchTransactions() {
            const response = await api.get("api/dashboard/firstFiveTransactions");
            setTransactions(response.data)
        }
        fetchTransactions();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main className="max-w-4xl mx-auto mt-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white rounded-lg shadow-lg border h-full flex flex-col justify-center">
                            <div className="flex flex-col justify-center items-start gap-2 p-4">
                                <span className="text-gray-500 text-lg">Balance</span>
                                <strong className={`text-4xl ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(summary.balance)}</strong>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="bg-white rounded-lg shadow-lg border p-4">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">Revenue</span>
                                        <span className="text-2xl">{formatCurrency(summary.revenue)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg border p-4">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">Expense</span>
                                        <span className="text-2xl">{formatCurrency(summary.expense)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'bg-white rounded-lg shadow-lg'}>
                        <h1 className="text-2xl p-4 border-b border-300 text-center">{transactions.length == 0 ? 'No recent created transactions.' :
                            "Recent Created Transactions"}</h1>
                        <table className="w-full">
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id} className="border-b border-gray-300 last:border-0 hover:bg-gray-100">
                                        <td className="text-gray-500 px-6 py-4 text-sm">{new Intl.DateTimeFormat('pt-br').format(new Date(transaction.createdAt))}</td>
                                        <td className="py-4 w-1">
                                            <div className={`p-2 rounded-lg  ${transaction.type == 'REVENUE' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {transaction.type == 'REVENUE' ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                    </svg>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-gray-700 w-full">{transaction.description}</td>
                                        <td className={`text-right font-bold  py-4 px-6 whitespace-nowrap ${transaction.type == 'REVENUE' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type == 'EXPENSE' && '- '}
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                            {transactions.length != 0 &&
                                (<tfoot>
                                    <tr>
                                        <td colSpan={4}
                                            className="text-center py-4 text-lg font-semibold hover:text-gray-400 cursor-pointer transition-colors hover:bg-gray-200 "
                                            onClick={() => { Maps("/transactions") }} >See all transactions</td>
                                    </tr>
                                </tfoot>)}
                        </table>

                    </div>
                </main>


            </div>
        </>
    )
}