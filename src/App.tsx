import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';
import Dashboard from './pages/Dashboard.tsx';
import Stats from './pages/Stats.tsx';
import { ITransaction } from './types/ITransaction.ts';


const App: React.FC = () => {
  // Initialize with static array of transactions instead of loading from localStorage
  const [transactions, setTransactions] = useState<ITransaction[]>([
    {
      id: '1',
      description: 'Initial Balance',
      amount: 100,
      category: 'Income',
      date: new Date().toISOString()
    },
    {
      id: '2',
      description: 'Groceries',
      amount: -45.75,
      category: 'Food',
      date: new Date().toISOString()
    },
    {
      id: '3',
      description: 'Salary',
      amount: 2500,
      category: 'Income',
      date: new Date().toISOString()
    },
    {
      id: '4',
      description: 'Rent',
      amount: -1200,
      category: 'Housing',
      date: new Date().toISOString()
    },
    {
      id: '5',
      description: 'Utilities',
      amount: -150.50,
      category: 'Bills',
      date: new Date().toISOString()
    }
  ]);
 
  // Calculate financial summaries
  const calculateSummary = () => {
    const income = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
   
    const expenses = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);
   
    const balance = income + expenses; // expenses are already negative
   
    return { income, expenses: Math.abs(expenses), balance };
  };

  const addTransaction = (description: string, amount: number, category: string) => {
    const newTransaction = {
      id: Date.now().toString(),
      description,
      amount,
      category,
      date: new Date().toISOString()
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const updateTransaction = (
    id: string,
    description: string,
    amount: number,
    category: string
  ) => {
    setTransactions(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, description, amount, category }
          : t
      )
    );
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions}
                  summary={calculateSummary()}
                  onAdd={addTransaction}
                  onUpdate={updateTransaction}
                  onRemove={removeTransaction}
                />
              }
            />
            <Route
              path="/stats"
              element={<Stats transactions={transactions}/>}
            />
          </Routes>
        </div>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;