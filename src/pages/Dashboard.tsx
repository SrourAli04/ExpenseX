import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppTransactionModal from '../components/AppTransactionModal';
import AppTable from '../components/AppTable';
import { ITransaction } from '../types/ITransaction';

interface DashboardProps {
  transactions: ITransaction[];
  summary: {
    income: number;
    expenses: number;
    balance: number;
  };
  onAdd: (description: string, amount: number, category: string) => void;
  onUpdate: (id: string, description: string, amount: number, category: string) => void;
  onRemove: (id: string) => void;
}

const Dashboard:React.FC<DashboardProps> = ({
  transactions,
  summary,
  onAdd,
  onUpdate,
  onRemove
}: DashboardProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<ITransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>(transactions);
  const [categories, setCategories] = useState<string[]>([]);

  
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(transactions.map(t => t.category))
    );
    setCategories(uniqueCategories);
  }, [transactions]);

  
  useEffect(() => {
    let filtered = transactions;
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    setFilteredTransactions(filtered);
  }, [searchTerm, categoryFilter, transactions]);

  const handleEditTransaction = (transaction: ITransaction) => {
    setCurrentTransaction(transaction);
    setShowEditModal(true);
  };

  const handleAddTransaction = (description: string, amount: number, category: string) => {
    onAdd(description, amount, category);
    setShowAddModal(false);
  };

  const handleUpdateTransaction = (description: string, amount: number, category: string) => {
    if (currentTransaction) {
      onUpdate(currentTransaction.id, description, amount, category);
      setShowEditModal(false);
      setCurrentTransaction(null);
    }
  };

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="text-center">Expense Tracker</h2>
      </div>
      
      <Row className="mb-4">
        <Col xs={12} md={4}>
          <div className="p-3 border rounded shadow-sm">
            <h5>Total Income</h5>
            <h4 className="text-success">${summary.income.toFixed(2)}</h4>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="p-3 border rounded shadow-sm">
            <h5>Total Expenses</h5>
            <h4 className="text-danger">${summary.expenses.toFixed(2)}</h4>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="p-3 border rounded shadow-sm">
            <h5>Balance</h5>
            <h4 className={summary.balance >= 0 ? 'text-primary' : 'text-danger'}>
              ${summary.balance.toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <div className="p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="p-2">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </Col>
        <Col xs={12} md={2}>
          <div className="p-2">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Add Transaction
            </Button>
          </div>
        </Col>
      </Row>
      
      <Row>
        <AppTable
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onRemove={onRemove}
        />
      </Row>
      
      {/* Add Transaction Modal */}
      <AppTransactionModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onSubmit={handleAddTransaction}
        title="Add Transaction"
        buttonText="Add"
        categories={categories}
      />
      
      
      {currentTransaction && (
        <AppTransactionModal
          show={showEditModal}
          handleClose={() => {
            setShowEditModal(false);
            setCurrentTransaction(null);
          }}
          onSubmit={handleUpdateTransaction}
          title="Edit Transaction"
          buttonText="Update"
          initialValues={{
            description: currentTransaction.description,
            amount: currentTransaction.amount.toString(),
            category: currentTransaction.category
          }}
          categories={categories}
        />
      )}
    </Container>
  );
};

export default Dashboard;