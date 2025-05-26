# bookshop-website
# E-Commerce Payment Gateway Simluation 

A responsive web application simulating a payment gateway for an online bookstore. Built as part of the Web Development coursework at Manchester Metropolitan University, this project demonstrates front-end development skills using HTML, CSS, and JavaScript.

## Project Overview

This application mimics a simplified e-commerce checkout process, including:
- A homepage listing books with responsive layout
- A payment form with client-side validation
- Integration with a mock payment API
- A success page displaying a masked card number

## Technologies Used

- **HTML5** – Semantic structure and content  
- **CSS3** – Responsive design and styling  
- **JavaScript (ES6)** – Form validation, API interaction, and DOM manipulation

## Project Structure

```
root/
index.html #Homepage with book listings
pay.html #Payment form with validation
success.html #Confirmation page

css/
styles.css #ALL styling rules

js/
scripts.js #JavaScript logic and validation
image/ #Book covers and UI images 
```

## Features

- **Responsive Design**: Optimized for both desktop and mobile views
- **Client-Side Validation**:
  - 16-digit MasterCard starting with 51–55
  - Valid expiration date
  - 3–4 digit CVV
- **API Integration**:
  - Sends payment data to a mock server
  - Handles success and error responses
- **Local Storage**:
  - Stores and displays the last 4 digits of the card on the success page

  
## How to Use

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Click **Pay** on any book to go to the payment form.
4. Fill in valid card details and submit.
5. On success, you’ll be redirected to a confirmation page.

## Usability and Accessibility Highlights

- Clear navigation with responsive hamburger menu
- Semantic HTML for screen readers
- Form feedback for invalid inputs
- Mobile-friendly layout

## Example API Request

 json
POST https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard
Content-Type: application/json

{
  "master_card": 5224123456787234,
  "exp_year": 2025,
  "exp_month": 8,
  "cvv_code": "088"
}

## Author

** Prince Hans Owobu**  
GitHub: [github.comHans7091]
Course: Web Development (6G4Z0024)
University: Manchester Metropolitan University












