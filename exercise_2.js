// 2. Create a currency converter between CLP, ARS, USD, EUR, TRY, GBP with the following features:
// * The user must choose their initial currency and the currency they want to exchange to.
// * The user can choose whether or not to withdraw their funds. If they choose not to withdraw, it should return to the main menu.
// * If the user decides to withdraw the funds, the system will charge a 1% commission.
// * Set a minimum and maximum amount for each currency, it can be of your choice.
// * The system should ask the user if they want to perform another operation. If they choose to do so, it should restart the process; otherwise, the system should close.

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CURRENCY_DATA = [
  {
    name: "CLP",
    exchangeRates: {
      ARS: 0.88,
      USD: 0.001,
      EUR: 0.00095,
      TRY: 0.033,
      GBP: 0.00081,
    },
    limits: { minimum: 100, maximum: 1000 },
  },
  {
    name: "ARS",
    exchangeRates: {
      CLP: 1.14,
      USD: 0.0012,
      EUR: 0.0011,
      TRY: 0.037,
      GBP: 0.00093,
    },
    limits: { minimum: 100, maximum: 1000 },
  },
  {
    name: "USD",
    exchangeRates: {
      CLP: 985.48,
      ARS: 861.87,
      EUR: 0.93,
      TRY: 32.27,
      GBP: 0.8,
    },
    limits: { minimum: 100, maximum: 1000 },
  },
  {
    name: "EUR",
    exchangeRates: {
      CLP: 1057.98,
      ARS: 925.22,
      USD: 1.07,
      TRY: 34.64,
      GBP: 0.86,
    },
    limits: { minimum: 100, maximum: 1000 },
  },
  {
    name: "TRY",
    exchangeRates: {
      CLP: 30.53,
      ARS: 26.71,
      USD: 0.031,
      EUR: 0.029,
      GBP: 0.025,
    },
    limits: { minimum: 100, maximum: 1000 },
  },
  {
    name: "GBP",
    exchangeRates: {
      CLP: 1236.19,
      ARS: 1081.48,
      USD: 1.25,
      EUR: 1.17,
      TRY: 40.47,
    },
    limits: { minimum: 100, maximum: 1000 },
  },
];

const COMMISSION = 0.01;

const currencyConverter = () => {
  console.log("-----Currency Converter-------");
  console.log(
    "Please choose your initial currency and the currency you want to exchange to."
  );
  console.log("Available currencies:");
  console.log(
    CURRENCY_DATA.map(
      (currency, index) => `${index + 1}. ${currency.name}`
    ).join("\n") + "\n"
  );

  const chooseCurrency = () => {
    readline.question("Choose your initial currency: ", (initial) => {
      readline.question(
        "Choose the currency you want to exchange to: ",
        (target) => {
          if (isNaN(initial) || isNaN(target)) {
            console.log("Invalid input. Please try again.");
            chooseCurrency();
            return;
          }

          const initialCurrency = CURRENCY_DATA[parseInt(initial) - 1] ?? null;
          const targetCurrency = CURRENCY_DATA[parseInt(target) - 1] ?? null;

          if (!initialCurrency || !targetCurrency) {
            console.log("Invalid currency. Please try again.");
            chooseCurrency();
            return;
          }

          if (initialCurrency.name === targetCurrency.name) {
            console.log("The currencies must be different. Please try again.");
            chooseCurrency();
          } else {
            chooseAmount(initialCurrency, targetCurrency);
          }
        }
      );
    });
  };

  const chooseAmount = (initialCurrency, targetCurrency) => {
    readline.question("Enter the amount you want to exchange: ", (input) => {
      const amount = parseFloat(input);
      if (
        amount >= initialCurrency.limits.minimum &&
        amount <= initialCurrency.limits.maximum
      ) {
        const convertedAmount = calculateConversion(
          amount,
          initialCurrency,
          targetCurrency
        );
        displayExchange(
          convertedAmount,
          initialCurrency.name,
          targetCurrency.name
        );
      } else {
        console.log("Invalid amount. Please try again.");
        chooseAmount();
      }
    });
  };

  const calculateConversion = (amount, initialCurrency, targetCurrency) => {
    return amount * initialCurrency.exchangeRates[targetCurrency.name];
  };

  const displayExchange = (amount, initialCurrencyName, targetCurrencyName) => {
    const parsedAmount = amount.toFixed(2);
    console.log(
      `You will receive ${parsedAmount} ${targetCurrencyName} for your ${initialCurrencyName}.`
    );
    readline.question(
      "Do you want to withdraw your funds? (yes/no): ",
      (response) => {
        if (response === "yes") {
          const total = amount - amount * COMMISSION;
          const parsedTotal = total.toFixed(2);
          console.log(`You will receive ${parsedTotal} ${targetCurrencyName}.`);
        }
        restart();
      }
    );
  };

  const restart = () => {
    readline.question(
      "Do you want to perform another operation? (yes/no): ",
      (response) => {
        if (response === "yes") {
          currencyConverter();
        } else {
          readline.close();
        }
      }
    );
  };

  chooseCurrency();
};

currencyConverter();
