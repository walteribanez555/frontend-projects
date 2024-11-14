# Angular App with NGXS and Tailwind CSS

This project is an Angular application that leverages NGXS for state management, styled with Tailwind CSS, and follows clean architecture principles. It is deployed on AWS, utilizing S3 for storage and CloudFront for content delivery.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This Angular application is designed with scalability and maintainability in mind. Using NGXS for state management and Tailwind CSS for styling, the app follows a clean architecture approach to separate concerns, making it easy to extend and maintain.

The application is integrated with AWS infrastructure, utilizing S3 for storing assets and CloudFront for fast content delivery.

---

## Features

- **State Management with NGXS**: Simplifies handling of application state, ensuring a clean and predictable state flow.
- **Tailwind CSS**: A utility-first CSS framework for styling, allowing for rapid UI development with a highly customizable design.
- **Clean Architecture**: Separates concerns into distinct layers (presentation, domain, and infrastructure) for better maintainability.
- **AWS Integration**: Uses S3 for storage of static files and CloudFront for optimized content delivery.
- **Responsive Design**: Ensures the app works seamlessly across different devices.

---

## Tech Stack

- **Frontend**: Angular
- **State Management**: NGXS
- **CSS Framework**: Tailwind CSS
- **Cloud Infrastructure**: AWS S3, CloudFront
- **Deployment**: CI/CD pipeline using Github Actions

---

## Architecture

This project follows the **Clean Architecture** principles, with the following layers:

1. **Presentation Layer**: Contains the Angular components, views, and services that directly interact with the user interface.
2. **Domain Layer**: Handles business logic and rules, including NGXS state management.
3. **Infrastructure Layer**: Manages external systems like Ecs service products.

Each layer has well-defined boundaries, making it easier to test and scale each part of the application independently.

---

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following tools installed:

- Node.js (>= 14.x)
- npm or yarn
- Angular CLI
- AWS CLI (for S3 and CloudFront management)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repository/angular-app-with-ngxs-tailwind.git
    cd angular-app-with-ngxs-tailwind
    ```

2. Install dependencies:

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. Serve the app locally:

    ```bash
    ng serve
    ```

    The application should now be running at `http://localhost:4200`.

---

## Configuration

### AWS S3 and CloudFront Setup

1. **S3 Bucket**:
   - Create an S3 bucket for static asset storage.
   - Make sure to set the correct permissions for public access.

2. **CloudFront**:
   - Create a CloudFront distribution linked to your S3 bucket to serve assets globally.

3. **Environment Variables**:
   - Set up your AWS credentials in `.env` or directly in the AWS CLI configuration for S3 access.

---

## Deployment

This project uses AWS infrastructure for deployment. To deploy to S3 and CloudFront:

1. Build the application for production:

    ```bash
    ng build --prod
    ```

2. Upload the build files to your S3 bucket:

    ```bash
    aws s3 sync ./dist/your-app-name/ s3://your-s3-bucket-name --acl public-read
    ```

3. Invalidate the CloudFront cache (optional but recommended for faster updates):

    ```bash
    aws cloudfront create-invalidation --distribution-id your-distribution-id --paths "/*"
    ```

4. Your application should now be live and accessible via the CloudFront URL.

---

## Contributing

We welcome contributions to this project! To get started, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

