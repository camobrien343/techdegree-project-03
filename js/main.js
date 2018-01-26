/* Treehouse Techdegree - Full Stack Javascript
Cameron O'Brien
Project 03
Interactive Form and Validation
*/

// Global variables
const $userName = $('#name');
const $otherTitle = $('#other-title');
const $theme = $('#design');
const $colorSelect = $('#colors-js-puns');
const $colors = $('#color');
const legend = document.querySelectorAll('legend');
const activitiesParent = document.querySelector('.activities');
const activities = activitiesParent.querySelectorAll('input[type="checkbox"]');
const jsFrameworks = document.getElementsByName("js-frameworks")[0];
const jsLibraries = document.getElementsByName("js-libs")[0];
const express = document.getElementsByName("express")[0];
const nodeJs = document.getElementsByName("node")[0];
const buildTools = document.getElementsByName("build-tools")[0];
const npm = document.getElementsByName("npm")[0];
const payment = document.querySelector('#payment');
const paymentOption = payment.children;
const creditCard = document.getElementById("credit-card");
const submitButton = document.querySelector('button[type=submit]');
// Paypal and Bitcoin Divs
const $paypal = $("#credit-card").next();
const $bitcoin = $("#credit-card").next().next();
// Paypal and Bitcoin select options
const ccOption = document.querySelector('#payment option[value="credit card"]');
const paypal = document.querySelector('#payment option[value="paypal"]');
const bitcoin = document.querySelector('#payment option[value="bitcoin"]');

// Placeholders for credit card inputs
$('#cc-num').attr('placeholder', 'Must be 13 to 16 digits, & no spaces');
$('#cc-num').attr('placeholder', 'Must be 13 to 16 digits, & no spaces');
$('#zip').attr('placeholder', '5 digits');
$('#cvv').attr('placeholder', '3 digits');

// Create error message for validation errors
let error ="";
$('form').prepend('<p id="errorDiv"></p>');
$('#errorDiv').css('text-align', 'center')
$('#errorDiv').css('color', 'red')
$('#errorDiv').hide();

// When document is ready do these items
$(document).ready(() => {
	$($userName).focus(); // On page load focus on name input
	$($otherTitle).hide();
	$($colors).hide();
	$($paypal).hide();
	$($bitcoin).hide();
    formValidate();
});

// If user selects other from job role options, show option
$('#title').change((e) => {
	if (e.target.value === "other") {
		$($otherTitle).show().focus();
	} else {
		$($otherTitle).hide();
	}
});

// Hide color options until user selects option from designs
$('#colors-js-puns').hide();
$($theme).change((e) => {
	$($colors).show();
    $('#colors-js-puns').show();
	var selected = $(e.currentTarget).val();
	switch (selected) {
		case "js puns":
			$('#color option[value="cornflowerblue"]').show().attr('selected','selected');
	        $('#color option[value="darkslategrey"]').show();
	        $('#color option[value="gold"]').show();
	        $('option[value="tomato"]').hide().removeAttr('selected');
	        $('option[value="steelblue"]').hide();
	        $('option[value="dimgrey"]').hide();
	        break;
        case "heart js":
	        $('#color option[value="tomato"]').show().attr('selected','selected');
		    $('#color option[value="steelblue"]').show();
		    $('#color option[value="dimgrey"]').show();
		    $('#color option[value="cornflowerblue"]').hide().removeAttr('selected');
		    $('#color option[value="darkslategrey"]').hide();
		    $('#color option[value="gold"]').hide();
		    break;
	    default:
	    	break;
	}
});

// Function to disable workshops with conflicting times
function conflictingWorkshops( class01, class02 ) {
	class01.addEventListener('change', () => {
		if ( class01.checked ) {
			class02.disabled = true;
			$(class02).parent().css("color", "grey").css("font-style", "italic");
		} else {
			class02.disabled = false;
			$(class02).parent().css("color", "initial").css("font-style", "initial");;
		}
	});
}

// Call conflictingWorkshops with conflicting workshop times
conflictingWorkshops(jsFrameworks, express);
conflictingWorkshops(express, jsFrameworks);
conflictingWorkshops(jsLibraries, nodeJs);
conflictingWorkshops(nodeJs, jsLibraries);

