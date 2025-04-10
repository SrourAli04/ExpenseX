import React from "react";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import { ITransaction } from '../types/ITransaction';

interface ITransactionsTableProps {
  transactions: ITransaction[];
  onEdit: (transaction: ITransaction) => void;
  onRemove: (id: string) => void;
}

const AppTable: React.FC<ITransactionsTableProps> = ({
  transactions,
  onEdit,
  onRemove
}: ITransactionsTableProps) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td className={t.amount >= 0 ? 'text-success' : 'text-danger'}>
                  ${Math.abs(t.amount).toFixed(2)}
                </td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="me-2"
                    onClick={() => onEdit(t)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRemove(t.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-3">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AppTable;