# Wompi Payment Gateway - Frontend 🚀

Client application for the Payment gateway challenge. Built with **React 19**, **Redux Toolkit**, and **Material UI**.

## 🌐 Live Demo
- **URL:** [[PAYMENT GATEWAY CHALLENGE](https://payment-gateway-front-carlos.s3.us-east-2.amazonaws.com/index.html)]
- **Backend API (Swagger):** https://wcq9jnemqv.us-east-2.awsapprunner.com/api

## 🛠️ Tech Stack
- **React 19** (Vite)
- **Redux Toolkit**: State management for products and transaction status.
- **Material UI (MUI) & Emotion**: Professional UI components and styling.
- **React Router Dom v7**: Modern routing for the checkout flow.
- **Payment Widget**: Integrated for secure credit card tokenization.

## 🏗️ Architecture
The project follows a clean and scalable structure:
- `src/assets/`: Static resources like images and icons.
- `src/components/`: UI components built with MUI.
- `src/config/`: Application constants and environment variables setup.
- `src/pages/`: Main view of the application.
- `src/store/`: Centralized state management using Redux Toolkit (Slices and Store).
- `src/theme/`: Material UI custom theme configuration (colors, typography).

## 🚀 Deployment (AWS)
This frontend is hosted using a performant cloud architecture:
1. **AWS S3**: Static website hosting.
2. **AWS CloudFront**: CDN for global distribution, caching, and HTTPS.
3. **GitHub Actions**: Automated CI/CD pipeline for building and syncing to S3.

## ⚙️ Development
1. Clone the repo.
2. Create a `.env` file with `VITE_API_BASE_URL` and `VITE_PAYMENT_PUBLIC_KEY`.
3. Run `npm install` and `npm run dev`.