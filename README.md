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
1. I already deployed the frontend part on vercel, as I was to do. you can visit the app on "https://full-auth-system-mern-assignment.vercel.app/"
2. I deployed the backend part to Render.com.
3. And I used MongoDB Atlas as our database to store all our user data. And used bcrypt to hash the password of the users for security.
4. And I also used jwt tokens which are stored in the browser as cookies to manage user authentication and maintain user sessions, even after closing the browser tab.
5. I wrote the backend part such a way that it is able to handle various input scenarios (correct, incorrect, and missing inputs) and will return appropriate responses for each case. Feel free to test the application to see the results.
