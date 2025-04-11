import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface IAppTransactionModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmit: (description: string, amount: number, category: string) => void;
  title: string;
  buttonText: string;
  initialValues?: {
    description: string;
    amount: string;
    category: string;
  };
  categories: string[];
}

const AppTransactionModal: React.FC<IAppTransactionModalProps> = ({
  show,
  handleClose,
  onSubmit,
  title,
  buttonText,
  initialValues,
  categories
}: IAppTransactionModalProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: ""
  });

 
  useEffect(() => {
    if (initialValues) {
      setDescription(initialValues.description);
      setAmount(initialValues.amount);
      setCategory(initialValues.category);
    } else {
      setDescription("");
      setAmount("");
      setCategory("");
    }
    setNewCategory("");
    setShowNewCategory(false);
    setErrors({
      description: "",
      amount: "",
      category: ""
    });
  }, [show, initialValues]);

  const validateForm = () => {
    const newErrors = {
      description: "",
      amount: "",
      category: ""
    };
    
    let isValid = true;
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    
    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (isNaN(parseFloat(amount))) {
      newErrors.amount = "Amount must be a number";
      isValid = false;
    }
    
    if (!category && !showNewCategory) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    
    if (showNewCategory && !newCategory.trim()) {
      newErrors.category = "New category name is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const finalCategory = showNewCategory ? newCategory : category;
      onSubmit(description, parseFloat(amount), finalCategory);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              placeholder="Enter description"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              placeholder="Enter amount (negative for expenses)"
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Use positive values for income and negative values for expenses.
            </Form.Text>
          </Form.Group>
          
          {!showNewCategory ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Button 
                variant="link" 
                className="p-0 mb-3" 
                onClick={() => setShowNewCategory(true)}
              >
                + Add new category
              </Button>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>New Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  isInvalid={!!errors.category}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Button 
                variant="link" 
                className="p-0 mb-3" 
                onClick={() => setShowNewCategory(false)}
              >
                Use existing category instead
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppTransactionModal;