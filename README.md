# Expense Tracker

A comprehensive React and TypeScript application for tracking personal finances. This application allows users to manage their income and expenses with an intuitive interface.

![image](https://github.com/user-attachments/assets/e6deb9ea-c2fc-4641-ab64-65be4c38d60a)

## Features

- **Transaction Management**
  - Add new income and expense transactions
  - Edit existing transactions
  - Delete unwanted transactions
  - Search transactions by description or category

- **Financial Dashboard**
  - Overview of current balance
  - Summary of income and expenses
  - Recent transaction history

- **Statistics**
  - Total income and expenses
  - Monthly financial summary
  - Visual representation of spending patterns

- **Responsive Design**
  - Works on mobile, tablet, and desktop devices

## Technologies Used

- React.js
- TypeScript
- React Router for navigation
- React Bootstrap for UI components
- CSS for custom styling

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/expense-tracker.git
   ```

2. Navigate to the project directory:
   ```
   cd expense-tracker
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Future Improvements

### Category Management

The current implementation fetches unique categories from transactions, which is not efficient. Future improvements will include:

- Separate category management system independent of transactions
- Ability to add and remove categories
- Persistently store categories even when all transactions of a type are deleted
- Category-based filtering and reporting

### Additional Planned Enhancements

- Data persistence with localStorage or a backend database
- Export functionality for reports (CSV, PDF)
- Budget setting and tracking
- Recurring transaction support
- Advanced filtering and sorting options
- Data visualization with charts and graphs
- Dark/light theme toggle
- User authentication and profiles
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reactrouter.com/)
