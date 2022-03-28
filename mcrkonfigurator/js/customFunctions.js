// Validate Form by Form ID
// Required: Button with type submit, Required with class required
export function validateForm(formid) {
    var form = document.getElementById(formid);
    var submit = form.querySelector("button[type=submit]");
    var required = form.querySelectorAll(".required");
    var valid = true;
    for (var i = 0; i < required.length; i++) {
        if (required[i].value == "" || required[i].value == null || required[i].value == undefined) {
            valid = false;
        }
    }
    if (valid == true) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}