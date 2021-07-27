
# demo-react-card-mover

**This is a demo project containing a Kanban like web app.**

Link: https://card-mover.herokuapp.com/

*Note that the app may take a while to load for the first time since it is hosted for free.*

- - -

**Build with:**

* Front: React + Material UI
* Back: Node.js
* Socket.io to create a real-time communication between users

------------

### Development

1. Clone project
2. Run `npm run install` at root folder to install both React and Node.js dependencies
3. Run `npm run dev` to serve the backend
5. In another terminal, run `cd client` and then `npm run start` to serve the React app
6. Done!

* If you face any problems with websockets, run instead `npm run start`. Note that with this the backend won't be recompiled automatically if you change something.
* Default backend server address is `localhost:5000`
* Default React app address is `locahost:3000`
* There is a proxy that redirects the React app to the backend, so that the websockets work properly


------------



### Deploy
1. Run `npm run install` to install both React and Node.js dependencies
1. Run `npm run build` to compile the React app
2. Run `npm run start` to serve the whole app (React and Node.js)
3. Done!

* The default address to acess the app is `localhost:5000`
