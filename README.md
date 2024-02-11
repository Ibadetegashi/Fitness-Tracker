# Fitness-Tracker

Welcome to the Fitness Tracker API, a comprehensive set of endpoints designed to empower users in their fitness journey. This collection provides functionalities for user authentication, user profile management, and workout planning.

# Postman Collection

Explore and test the API using the [Fitness Tracker Postman Collection](https://documenter.getpostman.com/view/31765247/2s9YyvCLbF).


# Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/Ibadetegashi/Fitness-Tracker.git

# SETUP
1. Install dependencies:
    
    Node.js: Ensure you have Node.js installed on your machine. 
    Open the terminal and navigate to the root folder (fitness-tracker). Run:
    - <code>npm install</code> 

3. Create a .env file in the root folder (fitness-tracker) and configure necessary environment variables:

- DATABASE_URL="mysql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>?schema=public" -  Connection URL for the MySQL database.
- SECRET_KEY="YOUR_SECRET_KEY" - Replace "YOUR_SECRET_KEY" with a strong and unique secret key. It's used for token.
- EMAIL="your.email@example.com" - Email address used for sending emails.
- PASSWORD="your_secure_password" - Password associated with the email address (please handle securely). Use a Unique App-Specific Password. Instead of using your primary email account password, generate a unique app-specific password specifically for sending emails through this application.
- URL="http://localhost:3000"
- PORT="3000" - Port number on which the application will run.

3. Prisma
- DATABASE_URL="mysql://username:password@localhost:3306/database_name" - Replace username, password, localhost, 3306, and database_name with your actual database credentials and configuration.

4. Apply Migrations:
- <code>npx prisma migrate dev</code>  - This command will execute the migrations defined in the prisma/migrations folder. It sets up the database schema based on the changes specified in each migration file.
Generate Prisma Client:
- <code>npx prisma generate</code> - This command generates the Prisma Client based on the schema.prisma file.

# Usage
To start the application, in the root folder run:
 - <code>npm start</code>
