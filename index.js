// STUDENT BOOTCAMP MANAGER
// ---------- DAY 2 / Task 2: IIFE (configuration) ----------
// The function runs immediately, and its variables stay private.
// Only the methods in the returned object can touch them.
const Config = (function () {
  const bootcampName = "Lesedi's Academy"; // private
  const version = "1.0.0";                            // private
  let passingMark = 50;      

   return {
    getName: () => bootcampName,
    getVersion: () => version,
    getPassingMark: () => passingMark,
    setPassingMark(mark) {
      // Basic validation so the passing mark can't be set to nonsense
      if (typeof mark === "number" && mark >= 0 && mark <= 100) {
        passingMark = mark;
      } else {
        console.warn(`Invalid passing mark: ${mark}`);
      }
    },
  };
})();

// ---------- DAY 2 / Task 10: Generator (unique IDs) ----------
// function* makes a generator; it pauses at every yield and
// resumes when .next() is called, remembering its place (n).
function* idGenerator(prefix = "STU", start = 1) {
  let n = start;
  while (true) {
    yield `${prefix}-${String(n).padStart(3, "0")}`; // STU-001, STU-002...
    n++;
  }
}
const ids = idGenerator();

