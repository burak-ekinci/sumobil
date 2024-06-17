# Su Mobil

## Sumobil is a web application that allows users to order water to their homes and enables business owners to manage these orders.

<b> Features </b>

1. User Registration and Login:
   - Users can register and log in to the application.
   - JWT-based authentication.
2. Water Ordering:
   - Users can order water to their homes.
   - Orders can be tracked in real-time.
3. Business Owner Panel:
   - Business owners can add new products and manage existing ones.
   - View and manage incoming orders in real-time.
4. Notification System:
   - Sound notifications for business owners when a new order arrives.

### Setting Up the Su Mobil

1. Clone the Repository:

```bash
   git clone https://github.com/burak-ekinci/sumobil
   cd sumobil
```

2. Install Dependencies for client and server side:

```bash
   cd client
   npm install
```

Open another terminal and run this:

```bash
   cd server
   npm install
```

3. Define the Environment Variables in .env file:
   <i> In client side</i>

```bash
   CONNECTION_STRING="mongodb://localhost:27017/sumobil"
```

<i> In client side</i>

```bash
   MONGODB_CONNECTION_STRING="mongodb://localhost:27017/sumobil"
   SESSION_SECRET="setyoursessionconnectionstring"
   PORT=3000
```

4. Run client side ( in client side terminal ):

```bash
   npm run dev
```

After running these commands, you can test the application by accessing it at http://localhost:5173 in your web browser.

5. Run client side ( in client side terminal ):

```bash
   npm run dev
```

After running these commands, application has db connection with mongo Server.

## Usage

## &#9745; Home Page

You can see our roadmap and understand where the project is heading.
<br> <img src="https://github.com/burak-ekinci/sumobil/blob/main/client/public/ss/home.png"> <br> </br>

## &#9745; User Registration and Login

You can see our roadmap and understand where the project is heading.
<br> <img src="https://github.com/burak-ekinci/sumobil/blob/main/client/public/ss/signup.png"> <br> </br>
<br> <img src="https://github.com/burak-ekinci/sumobil/blob/main/client/public/ss/login.png"> <br> </br>

## &#9745; Water Ordering

You can see our roadmap and understand where the project is heading.
<br> <video controls><source src="https://github.com/burak-ekinci/sumobil/blob/main/client/public/ss/makeorder.mp4" type="video/mp4"></video>


## &#9745; Business Owner Panel

You can see our roadmap and understand where the project is heading.
<br> <img src="https://github.com/burak-ekinci/sumobil/blob/main/client/public/ss/addproduct.mp4"> <br> </br>

For more detailed instructions and information, please refer to the project's documentation or contact the project maintainers.
