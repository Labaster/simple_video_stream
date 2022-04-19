const compose = (...fns) => (x0) => fns.reduce(
  (x, f) => f(x),
  x0
);

const headalize = (str) => str.replace(
  /^###\s+([^\n<"]*)/mg,
  '<h3>$1</h3>'
);

const emphasize = (str) => str.replace(
  /_([^_]*)_/g,
  '<em>$1</em>'
);

const imagify = (str) => str.replace(
  /!\[([^\]"<]*)\]\(([^)<"]*)\)/g,
  '<img src="$2" alt="$1" />'
);

const linkify = (str) => str.replace(
  /\[([^\]"<]*)\]\(([^)<"]*)\)/g,
  '<a href="$2" rel="noopener nowfollow">$1</a>'
);

/** const processComment = str => linkify(imagify(emphasize(headalize(str)))) */
const processComment = compose(
  linkify,
  imagify,
  emphasize,
  headalize,
);

const str = '![alt text goes here](/link/to/image/location.png)';

const multiply = (x) => x ** 2;
const add = (...args) => args.flat(10).reduce((acc, cur) => acc + (+cur || 0), 0);
const divide = (x) => x / 2;

const operationsCompose = compose(add);

console.log(operationsCompose(1, 2, 3));
