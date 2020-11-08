const validateInput = function (tag) {
    console.log('aa');
    switch (tag) {
        case "name":
            this.$refs.name.checkValidity()
                ? (this.$refs.name.style.cssText = "")
                : (this.$refs.name.style.cssText =
                    "border : 2px solid red !important ");
            break;
        case "email":
            this.$refs.email.checkValidity()
                ? (this.$refs.email.style.cssText = "")
                : (this.$refs.email.style.cssText =
                    "border : 2px solid red !important");
            break;
        case "password":
            this.$refs.password.checkValidity()
                ? (this.$refs.password.style.cssText = "")
                : (this.$refs.password.style.cssText =
                    "border : 2px solid red !important");
            break;
    }

}

export default validateInput;