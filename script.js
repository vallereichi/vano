import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"


const markdownText = `
# Latex test

trying out inline math $e^{i\pi} + 1 = 0$ and display math:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
`;



const contentDiv = document.getElementById('content');
contentDiv.innerHTML = marked.parse(markdownText);
MathJax.typesetPromise([contentDiv]);




