// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// start API mock before all tests.
beforeAll(() => server.listen());

// we are doing this to avoid effecting other tests.
afterEach(() => server.resetHandlers());

// clean up after the tests are completed.

afterAll(() => server.close());
