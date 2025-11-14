window.MathJax = {
  tex: {
    inlineMath: {'[+]': [['$', '$']]}
  },
  svg: {
    fontCache: 'global'
  }
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
  script.defer = true;
  document.head.appendChild(script);
})();

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"


const markdownText = `
# Latex test

trying out inline math $e^{i\\pi} + 1 = 0$ and display math:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

## Typesetting with MathJax

$$ f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x-a)^n \\cdot \\mathrm{tan}(\\beta)$$
`;



const contentDiv = document.getElementById('content');
contentDiv.innerHTML = marked.parse(markdownText);




