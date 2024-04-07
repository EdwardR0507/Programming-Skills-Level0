//1. Create an online banking system with the following features:
// * Users must be able to log in with a username and password.
// * If the user enters the wrong credentials three times, the system must lock them out.
// * The initial balance in the bank account is $2000.
// * The system must allow users to deposit, withdraw, view, and transfer money.
// * The system must display a menu for users to perform transactions.

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const INITIAL_BALANCE = 2000;
const MAX_ATTEMPTS = 3;
const USERNAME = 'admin';
const PASSWORD = 'admin123';

let balance = INITIAL_BALANCE;
let attempts = 0;

const startManchesterBankApp = () => {
  console.log('----- Manchester Bank Login -----');
  console.log('Please enter your username and password to login.');

  authenticateUser();
};

const authenticateUser = () => {
  readline.question('Enter username: ', (username) => {
    readline.question('Enter password: ', (password) => {
      if (username === USERNAME && password === PASSWORD) {
        console.log('Login successful.');
        displayMenu();
      } else {
        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
          console.log('You have been locked out. Too many failed attempts.');
          readline.close();
        } else {
          console.log(
            'Invalid credentials. Attempts left:',
            MAX_ATTEMPTS - attempts
          );
          authenticateUser();
        }
      }
    });
  });
};

const displayMenu = () => {
  console.log('----- Welcome to Manchester Bank -----');
  console.log('1. Deposit');
  console.log('2. Withdraw');
  console.log('3. View Balance');
  console.log('4. Transfer');
  console.log('5. Exit');

  readline.question('Enter option: ', (option) => {
    switch (option) {
      case '1':
        performDeposit();
        break;
      case '2':
        performWithdrawal();
        break;
      case '3':
        viewBalance();
        break;
      case '4':
        performTransfer();
        break;
      case '5':
        exitBankApp();
        break;
      default:
        console.log('Invalid option');
        displayMenu();
        break;
    }
  });
};

const performDeposit = () => {
  readline.question('Enter deposit amount: ', (amount) => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      console.log('Invalid deposit amount.');
    } else {
      balance += depositAmount;
      console.log('Deposited: $', depositAmount.toFixed(2));
    }
    displayMenu();
  });
};

const performWithdrawal = () => {
  readline.question('Enter withdrawal amount: ', (amount) => {
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      console.log('Invalid withdrawal amount.');
    } else if (withdrawalAmount > balance) {
      console.log('Insufficient funds.');
    } else {
      balance -= withdrawalAmount;
      console.log('Withdrawn: $', withdrawalAmount.toFixed(2));
    }
    displayMenu();
  });
};

const viewBalance = () => {
  console.log('Balance: $', balance.toFixed(2));
  displayMenu();
};

const performTransfer = () => {
  readline.question('Enter transfer amount: ', (amount) => {
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      console.log('Invalid transfer amount.');
    } else if (transferAmount > balance) {
      console.log('Insufficient funds.');
    } else {
      balance -= transferAmount;
      console.log('Transferred: $', transferAmount.toFixed(2));
    }
    displayMenu();
  });
};

const exitBankApp = () => {
  console.log('Thank you for using Manchester Bank services');
  console.log('Goodbye!');
  readline.close();
};

startManchesterBankApp();
