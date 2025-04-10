import React, {ChangeEvent} from "react";
import { Modal, Button } from "react-bootstrap";
import {useState} from "react";

interface IAppTransactionModalProps {
    show: boolean;
    handleClose: () => void;
    onAdd: (description: string, amount: number, category: string) => void;
}

const AppTransactionModal: React.FC<IAppTransactionModalProps> = ({show, handleClose,onAdd}:IAppTransactionModalProps) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    placeholder="Enter description" />
                </div>
                <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                    placeholder="Enter amount" />
                </div>
                <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e:ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                >
                    <option value="">Select category</option>
                    <option value="test1">Test 1</option>
                    <option value="test2">Test 2</option>
                    <option value="test3">Test 3</option>
                </select>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onAdd(description, parseFloat(amount), category);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default AppTransactionModal;