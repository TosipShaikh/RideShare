# 🏍️ RideShare - Your Ride, Your Way

## _Connecting Communities, One Smart Journey at a Time_

## ✨ Project Overview

In today's urban landscape, many motorbike commuters travel individually, while public transport often faces overcrowding and inefficiencies. **RideShare** emerges as a revolutionary solution, a ride-sharing platform designed exclusively for individuals with motorbikes. Our core mission is to seamlessly connect riders who are already on a journey with passengers seeking a ride along their path, fostering a community of shared travel, reduced costs, and a greener environment.

We're not just another ride-sharing app; we're building a smarter way to commute by leveraging intelligent matching and a secure ecosystem.

## 💡 How RideShare Works & Its Unique Value

1.  **Publish Your Ride (Drivers):** Individuals with a motorbike can easily publish their upcoming ride by entering their start location, end destination, date, and time.
2.  **Smart Ride Search (Passengers):** Users looking for a ride can search for available motorbikes along their desired path.
3.  **Map-Based Route Planning:** Riders and passengers can now search locations with autocomplete, pick pickup and drop-off points, and preview the route on an interactive map before booking or offering a ride.
4.  **Real-time Connection:** Our platform focuses on connecting these two users – the offering rider and the sharing passenger – in real-time, facilitating immediate communication and coordination.
5.  **Fixed Payment System:** To ensure transparency and avoid disputes or fraud, the payment for each ride is pre-determined and fixed by RideShare. This ensures fair compensation for riders and clear costs for passengers.
6.  **Verified & Trusted Community:** Driver identity is verified through a robust Driving License API integration, building a foundation of trust and safety for all users on our platform.
7.  **Manage Your Journey:** Both riders and passengers get intuitive dashboards to manage their rides, view history, and track their impact.

## 🌟 Benefits

* **Cost-Effective Commute:** Riders can significantly reduce or even fulfill their fuel costs by sharing rides, while passengers enjoy affordable travel.
* **Reduced Environmental Impact:** By promoting shared rides, RideShare directly contributes to less traffic congestion and a substantial reduction in carbon emissions. Every shared journey means fewer individual vehicles on the road.
* **Superior to Public Transport:** Offer a more comfortable, often faster, and personalized alternative to crowded public transportation.
* **Enhanced Safety & Trust:** Driver verification and a fixed payment system minimize fraud and enhance user safety and peace of mind.
* **Community Building:** Connect with fellow commuters, fostering a sense of community and shared purpose.
* **Optimal Route Matching:** Our unique algorithm ensures the best possible matches, even for partial routes, maximizing efficiency for everyone.

## 💻 Tech Stack

**Frontend:**
* **React.js:** A JavaScript library for building dynamic and responsive user interfaces.
* **Vite:** A fast development server and build tool for modern React applications.
* **Tailwind CSS:** A highly customizable, utility-first CSS framework for rapid UI development.
* **MapLibre GL:** An interactive mapping library used to render route previews and location-based visuals.
* **Lucide React:** A modern, open-source icon set for clear visual communication.
* **React Router DOM:** For declarative navigation and routing within the application.
* **Axios:** A powerful HTTP client for making API requests.
* **React Toastify:** For elegant, non-blocking notifications to the user.

**Backend:**
* **Node.js:** The JavaScript runtime environment enabling server-side logic.
* **Express.js:** A fast, minimalist web framework for building robust APIs.
* **MongoDB:** A flexible, document-oriented NoSQL database for scalable data storage.
* **Mongoose:** An elegant MongoDB object data modeling (ODM) library for Node.js.
* **JWT (JSON Web Tokens):** For secure, stateless authentication and authorization.
* **bcrypt.js:** A library for hashing passwords securely.
* **nodemailer:** Used for ride-related email notifications.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing, allowing secure communication between frontend and backend.

**Key APIs & Services:**
* **OpenStreetMap Nominatim:** For location autocomplete, forward geocoding, and reverse geocoding.
* **OSRM:** For driving route geometry, distance, duration, and ETA calculations.
* **MapLibre GL:** For rendering the interactive route preview map on the frontend.
* **Driving License APIs:** For real-time verification of driver credentials to enhance platform safety and trust.

**Key Algorithms:**
* **Intersection Algorithm:** The core logic for identifying optimal ride matches between a driver's published route and a passenger's desired partial route. This algorithm ensures efficient pooling and maximizes shared journeys.

## 🚀 Getting Started

