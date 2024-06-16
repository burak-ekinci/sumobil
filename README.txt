SuMobil

Sumobil is a web application that allows users to order water to their homes and enables business owners to manage these orders.

Features

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

Setup

1. Clone the Repository:
   git clone https://github.com/burak-ekinci/sumobil
   cd sumobil

2. Install Dependencies:
   npm install

3. Database Connection:
   - Open the config.js file in the config folder and enter your MongoDB connection details.
   module.exports = {
     mongoURI: 'mongodb://localhost:27017/sumobil'
   };

4. Start the Server:
   npm start

Usage

User Registration and Login

[User Registration](./screenshots/registration.png)
[User Login](./screenshots/login.png)

Water Ordering

[Water Ordering](./screenshots/order.png)

Business Owner Panel

[Business Owner Panel](./screenshots/owner_panel.png)

Notification System

[Notification](./screenshots/notification.png)

---

For more detailed instructions and information, please refer to the project's documentation or contact the project maintainers.