
let $userName = $('#name');
let $otherTitle = $('#other-title');
let $theme = $('#design');
let $colorSelect = $('#colors-js-puns');
let $colors = $('#color');


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

$($theme).change( () => {
    if ($($theme).val() === 'js puns') {
    	$colors.show();
        $('option[value="tomato"]').hide();
        $('option[value="steelblue"]').hide();
        $('option[value="dimgrey"]').hide();
    } 

});