// Listen for user to check activities boxes and display total below, or hide total
activitiesParent.addEventListener('click', () => {
    let totalCost = 0;
    $("#totalCost").remove();
          if ($("input[name='all']").is(":checked"))  {
            totalCost += 200;
          }
          $(".activities input:not([name='all'])").each(function(){
            if ($(this).is(":checked")) {
            totalCost += 100;
            }
          });
    if (totalCost > 0) {
        $(".activities").append("<p id='totalCost'>Total cost: $" + "<b>" + totalCost + "</b>" + " </p>");
        $('#totalCost').css("float", "right");
    }
});

// Function to show or hide payment options, depending on user selection
function showHide( el1Show, el2Hide, el3Hide ) {
	$(el1Show).show();
	$(el2Hide).hide();
	$(el3Hide).hide();
}

// Set default payment to credit card
$(ccOption).attr("selected",true);

// Display the correct payment option and hide the others
$(payment).change( () => {
	$option = $("#payment").val();
	switch ($option) {
		case 'paypal':
			showHide($paypal, creditCard, $bitcoin);
			break;
		case 'bitcoin':
			showHide($bitcoin, creditCard, $paypal);
			break;
		default:
            showHide(creditCard, $paypal, $bitcoin);
			break;
	}
});

// Function to create error class
function errorValidate(el, message) {
    $(el).addClass('error');
    $('.error').css("borderColor", "red");
    $(el).focus();
    error = `<b>Oops! </b>`  + message;
}

// Function to validate name
function nameValidate() {
    if ($($userName).val() === "") {
        console.log("Name Error");
        errorValidate('#name', 'Please enter a valid name.');
        return false;
    } else {
        console.log("Name Passes!");
        $($userName).css("borderColor", "").removeClass('error');
        return true;
    }
}

// Function to validate email
function emailValidate() {
    const mail = document.getElementById('mail');
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail.value)) {
        console.log("Email Passes!");
        $(mail).css("borderColor", "").removeClass('error');
        return true;
    } else {
        console.log("Email Error");
        errorValidate('#mail', 'Please enter a valid email.');
        return false;
    }
}

// Function to check if user has selected at least one checkbox in activities section
function activitiesValidate() {
    const checkboxEl = document.querySelector('input[type="checkbox"]:checked');
    if (checkboxEl) {
        console.log("Checkbox Passes!");
        $(activities).removeClass('error');
        legend[2].style.color = 'initial';
        return true;
    } else {
        console.log("Checkbox Error");
        error = "Oops! Please select at least one activity.";
        $(activities).focus();
        legend[2].style.color = 'red';
        return false;
    }
}

// Function to validate credit card number
function ccValidate() {
    const ccNum = document.getElementById('cc-num').value; 
    if (ccNum.length >= 13 && ccNum.length <= 16 && !isNaN(ccNum) || !paymentOption[1].selected) {
        console.log("Credit Card Passes!");
        $('#cc-num').css("borderColor", "").removeClass('error');
        return true;
    } else {
        console.log("Credit Card Error");
        errorValidate('#cc-num', 'Please enter a valid credit card.');
        return false;
    }
}

// Function to validate zipcode
function zipValidate() {
    const zip = document.getElementById('zip').value;
    if (zip.length === 5 && !isNaN(zip) || !paymentOption[1].selected) {
        console.log("Zipcode Passes!");
        $('#zip').css("borderColor", "").removeClass('error');
        return true;
    } else {
        console.log("Zipcode Error");
        errorValidate('#zip', 'Please enter a valid zipcode.');
        return false;
    }
}

// Function to validate CVV numbers
function cvvValidate() {
    const cvv = document.getElementById('cvv').value;
    if (cvv.length === 3 && !isNaN(cvv) || !paymentOption[1].selected) {
        console.log("CVV Passes!");
        $('cvv').css("borderColor", "").removeClass('error');
        return true;
    } else {
        console.log("CVV Error");
        errorValidate('#cvv', 'Please enter a valid 3-digit cvv number.');
        return false;
    }
}

// Function to listen for submit of form and check validation of form elements through their functions
function formValidate() {
    submitButton.addEventListener('click', function(event) {
        if ( nameValidate() && emailValidate() && activitiesValidate() && ccValidate() && zipValidate() && cvvValidate() ) {
            console.log("Validation Passed");
            alert('Registration is complete!')
        } else {
            event.preventDefault();
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            document.getElementById('errorDiv').innerHTML = error;
            $('#errorDiv').show(); // Show error message at top of form if one exists
            console.log("Validation Fail");
        }
    });
}