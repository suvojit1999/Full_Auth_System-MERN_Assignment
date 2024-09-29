Documentation on how to setup and run the application:

On localhost:
1. If you want to run this on your computer i.e. your localhost, then first open terminal, use 'cd ./backend' and then use 'npm install' to install all dependencies for backend.
2. Go to ./backend/main.js and change the cors origin url to "http://localhost:5173".
3. Again open terminal, use 'cd ./frontend' and then use 'npm install' to install all dependencies for frontend.
4. Go the ./frontend/src/App.jsx, and change the fetch urls from 'https://full-auth-system-mern-assignment-backend.onrender.com/api/auth' (for jwt authentication) and 'https://full-auth-system-mern-assignment-backend.onrender.com/logout' (for logout) to 'http://localhost:3000/api/auth' and 'http://localhost:3000/logout' respectively.
5. Go to ./frontend/src/pages/Signup.jsx, and change the fetch url from 'https://full-auth-system-mern-assignment-backend.onrender.com/api/signup' (for signup) to 'http://localhost:3000/api/signup'.
6. Go to ./frontend/src/pages/Signin.jsx and change fetch url from 'https://full-auth-system-mern-assignment-backend.onrender.com/api/signin' (for log in) to 'http://localhost:3000/api/signin'.
7. Then open terminal, use 'cd ./backend' and then use 'node ./main.js' to start the backend server.
8. And lastly open another terminal, use 'cd ./frontend' and use 'npm run dev', to start the frontend server.
9. Open the url 'http://localhost:5173' on your browser, and use the application.

For the deployed link:
1. I already deployed the frontend part on vercel, as I was to do. you can visit the app on "https://full-auth-system-mern-assignment-cf5rwiz19.vercel.app/"
2. I deployed the backend part to Render.com.
