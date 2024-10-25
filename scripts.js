
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// Scenario: Starting program state
window.addEventListener("load", () => {
  result.innerText = "No calculation performed";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    // Scenario: Validation when values are missing
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    if (!dividend || !divider) {
      result.innerText = "Division not performed. Both values are required in inputs. Try again.";
      return;
    }

    // Scenario: Providing anything that is not a number should crash the program
    const numDividend = parseFloat(dividend);
    const numDivider = parseFloat(divider);

    if (isNaN(numDividend) || isNaN(numDivider)) {
      throw new Error("Non-numeric values detected.");
    }

    // Scenario: An invalid division should log an error in the console
    if (numDivider === 0) {
      result.innerText = "Division not performed. Invalid number provided. Try again.";
      console.error("Error: Division by zero", new Error().stack);
      return;
    }

    // Scenario: Dividing numbers result in a decimal number
    const quotient = Math.floor(numDividend / numDivider);
    result.innerText = `Result: ${quotient}`;

  } catch (error) {
    // Scenario: Providing anything that is not a number should crash the program
    document.body.innerHTML = "Something critical went wrong. Please reload the page.";
    console.error("Critical error:", error.stack);
  }
});

