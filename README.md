# Global Purchasing Power Calculator

This is a [Next.js](https://nextjs.org) project designed to calculate global purchasing power based on the input amount and currency.

## Getting Started

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/) installed on your machine.

### Running the Platform

Before proceeding, ensure that Docker is running on your machine.

1. Clone the repository to your machine:

   ```bash
   git clone repository_url_here
   ```

2. Navigate to the project directory and create a `.env` file in the root with the following content:

   ```env
   EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

   You can obtain the API key from [ExchangeRate API](https://www.exchangerate-api.com/).

Before proceeding, ensure that Docker is running on your machine.

Follow these steps to run the platform:

1. Open a terminal and navigate to the project directory.

2. Stop and remove any existing containers and volumes (if applicable) by running:

   ```bash
   docker-compose down -v
   ```

3. Build and start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Once the application is running, open your browser and go to:

   [http://localhost:3000](http://localhost:3000)

### Using the Platform

1. On the homepage, enter the amount of money and the currency you want to use for the calculation.

2. Click on **Calculate Purchasing Power** to process your input.

3. Once the calculation is complete, scroll down to view your purchasing power in different countries.
