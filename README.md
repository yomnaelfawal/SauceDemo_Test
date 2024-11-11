# SauceDemo Automation Testing

## Project Overview

This project automates a user journey on the e-commerce website [SauceDemo](https://www.saucedemo.com/).

## Table of Contents

- [Coverage](#coverage)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Tests](#running-the-tests)

## Coverage

The automation script covers the following core functionalities:

1. Login with a valid user
2. Adding products to cart from the inventory page
3. Adding products to cart from product pages
4. Verifying added to cart items' names, prices, and quantity
5. Using mock data from [JSONPlaceholder API](https://jsonplaceholder.typicode.com) to fill out customer information
6. Completing the purchase

## Prerequisites

- Node.js (version 23)
- npm (Node package manager)
- Google Chrome (version 130 or above)

## Setup

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yomnaelfawal/SauceDemo_Test.git
    ```
2. Navigate to the newly created local repo:
   ```bash
   cd SauceDemo_Test
   ```
3. Install the required dependencies:

    ```bash
    npm install
    ```

## Running the Tests

To run the tests, execute the following command:

```bash
npx nightwatch
```



 
