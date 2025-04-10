import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ITransaction } from '../types/ITransaction';

interface StatsProps {
  transactions: ITransaction[];
  
}

const Stats: React.FC<StatsProps> = ({ transactions }: StatsProps) => {
  const [monthlySummary, setMonthlySummary] = useState<Record<string, number>>({});

  useEffect(() => {
  
    const monthlyData: Record<string, number> = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += t.amount;
    });
    setMonthlySummary(monthlyData);
  }, [transactions]);

  
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(
    transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );
  
  const balance = totalIncome - totalExpenses;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Financial Statistics</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <Card.Text className="text-success h3">${totalIncome.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text className="text-danger h3">${totalExpenses.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Net Balance</Card.Title>
              <Card.Text className={balance >= 0 ? 'text-primary h3' : 'text-danger h3'}>
                ${balance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Monthly Summary</Card.Title>
              {Object.keys(monthlySummary).length > 0 ? (
                Object.entries(monthlySummary)
                  .sort((a, b) => {
                    const [aMonth, aYear] = a[0].split('/').map(Number);
                    const [bMonth, bYear] = b[0].split('/').map(Number);
                    
                    if (aYear !== bYear) return bYear - aYear;
                    return bMonth - aMonth;
                  })
                  .map(([month, amount], index) => (
                    <div key={index} className="d-flex justify-content-between mb-2">
                      <span>Month: {month}</span>
                      <span className={amount >= 0 ? 'text-success' : 'text-danger'}>
                        ${Math.abs(amount).toFixed(2)}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="text-muted">No monthly data available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;