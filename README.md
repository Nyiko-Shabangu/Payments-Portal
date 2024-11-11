# Customer International Payments Portal

## Project Description
The Customer International Payments Portal is a secure web application that enables customers to make international payments through a user-friendly interface. This portal supports secure registration and login, transaction processing, and employee verification of payments. The application is built with React for the front end and Node.js with Express for the back end, ensuring a robust and scalable solution for handling sensitive payment data.

## Key Features
- **Secure User Registration and Authentication:** 
  - Customers register with personal details (full name, ID number, account number, and password).
  - All passwords are hashed and salted for security.
  - Employees are pre-registered and only require login access.

- **Transaction Processing:**
  - Customers initiate payments by selecting the currency, and provider, and entering the recipient’s account and SWIFT details.
  - Transactions are securely stored and can be verified by bank employees.

- **Employee Verification System:**
  - Bank employees verify customer payments by validating account and SWIFT details before forwarding them to SWIFT for processing.

- **Security Features:**
  - Input validation through regular expressions to prevent injection attacks.
  - SSL/TLS encryption ensures data security during transmission.
  - Protection from XSS, CSRF, and brute force attacks via rate limiting.

- **DevOps & Security Integration:**
  - **CircleCI**: Automates the build, test, and deployment process with continuous integration.
  - **SonarQube**: Static code analysis to ensure code quality and security.
  - **GitHub Actions**: Automated workflows for building, testing, and security checks.

## Technologies Used
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB (or your chosen database)
- **Security Libraries:** bcrypt, helmet, express-rate-limit
- **DevOps Tools:** CircleCI, SonarQube

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (Local or cloud database MongoDB Atlas)
- **CircleCI Account** (For CI/CD)
- **SonarQube Instance** (For code quality and security scanning)

### Steps to Install
1. **Clone the Repository**
   ```bash
   git clone https://github.com/IIEWFL/apds7311-part-2-code-crusaders.git
   cd apds7311-part-2-code-crusaders
   ```

2. **Install Dependencies**
   - For the backend:
   ```bash
   cd APDS7311Backend
   npm install
   ```

   - For the frontend:
   ```bash
   cd apds7311frontend
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the `server` directory and add your database connection string and other necessary variables.
   ```plaintext
   DATABASE_URL=mongodb://localhost:27017/yourdbname
   DATABASE_URL=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   SECRET_KEY=your_secret_key
   ```

4. **Run the Application**
   - Start the backend server:
   ```back
   cd APDS7311Backend
   npm run dev
   ```

   - Start the frontend application:
   ```bash
   cd apds7311frontend
   npm start
   ```

5. **Access the Application**
   Open your web browser and navigate to `http://localhost:3000` to access the Customer International Payments Portal.

## Usage
- **Register:** Create an account by providing your full name, ID number, account number, and password.
- **Log In:** Use your username and password to log into the portal.
- **Make a Payment:** Enter the payment details, including the amount, currency, recipient's account information, and SWIFT code. Click "Pay Now" to complete the transaction.
- **Employee Actions:** Pre-registered employees can log in to verify transactions and submit them to SWIFT.

## Security Considerations
- **Password Security:** User passwords are securely hashed and salted using bcrypt.
- **Input Whitelisting:** All user inputs are validated against predefined regular expressions to prevent injections.
- **SSL/TLS:** Ensure that the application is served over HTTPS to protect data in transit.
- **Protection Against Attacks:** The application implements various security measures, including rate limiting, XSS protection, and CSRF protection.

# Continuous Integration & Security
- **CircleCI:** Automates the build, test, and deployment process, ensuring continuous integration.
- **SonarQube:** Conducts static code analysis to detect vulnerabilities and improve code quality.

## Video Demonstration

test
A video demonstration of the application in action can be found here: https://1drv.ms/v/s!AgphdzKygjujp_J3Y46CvTW3Tta48w?e=nYdJ9M  



[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/e2cvv-Qf)
