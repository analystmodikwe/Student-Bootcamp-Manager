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

// ---------- DAY 2 / Task 1: Closure (processing counter) ----------
// "count" is not accessible from outside, but the returned
// functions still remember it after createCounter() has finished.
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
const processedCounter = createCounter();

// ---------- DAY 1: Student storage ----------
const students = []; // array of student objects

// Default parameter: course. Rest parameter: ...marks (any number of marks).
// NOTE: to trigger the default course while still passing marks,
// pass undefined: registerStudent("Thabo", undefined, 70, 80)
function registerStudent(name, course = "General Programming", ...marks) {
  // Edge case: wrong data type / empty name
  if (typeof name !== "string" || name.trim() === "") {
    console.error(`Registration failed: invalid name (${name})`);
    return null; // we return before using the generator, so no ID is wasted
  }

  // Edge case: keep only valid marks (numbers from 0 to 100)
  const validMarks = marks.filter(
    (m) => typeof m === "number" && !Number.isNaN(m) && m >= 0 && m <= 100
  );
  if (validMarks.length !== marks.length) {
    console.warn(`${name}: ${marks.length - validMarks.length} invalid mark(s) ignored`);
  }

  const student = {
    id: ids.next().value, // .next() asks the generator for the next ID
    name: name.trim(),
    course,
    marks: validMarks,
    average: null,
    status: "PENDING",
  };
  students.push(student);
  return student;
}

// Spread syntax: build a NEW marks array instead of mutating the old one
function addMarks(student, ...newMarks) {
  student.marks = [...student.marks, ...newMarks];
}

// Reusable average calculator. Returns null if there are no marks.
function calculateAverage(marks) {
  if (!Array.isArray(marks) || marks.length === 0) return null;
  return marks.reduce((sum, m) => sum + m, 0) / marks.length;
}

// Default parameter again: passMark falls back to the configured value
function getStatus(average, passMark = Config.getPassingMark()) {
  if (average === null) return "N/A"; // no marks, so we can't judge
  return average >= passMark ? "PASS" : "FAIL";
}

// ---------- DAY 2 / Tasks 3 & 4: Functions as values + higher-order ----------
// Functions stored as values inside an object
const formatters = {
  short: (s) => `${s.id} - ${s.name}`,
  long: (s) => `${s.id} | ${s.name} | ${s.course} | ${s.status}`,
};

// Higher-order function: it ACCEPTS a function (formatter) and uses it
function printStudents(list, formatter) {
  list.forEach((s) => console.log(formatter(s)));
}

// Another higher-order function: filter using any condition passed in
const filterStudents = (list, predicate) => list.filter(predicate);

// ---------- DAY 2 / Tasks 6-9: this, call, apply, bind ----------
// Task 6: "this" inside a method refers to the object the method is called on
const reportPrinter = {
  title: "STUDENT BOOTCAMP REPORT",
  printHeader() {
    console.log(`\n===== ${this.title} (${Config.getName()} v${Config.getVersion()}) =====`);
  },
};

// A standalone function that relies on "this"
function studentSummary(greeting, punctuation) {
  return `${greeting} ${this.name} - ${this.course}${punctuation}`;
}

// ---------- DAY 3: Asynchronous processing + callbacks ----------
// callback follows the (error, result) convention
function processStudent(studentId, callback) {
  if (typeof callback !== "function") {
    console.error("processStudent needs a callback function");
    return;
  }
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    callback(new Error(`Student ${studentId} does not exist`)); // edge case
    return;
  }

  console.log(`Processing ${student.name}...`); // 1. start

  setTimeout(() => {                              // 2. wait (simulated delay)
    student.average = calculateAverage(student.marks); // 3. complete
    student.status = getStatus(student.average);
    processedCounter.increment();
    callback(null, student);                      // 4. callback decides what's next
  }, 1000);
}