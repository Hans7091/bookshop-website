//waits for the DOM to fully load before the nav function is run
document.addEventListener("DOMContentLoaded", nav)
//toggles the responsive class on the navigation menu
function nav() {
    const navMenu = document.getElementById("navigation");
    if (navMenu.className === "nav-menu") {
        navMenu.className += " responsive"; //adds responsive class
    } else {
        navMenu.className = "nav-menu"; // resets to default nav class
    }
}

//runs after the DOM is loaded to update the success page content
document.addEventListener("DOMContentLoaded", function () {
    // updates the thank you message on the success page
    const thankYouText = document.querySelector(".thank-you-message");
    if (thankYouText) {
        thankYouText.textContent = "Thank you for your payment.";
    }

    //displays the last 4 digit of the card number from the localStorage
    const successText = document.querySelector(".card-success-message");
    if (successText && localStorage.getItem("last4")) {
        const last4 =
            localStorage.getItem("last4");
        successText.textContent = `Payment successful. Card ending in **** **** **** 
            ${last4}`;
    }

    // payment form validation and submission logic
    const form = document.getElementById("paymentForm");
    form.addEventListener("submit", async function (e) {
        //prevents page from refreshing on sumbit using 'preventDefault()'
        e.preventDefault();
        //get and clean input values from pay.html
        const cardNumber =
            document.getElementById("cardNumber").value.trim();
        const expMonth =
            parseInt(document.getElementById("expMonth").value.trim());
        const expYear =
            parseInt(document.getElementById("expYear").value.trim());
        const cvv =
            document.getElementById("securityCode").value.trim();

        //card number validation, must be 16 digits, checks if the card number is not 16 digits, 'test(cardnumber)' returns true if 16 digits.
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Card number must be 16 digits.");
            return;
        }
        //validates mastercard prefix, must begin with 51-55, checks if the card number doesn't begin with 51-55
        if (!/^5[1-5]/.test(cardNumber)) {
            alert("Card must be a MasterCard beginning with 51-55.");
            return;
        }

        //validation of expiry date
        //collects the current year & month
        //checks selected expire date if in the future, shows alert if card is expired
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            alert("Card is expired.");
            return;
        }

        //validation of the security code, checks if CVV is 3 0r 4 digits.
        if (!/^\d{3,4}$/.test(cvv)) {
            alert("CVV must be 3 or 4 digits.");
            return;
        }

        //gets the data ready to send to the server
        const data = {
            master_card: Number(cardNumber),
            exp_year: expYear,
            exp_month: expMonth,
            cvv_code: cvv
        };

        //this sends payment data to the server using POST request
        try {
            const response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json" //tells the server to expect JSON
                },
                body: JSON.stringify(data)
            });

            //processes the response of the server and converts it from JSON format
            const result = await response.json();

            if (response.ok) {
                //this saves the last 4 digit of the card number to the localStorage
                localStorage.setItem("last4", cardNumber.slice(-4));
                //this redirects the user tot he success page
                window.location.href = "success.html";
            } else {
                //displays error message from the server if request failed
                alert("Server error: " + result.message);
            }
        } catch (error) {
            //deals with network error
            alert("Network error: " + error.message);
        }
    });
});