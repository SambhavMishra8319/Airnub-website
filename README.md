<!-- # Airnub-website# Wanderlust 🌍

Wanderlust is a travel listing and review platform built with **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to explore travel destinations, create listings, post reviews, and connect with other travelers. The platform includes user authentication, image uploads, and a fully responsive design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with **Passport.js**
- Create, update, and delete travel listings
- Upload images for listings using **Cloudinary**
- Add and manage reviews for listings
- Flash messages for success/error notifications
- Responsive UI built with **Bootstrap**
- Session management using **express-session**
- Form validation with **Joi**

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, HTML5, CSS3, Bootstrap 5
- **Authentication:** Passport.js (Local Strategy)
- **File Upload:** Cloudinary, Multer
- **Validation:** Joi
- **Other:** Method Override, connect-flash, express-session

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**  

Create a `.env` file in the root directory:

```env
PORT=3000
DB_URL=mongodb://127.0.0.1/wanderlust
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
SESSION_SECRET=your_secret_key
```

4. **Run the app locally:**

```bash
npm start
```

Visit `http://localhost:3000` to see the app running.

## Usage

- Users can register and log in.
- Logged-in users can create listings with images.
- Users can post reviews on listings.
- Admin or listing owners can edit or delete their listings.
- Flash messages show status updates for actions.

## Folder Structure

```
wanderlust/
│
├─ models/            # Mongoose models (User, Listing, Review)
├─ routes/            # Express routes
├─ views/             # EJS templates
│   ├─ listings/
│   ├─ reviews/
│   ├─ users/
│   └─ partials/
├─ public/            # Static assets (CSS, JS, images)
├─ utils/             # Utility functions (ExpressError, wrapAsync)
├─ schema.js          # Joi validation schemas
├─ app.js             # Main Express app
└─ server.js          # Server setup
```

## Environment Variables

| Variable                   | Description                          |
|----------------------------|--------------------------------------|
| `PORT`                     | Port for the server (default 3000)   |
| `DB_URL`                   | MongoDB connection URL                |
| `CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name                 |
| `CLOUDINARY_KEY`           | Cloudinary API key                    |
| `CLOUDINARY_SECRET`        | Cloudinary API secret                 |
| `SESSION_SECRET`           | Secret key for session management     |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a pull request.

## License

This project is licensed under the **MIT License**.

## Screenshots

*(Optional: Add screenshots of your app here)*

✨ **Wanderlust** helps you explore the world from your screen!   -->
