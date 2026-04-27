// ❌ Dangerous: eval with user input
const userInput = "console.log('Hello')";
eval(userInput);

// ❌ Command injection risk
const { exec } = require("child_process");
exec("ls " + userInput);

// ❌ Hardcoded secret
const password = "mysecret123";
