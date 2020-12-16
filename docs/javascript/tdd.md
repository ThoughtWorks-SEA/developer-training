# Test-driven development

## Benefits of TDD

In TDD, as its name implies, we first start by writing tests and only when it fails, then we are allowed to switch to the component code to develop. Once the test passes, we must switch back to writing more tests before we can write more component code.

In this way, TDD ensures that only essential code is written, and it would also be impossible to have a feature that does not have a corresponding test.

## Red - Green - Refactor

We can achieve TDD with a process called "**Red - Green - Refactor**":

1. Run all tests in watch mode, and ensure that all are passing (Green) before we begin.
2. Create a test case for the component we wish to build.
3. Render the component in the test, and watch the test fail, since no such component exists yet. (Red)
4. Create the component file, and watch the test pass. (Green)
5. To the test, add an expect/assertion and watch the test fail, since you have not implemented the code. (**Red**)
6. Develop the simplest code you can do to make the test pass. (**Green**)
7. Refactor the code if it is not clean (make sure the tests still pass). (**Refactor**)
8. Repeat Steps 5-7 (Red - Green - Refactor) until the component is fully tested and developed.
