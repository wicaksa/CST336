// A $( document ).ready() block.
$(document).ready(function() {
    // *** Debug ***
    // console.log("ready!");

    // Prices of Items
    let item1price = 40;
    let item2price = 40;
    let item3price = 35;

    // Discount total
    let totalDiscount = 0;

    // Shipping total
    let totalShipping = 0;

    // Total Tax
    let totalTax = 0.10;

    // Array to store total Price
    let arrTotal = [];

    // Event Listener
    $("button").on("click", calculate);

    function getItemCost(baseprice, quantity, number) {
        total = baseprice * quantity;
        $(`#item${number}test`).html("$ " + total);
        return total;
    }

    // Show image when wrong shipping method is entered
    function showImage(str) {
        var img = document.getElementById(str);
        img.style.visibility = 'visible';
    }

    function hideImage(str) {
        var img = document.getElementById(str);
        img.style.visibility = 'hidden';
    }


    function getPromoAmount() {
        // Calculate Promo, add it to array
        let promoEntry = $("#promo").val().toLowerCase();

        console.log(promoEntry);

        if (promoEntry == "jazzrules") {
            totalDiscount = -15.00;
            showImage('promoGood');
        } else {
            totalDiscount = 0;
            showImage('promoBad');
        };

        $(`#promotest`).html("$ " + totalDiscount);

        return totalDiscount
    }

    function getShippingCost() {
        // Calculate Shipping , add it to array
        let shippingChoice = $("#shipping").val();

        if (shippingChoice == "1") {
            totalShipping = 5;
            showImage('usps');
        } else if (shippingChoice == "2") {
            totalShipping = 10;
            showImage('ups');
        } else {
            totalShipping = 0;
        };

        $(`#shippingtest`).html("$ " + totalShipping);
        return totalShipping;
    }

    function getSalesTax(items, discount, totalTax) {
        let netTax = 0;
        netTax = totalTax * (items + discount);

        $(`#taxtest`).html("$ " + netTax);
        return netTax;
    }

    function getTotalCost(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = sum + arr[i];
        }
        $(`#totaltest`).html("$ " + sum);
    }

    // *** Debug ***
    function calculate() {
        // hide image reset
        hideImage('promoGood');
        hideImage('promoBad');
        hideImage('usps');
        hideImage('ups');


        // reset array
        arrTotal = [];

        // Get items costs and show on screen
        let item1total = getItemCost(item1price, Number($("#item1quantity").val()), 1);
        let item2total = getItemCost(item2price, Number($("#item2quantity").val()), 2);
        let item3total = getItemCost(item3price, Number($("#item3quantity").val()), 3);
        totalItemsCost = item1total + item2total + item3total;
        // append new value to the array
        arrTotal.push(totalItemsCost);

        // Get promo and show on screen
        totalDiscount = getPromoAmount(totalItemsCost);
        // append new value to the array
        arrTotal.push(totalDiscount);

        // Get shipping
        totalShipping = getShippingCost();
        // append new value to the array
        arrTotal.push(totalShipping);

        // get tax
        let taxAmount = getSalesTax(totalItemsCost, totalDiscount, totalTax);
        // append new value to the array
        arrTotal.push(taxAmount);

        // calculate total , sum array
        getTotalCost(arrTotal);
    }

});