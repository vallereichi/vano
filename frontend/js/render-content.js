window.MathJax = {
  tex: {
    inlineMath: {'[+]': [['$', '$']]},
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



marked.use({
  extensions: [
    {
      name: 'mathjax-block',
      level: 'block',
      start(src) { return src.match(/\$\$/)?.index; },
      tokenizer(src) {
        const match = src.match(/^\$\$([\s\S]+?)\$\$/);
        if (match) {
          return {
            type: 'mathjax-block',
            raw: match[0],
            text: match[1]
          };
        }
      },
      renderer(token) {
        return `$$${token.text}$$`;
      }
    }
  ]
});




const contentDiv = document.getElementById("content");
const textarea = document.getElementById("editor");


function renderText(str) {
  contentDiv.innerHTML = marked.parse(str);
  MathJax.typesetPromise().then (() => {
    // MathJax finished typesetting
  }).catch((err) => console.error("MathJax typeset failed: " + err.message));
}

function toggleEditor() {
  contentDiv.classList.toggle("hide");
  textarea.classList.toggle("hide");
}



textarea.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const text = textarea.value;
    renderText(text);
    toggleEditor();
  }
})

document.addEventListener("keyup", function (event) {
  if (event.key === "i" && textarea.classList.contains("hide")) {
    toggleEditor();
    textarea.focus();
  }
})