To get a local copy of RideShare up and running for development or testing, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js) or **Yarn**
* **MongoDB** (local installation or access to a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/omgholap11/RideShare.git](https://github.com/omgholap11/RideShare.git)
    cd RideShare
    ```

2.  **Backend Setup:**
    Navigate into the `Backend` directory, install dependencies, and configure environment variables.
    ```bash
    cd Backend
    npm install
    ```
    Create a `.env` file in the `Backend` directory (at the same level as `package.json`) and populate it with your environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string_from_atlas_or_local
    JWT_SECRET=a_strong_random_secret_key_for_jwt
    PORT=5001 # Or any other desired port for your backend API
    # No Ola Maps or routing API keys are required
    ```
    *(Hint: For `MONGO_URI`, you can set up a free tier cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get a connection string.)*

3.  **Frontend Setup:**
    Navigate back to the project root, then into the `Frontend` directory, install dependencies, and configure environment variables.
    ```bash
    cd ../Frontend
    npm install # or yarn install
    ```
    Create a `.env` file in the `Frontend` directory (at the same level as `package.json`) and add your environment variables:
    ```env
    # No mapping API keys are required
    ```

4.  **Run the Applications:**

    **Start Backend:**
    Open a terminal, navigate to the `Backend` directory, and run:
    ```bash
    npm start # or yarn start
    ```
    The backend server will typically start on `http://localhost:5001` (or the `PORT` specified in your `.env`).

    **Start Frontend:**
    Open another terminal, navigate to the `Frontend` directory, and run:
    ```bash
    npm start # or yarn start
    ```
    The frontend development server will usually open at `http://localhost:5173` in your default browser.

## 🖥️ Usage

* Open your web browser and navigate to `http://localhost:5173`.
* **New Users/Drivers:** Begin by registering your account through the intuitive onboarding process.
* **Existing Users/Drivers:** Simply log in to access your personalized dashboard.
* **Finding a Ride:** Use the search page to enter pickup and drop-off locations, choose from location suggestions, and preview the route on the map before booking.
* **Offering a Ride:** Navigate to the "Offer a Ride" section, add your route details, and preview the journey path on the interactive map before publishing it.
* Explore your ride history, monitor your environmental and financial impact, and efficiently manage all your journeys!

## ☁️ Deployment Considerations

RideShare is designed for a modern MERN stack deployment strategy:

* **Frontend (React):** The built React application (`npm run build`) can be deployed as static files on services like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [Firebase Hosting](https://firebase.google.com/docs/hosting), or [AWS S3 with CloudFront](https://aws.amazon.com/s3/static-website-hosting/).
* **Backend (Node.js/Express):** The API server can be hosted on a Platform as a Service (PaaS) like [Render](https://render.com/), [Heroku](https://www.heroku.com/), or a Virtual Private Server (VPS) like [DigitalOcean](https://www.digitalocean.com/) / [AWS EC2](https://aws.amazon.com/ec2/).
* **Database (MongoDB):** It is highly recommended to use a managed database service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for reliability, scalability, and ease of management.

**Important Deployment Steps:**

1.  **Environment Variables:** Ensure all sensitive environment variables are securely configured on your chosen hosting platforms.
2.  **CORS:** Your Node.js backend must be configured to allow requests from your deployed frontend domain.
3.  **SSL (HTTPS):** Enable HTTPS for secure communication. Most modern hosting providers offer free SSL certificates.

## 🤝 Contributing

We welcome contributions to RideShare! Whether it's adding new features, fixing bugs, improving documentation, or suggesting enhancements, your input is greatly appreciated.

1.  **Fork the Project:** Start by forking the RideShare repository to your GitHub account.
2.  **Create your Feature Branch:** Create a new branch for your work:
    `git checkout -b feature/AmazingFeature`
3.  **Commit your Changes:** Make your changes, ensuring your commit messages are clear and concise:
    `git commit -m 'feat: Add some AmazingFeature'` (using conventional commits is recommended)
4.  **Push to the Branch:** Push your changes to your forked repository:
    `git push origin feature/AmazingFeature`
5.  **Open a Pull Request:** Submit a pull request from your branch to the `main` branch of the original RideShare repository. Please describe your changes thoroughly.

Feel free to open an issue first if you'd like to discuss a significant change or new feature. Don't forget to give the project a star!

## 📧 Contact

Om Gholap - [iomgholap123@gmail.com](mailto:iomgholap123@gmail.com)

Project Link: [https://github.com/omgholap11/RideShare](https://github.com/omgholap11/RideShare)

---
