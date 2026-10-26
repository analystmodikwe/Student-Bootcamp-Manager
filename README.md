# Student Bootcamp Manager

## Project Description
A console-based JavaScript application that manages bootcamp students. It registers
students, generates unique IDs, calculates averages, determines PASS/FAIL status,
simulates asynchronous processing, and prints a final class report.

## Features
- Register students with a name, course and any number of marks
- Default course when none is supplied
- Unique student IDs (STU-001, STU-002, ...) from a generator
- Average calculation and PASS/FAIL status with a configurable passing mark (default 50)
- Student-processing counter that remembers how many students were processed
- Simulated delayed processing with callbacks
- Final report: ID, name, course, marks, average, status, plus class totals
  (total, processed, passed, failed)
- Input handling for no marks, a single mark, invalid marks, wrong data types
  and non-existent students

## Technologies
- JavaScript (ES6+)
- Node.js / browser console

## How to Run
1. Install [Node.js](https://nodejs.org).
2. Clone or download this project.
3. In the project folder, run:

```bash
node index.js
```

Alternatively, paste the code into your browser's developer console.

## Module 4 Concepts
| Concept | Where it is used |
|---|---|
| Default parameters | `registerStudent` (course), `getStatus` (passMark), `idGenerator` |
| Rest parameters | `registerStudent(name, course, ...marks)`, `addMarks` |
| Spread syntax | `addMarks` builds a new marks array with `[...old, ...new]` |
| Closure | `createCounter` remembers the processed count privately |
| IIFE | `Config` protects the bootcamp name, version and passing mark |
| Functions as values | `formatters` object stores functions |
| Higher-order functions | `printStudents`, `filterStudents` accept functions |
| Callbacks | `processStudent` calls a callback when processing finishes |
| `this` | `reportPrinter.printHeader` uses `this.title` |
| `call()` / `apply()` / `bind()` | `studentSummary` called three ways; `bind` used for the report header |
| Generators, `yield`, `.next()` | `idGenerator` produces unique IDs |
| Asynchronous programming | `setTimeout()` in `processStudent` |

## Challenges
1. The report printed before any student was processed. I learned that setTimeout doesn’t pause the program, so I added a counter that only prints the report once every student is done.

## Solutions
1. I pass `undefined` explicitly (`registerStudent("Naledi", undefined, 65, 70)`)
   to trigger the default course while still supplying marks.
2. I added a `pending` counter. Each callback decrements it, and the report only
   prints when it reaches 0, meaning every student has finished.