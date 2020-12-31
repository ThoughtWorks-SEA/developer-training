# Frontend vs Backend

In the past, web applications used to have both frontend and backend in a single project. However, in recent years, clients often need apps that use a web application (and often a few of them, as there are also admin pages etc.) as a "front-end" and mobile applications on several platforms (Apple, Android etc). These applications might all depend on the same backend so that information across them will be consistent.

Therefore in the course, we will learn how to develop a seperate backend that is not bundled together with our front-end, React.js in this case.

## What does the backend do?

Example of how the backend interacts with frontend:

![frontend vs backend](_media/frontend-vs-backend.png)

Picture from: https://www.cloudflare.com/learning/serverless/what-is-serverless/

## Node.js is not frontend or backend

Node.js is a runtime environment based on the V8 Javascript engine for Chrome, which means it can run Javascript out of the execution context of a browser.

Node.js in practice is used for both our frontend and backend, but was developed so that JavaScript can be used in the server-side, thus letting us have a single language for both front end and backend development.

## Node.js frameworks

There are many frameworks built on top of Node.js which can be used for creating a backend. The most popular is Express.js which is minimalist and unopinionated. This means it does not follow any design patterns such as MVC, MVP etc and brings simplicity. However, this also means that in larger projects, you would have to put in extra effort to manage code in a standardised way and come up with your own design pattern. This effort is required to maintain the larger projects.

There are even frameworks built on top of Express.js such as Sails.js
See http://nodeframework.com/

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VN3ULIacb_4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
