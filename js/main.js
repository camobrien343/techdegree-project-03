

const $userName = $('#name');
const $otherTitle = $('#other-title');

const $theme = $('#design');
const $colorSelect = $('#colors-js-puns');
const $colors = $('#color');

const activitiesParent = document.querySelector('.activities');
const activities = activitiesParent.querySelectorAll('input[type="checkbox"]');

const jsFrameworks = document.getElementsByName("js-frameworks")[0];
const jsLibraries = document.getElementsByName("js-libs")[0];
const express = document.getElementsByName("express")[0];
const nodeJs = document.getElementsByName("node")[0];
const buildTools = document.getElementsByName("build-tools")[0];
const npm = document.getElementsByName("npm")[0];

const payment = document.querySelector('#payment');
const creditCard = document.getElementById("credit-card");
$paypal = $("#credit-card").next();
$bitcoin = $("#credit-card").next().next();


$(document).ready(() => {
	$($userName).focus();
	$($otherTitle).hide();
	$($colors).hide();
	$($paypal).hide();
	$($bitcoin).hide();
});

$('#title').change((e) => {
	if (e.target.value === "other") {
		$($otherTitle).show().focus();
	} else {
		$($otherTitle).hide();
	}
});

$($theme).change((e) => {
	$($colors).show();
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

conflictingWorkshops(jsFrameworks, express);
conflictingWorkshops(express, jsFrameworks);
conflictingWorkshops(jsLibraries, nodeJs);
conflictingWorkshops(nodeJs, jsLibraries);

$(activities).on('click', () => {
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
    $('#totalCost').css("float", "right")
    }
});

$(payment).change( () => {
	$option = $("#payment").val();
	switch ($option) {
		case 'credit card':
			$("#credit-card").show();
			$($paypal).hide();
			$($bitcoin).hide();
			break;
		case 'paypal':
			$("#credit-card").hide();
			$($paypal).show();
			$($bitcoin).hide();
			break;
		case 'bitcoin':
			$("#credit-card").hide();
			$($paypal).hide();
			$($bitcoin).show();
			break;
		default:
			$("#credit-card").hide();
			$($paypal).hide();
			$($bitcoin).hide();
			break;
	}
});




