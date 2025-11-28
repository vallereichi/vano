# create projects for note taking

This editor is capable of rendering markdown with inline math. To edit a page, press "i". After you edited the document you can switch back to the document view by pressing "Escape". Here the content will get rendered and all math expressions get displayed in a beatiful way

### Features

- [x] Full mardown support
- [x] inline math rendering with Latex expressions
- [ ] vim motions
- [ ] image support
- [ ] multiline editing
- [ ] smart braces
- [ ] syntax highlighting
- [ ] line numbers

> *Note:* feature set will get extended in the future

### Acknowledgements

This webapplication is heavily inspired by [Notion]("https://www.notion.com/de"). Here I Just implement everything I want for my note taking. This combines various different tools and will get extended in the future


### Math mode

There are almost no limits to the math that can be rendered with this app. With the use of MathJax and marked.js the rendering is performed on the client side. Here are some examples:

$$
  \begin{align}
    \nabla \times \vec{\mathbf{B}}\, - \frac{1}{c}\, \frac{\partial\vec{\mathbf{E}}}{\partial t}
       & = \frac{4\pi}{c}\vec{\mathbf{j}} \\[3pt]
    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\[3pt]
    \nabla \times \vec{\mathbf{E}}\, + \frac{1}{c}\, \frac{\partial\vec{\mathbf{B}}}{\partial t}
        & = \vec{\mathbf{0}} \\[3pt]
    \nabla \cdot \vec{\mathbf{B}} & = 0
  \end{align}
$$

### Usage

This is still a production service. Therefore it can only be run on the localhost. You may setup your localhost service anyway you like. The simplest way to host it is to run an http server with python and then visit [http://localhost:8000](http://localhost:8000)

```
cd frontend
python3 -m http.server
```

And then start the backend which is served by flask

```
source .venv/bin/activate
cd backend
python vano-api.py

```
