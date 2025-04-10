import React from "react";
import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
import {ITransaction} from '../types/ITransaction.ts'

interface ITransactionsTableProps {
    transactions: ITransaction[],
    onRemove: (description: string, category: string, amount: number) => void
    onEdit: (transaction: ITransaction) => void
}

const AppTable: React.FC<ITransactionsTableProps> = ({transactions,onRemove}: ITransactionsTableProps) => {

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
            <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount ($)</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((t, index) => (
                <tr key={index}>
                    <td>{t.description}</td>
                    <td>{t.category}</td>
                    <td className={t.amount >= 0 ? 'text-success' : 'text-danger'}>
                        ${Math.abs(t.amount).toFixed(2)}
                    </td>
                    <td>
                        <Button variant="warning" size="sm" className="me-2">Edit</Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onRemove(t.description, t.category, t.amount)}
                        >
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default AppTable;