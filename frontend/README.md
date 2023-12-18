# Carbon Footprint Calculator Project Report

## Introduction

The Carbon Footprint Calculator is a web application developed using React.js and Chart.js. This project aims to help individuals and organizations estimate their carbon footprint by considering various scope-wise parameters, including Scope 1 (fossil fuel and fugitives), Scope 2 (electricity), and Scope 3 (water and waste). This calculator provides a user-friendly interface for data input and visualizes the carbon emissions data using interactive charts.
Deployed at : https://carboncalculators.netlify.app/

## Features

### 1. Scope-wise Parameters

The Carbon Footprint Calculator allows users to input data for different scopes of carbon emissions, including:

- **Scope 1: Fossil Fuel Emissions**
  - Users can enter data related to fossil fuel consumption, such as gasoline, diesel, and other direct emissions.

- **Scope 1: Fugitive Emissions**
  - This section allows users to input data related to fugitive emissions, including methane and other greenhouse gases released from various sources.

- **Scope 2: Electricity Consumption**
  - Users can input data regarding electricity consumption, helping them understand the indirect emissions associated with their energy usage.

- **Scope 3: Water and Waste**
  - This section allows users to enter data related to water consumption and waste generation, providing a comprehensive overview of their environmental impact.

### 2. Calculation and Visualization

- The application calculates the total carbon footprint by summing up emissions from all three scopes.

- Interactive charts generated using Chart.js provide users with a visual representation of their carbon emissions data. These charts help users gain insights into which areas contribute the most to their carbon footprint.

### 3. User-Friendly Interface

- The user interface is designed to be intuitive, allowing users to easily input data and view results.

- Clear instructions and tooltips are provided to guide users in entering accurate data.
- The user can either fill out a form, or upload a populated excel sheet and get the results.

## Technologies Used

- **React.js**: The frontend of the application is built using React.js, a popular JavaScript library for building user interfaces.

- **Chart.js**: Chart.js is used for creating interactive charts that display carbon emissions data.
- **ExcelJS** : For calculations of emission values from the excel sheet uploaded by the user.

- **HTML/CSS**: Standard web technologies are used for structuring the application and styling it for a visually appealing user experience.

## Installation

To run the Carbon Footprint Calculator on your local machine, follow these steps:

1. Clone the GitHub repository: `git clone `

2. Navigate to the project directory: `cd carbon-calculator`

3. Install dependencies: `npm install`

4. Start the development server: `npm start`

5. Access the calculator in your web browser at `http://localhost:3000`.

## Contribute

Please note that this project is open source, and contributions from the community are welcome. Feel free to fork the repository, make improvements, and submit pull requests to help me enhance the Carbon Footprint Calculator.
