const info = (...params) => {
  if (process.env.NODE_ENV !== "test" || !process.env.quiet) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (!process.env.quiet) {
    console.error(...params);
  }
};

module.exports = { info, error };
