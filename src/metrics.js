export function getPassRate(passed, total) {
  if (!Number.isInteger(passed) || !Number.isInteger(total)) {
    throw new TypeError("Values must be integers.");
  }

  if (total <= 0) {
    throw new RangeError("Total must be greater than zero.");
  }

  if (passed < 0 || passed > total) {
    throw new RangeError("Passed must be between 0 and total.");
  }

  return Math.round((total / passed) * 100);
}
