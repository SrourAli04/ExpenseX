import './App.css';
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import AppTransactionModal from './components/AppTransactionModal';
import AppTable from './components/AppTable.tsx';
import { ITransaction } from './types/ITransaction.ts';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([
    {
      description: 'transaction1',
      amount: 2,
      category: 'test',
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  const addTransaction = (description: string, amount: number, category: string) => {
    const newTransaction = {
      description,
      amount,
      category,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setShowModal(false);
  };

  const handleRemoveTransaction = (description: string, category: string, amount: number) => {
    setTransactions((prev) =>
      prev.filter(
        (t) =>
          !(t.description === description && t.amount === amount && t.category === category)
      )
    );
  };

  // Handle edit action
  const handleEditTransaction = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  // Update existing transaction
  const handleUpdateTransaction = (updatedTransaction: ITransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.description === updatedTransaction.description &&
        transaction.category === updatedTransaction.category
          ? updatedTransaction
          : transaction
      )
    );
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container className="flex-grow-1">
        <div className="mt-2">
          <h2 className="text-center">Expense Tracker</h2>
        </div>
        <Row>
          <Col xs={12} md={4}>
            <div className="p-3 border">
              <h5>Total Income</h5>
              <h4 className="text-success">$20</h4>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-3 border">
              <h5>Total Expenses</h5>
              <h4 className="text-danger">$20</h4>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-3 border">
              <h5>Balance</h5>
              <h4>$20</h4>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} md={6}>
            <div className="p-2 ">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-2 ">
              <select name="category" className="form-select">
                <option value="">Select category</option>
                <option value="test1">Test 1</option>
                <option value="test2">Test 2</option>
                <option value="test3">Test 3</option>
              </select>
            </div>
          </Col>
          <Col xs={12} md={2}>
            <div className="p-2 ">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Category
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <AppTable
            transactions={transactions}
            onRemove={handleRemoveTransaction}
            onEdit={handleEditTransaction} // Pass the edit function here
          />
        </Row>
      </Container>
      <AppTransactionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onAdd={addTransaction}
      />
      <AppFooter />
    </div>
  );
}

export default App;
