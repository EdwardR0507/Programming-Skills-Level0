// 4. Create an online shipping system with the following features:
// * The system has a login that locks after the third failed attempt.
// * Display a menu that allows: Sending a package, exiting the system.
// * To send a package, sender and recipient details are required.
// * The system assigns a random package number to each sent package.
// * The system calculates the shipping price. $2 per kg.
// * The user must input the total weight of their package, and the system should display the amount to pay.
// * The system should ask if the user wants to perform another operation. If the answer is yes, it should return to the main menu. If it's no, it should close the system.

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const USERNAME = 'admin';
const PASSWORD = 'admin';

const MAX_WEIGHT = 100;
const SHIPPING_PRICE = 2;
const MAX_ATTEMPTS = 3;

let loginAttempts = 0;
let packageNumber = 0;

const login = () => {
  readline.question('Enter your username: ', (username) => {
    readline.question('Enter your password: ', (password) => {
      if (username === USERNAME && password === PASSWORD) {
        console.log('Login successful!');
        mainMenu();
      } else {
        loginAttempts++;
        if (loginAttempts >= MAX_ATTEMPTS) {
          console.log('Too many login attempts. The system is locked.');
          readline.close();
        } else {
          console.log(
            'Invalid credentials. Attempts left:',
            MAX_ATTEMPTS - loginAttempts
          );
          login();
        }
      }
    });
  });
};

const mainMenu = () => {
  console.log('1. Send a package');
  console.log('2. Exit');
  readline.question('Select an option: ', (option) => {
    switch (option) {
      case '1':
        sendPackage();
        break;
      case '2':
        console.log('Thank you for using the system.');
        readline.close();
        break;
      default:
        console.log('Invalid option. Try again.');
        mainMenu();
    }
  });
};

const sendPackage = () => {
  readline.question(
    'Enter the total weight of the package (in kg): ',
    (weight) => {
      if (isNaN(weight) || weight <= 0 || weight > MAX_WEIGHT) {
        console.log('Invalid weight. Try again.');
        sendPackage();
      } else {
        packageNumber++;
        readline.question("Enter the sender's name: ", (sender) => {
          readline.question("Enter the recipient's name: ", (recipient) => {
            const price = weight * SHIPPING_PRICE;
            console.log(`Package number: ${packageNumber}`);
            console.log(`Sender: ${sender}`);
            console.log(`Recipient: ${recipient}`);
            console.log(`Shipping price: $${price}`);
            readline.question(
              'Do you want to perform another operation? (yes/no) ',
              (answer) => {
                if (answer.toLowerCase() === 'yes') {
                  mainMenu();
                } else {
                  console.log('Thank you for using the system.');
                  readline.close();
                }
              }
            );
          });
        });
      }
    }
  );
};

login();
