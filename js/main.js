

const $userName = $('#name');
const $otherTitle = $('#other-title');

const $theme = $('#design');
const $colorSelect = $('#colors-js-puns');
const $colors = $('#color');

const activitiesParent = document.querySelector('.activities');
const activities = activitiesParent.querySelectorAll('input[type="checkbox"]');

let jsFrameworks = document.getElementsByName("js-frameworks")[0];
let jsLibraries = document.getElementsByName("js-libs")[0];
let express = document.getElementsByName("express")[0];
let nodeJs = document.getElementsByName("node")[0];
let buildTools = document.getElementsByName("build-tools")[0];
let npm = document.getElementsByName("npm")[0];

$(document).ready(() => {
	$userName.focus();
	$otherTitle.hide();
	$colors.hide();
});

$('#title').on('change', (e) => {
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
			class02.parentElement.style.setProperty("color", "grey");
		} else {
			class02.disabled = false;
			class02.parentElement.style.setProperty("color", "initial");
		}
	});
}

conflictingWorkshops(jsFrameworks, express);
conflictingWorkshops(express, jsFrameworks);
conflictingWorkshops(jsLibraries, nodeJs);
conflictingWorkshops(nodeJs, jsLibraries);

$(activities).on('click', () => {
    var total = 0;
    $("#cost").remove();
          if ($("input[name='all']").is(":checked"))  {
            total += 200;
          }
          $(".activities input:not([name='all'])").each(function(){
            if ($(this).is(":checked")) {
            total += 100;
            }
          });

    if (total > 0) {
    $(".activities").append("<p id='cost'>Total cost: $" + total + " </p>");
    }
});

