import { getPassRate } from "./metrics.js";

const passedInput = document.querySelector("#passed");
const totalInput = document.querySelector("#total");
const result = document.querySelector("#result");
const calculateButton = document.querySelector("#calculate");

function renderPassRate() {
  try {
    const passed = Number.parseInt(passedInput.value, 10);
    const total = Number.parseInt(totalInput.value, 10);
    const rate = getPassRate(passed, total);

    result.textContent = `Pass rate: ${rate}%`;
    result.style.color = "#0f4c81";
  } catch (error) {
    result.textContent = error.message;
    result.style.color = "#b42318";
  }
}

calculateButton.addEventListener("click", renderPassRate);
renderPassRate();
