// 3. Create an university enrollment system with the following characteristics:
// * The system has a login with a username and password.
// * Upon logging in, a menu displays the available programs: Computer Science, Medicine, Marketing, and Arts.
// * The user must input their first name, last name, and chosen program.
// * Each program has only 5 available slots. The system will store the data of each registered user, and if it exceeds the limit, it should display a message indicating the program is unavailable.
// * If login information is incorrect three times, the system should be locked.
// * The user must choose a campus from three cities: London, Manchester, Liverpool.
// * In London, there is 1 slot per program; in Manchester, there are 3 slots per program, and in Liverpool, there is 1 slot per program.
// * If the user selects a program at a campus that has no available slots, the system should display the option to enroll in the program at another campus.

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PROGRAMS = ["Computer Science", "Medicine", "Marketing", "Arts"];
const CITIES = ["London", "Manchester", "Liverpool"];

const USERNAME = "admin";
const PASSWORD = "admin";

const MAX_SLOTS = 5;
const SLOTS_PER_CITY = {
  London: 1,
  Manchester: 3,
  Liverpool: 1,
};

let loginAttempts = 0;
const enrolled = [];

const login = () => {
  readline.question("Enter your username: ", (username) => {
    readline.question("Enter your password: ", (password) => {
      if (username === USERNAME && password === PASSWORD) {
        console.log("Login successful!");
        mainMenu();
      } else {
        loginAttempts++;
        if (loginAttempts === 3) {
          console.log("Too many login attempts. The system is locked.");
          readline.close();
        } else {
          console.log("Incorrect username or password. Try again.");
          login();
        }
      }
    });
  });
};

const mainMenu = () => {
  console.log("1. Show registered users");
  console.log("2. Register a new user");
  console.log("3. Exit");
  readline.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        showEnrolled();
        break;
      case "2":
        showProgramsMenu();
        break;
      case "3":
        console.log("Thank you for using the system.");
        readline.close();
        break;
      default:
        console.log("Invalid option. Try again.");
        mainMenu();
    }
  });
};

const showEnrolled = () => {
  if (enrolled.length === 0) {
    console.log("No users enrolled yet.");
  } else {
    console.log("Registered users:");
    enrolled.forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.firstName} ${user.lastName} - ${user.program} - ${
          user.city
        }`
      );
    });
  }
  readline.question("Press enter to return to the main menu.", () => {
    mainMenu();
  });
};

const showProgramsMenu = () => {
  console.log("Available programs:");
  PROGRAMS.forEach((program, index) => {
    console.log(`${index + 1}. ${program}`);
  });
  selectProgram();
};

const selectProgram = () => {
  readline.question("Select a program: ", (programIndex) => {
    const selectedProgram = PROGRAMS[programIndex - 1];
    if (selectedProgram) {
      console.log(`You selected ${selectedProgram}.`);
      enterUserData(selectedProgram);
    } else {
      console.log("Invalid program selection. Try again.");
      selectProgram();
    }
  });
};

const enterUserData = (program) => {
  readline.question("Enter your first name: ", (firstName) => {
    readline.question("Enter your last name: ", (lastName) => {
      readline.question(
        "Select a city (London, Manchester, Liverpool): ",
        (city) => {
          if (!CITIES.includes(city)) {
            console.log("Invalid city selection. Try again.");
            enterUserData(program);
            return;
          }

          const user = {
            firstName,
            lastName,
            program,
            city,
          };

          if (isProgramAvailable(program, city)) {
            enrolled.push(user);
            console.log("User registered successfully!");
          } else {
            console.log("The program is full in this city.");
            enrollInAnotherCampus();
          }
          mainMenu();
        }
      );
    });
  });
};

const isProgramAvailable = (program, city) => {
  const programCount = enrolled.filter(
    (user) => user.program === program && user.city === city
  ).length;
  return programCount < MAX_SLOTS * SLOTS_PER_CITY[city];
};

const enrollInAnotherCampus = () => {
  readline.question(
    "Would you like to enroll in another campus? (y/n): ",
    (option) => {
      if (option === "y") {
        showProgramsMenu();
      } else {
        mainMenu();
      }
    }
  );
};

login();
