const formDOM = document.querySelector(`#form`)

const firstname = document.querySelector(`#firstname`)
const lastname = document.querySelector(`#lastname`)
const email = document.querySelector(`#email`)
const password = document.querySelector(`#password`)

const firstnameError = document.querySelector(`.error-firstname`)
const lastnameError = document.querySelector(`.error-lastname`)
const emailError = document.querySelector(`.error-email`)
const passwordError = document.querySelector(`.error-password`)



formDOM.addEventListener(`submit`, async (element) => {
    element.preventDefault()

    // clear errors
    firstnameError.textContent = ``
    lastnameError.textContent = ``
    emailError.textContent = ``
    passwordError.textContent = ``

    try {
        const { data } = await axios({
            method: `post`,
            url: `signup`,
            withCredentials: true,
            // headers: { 'Access-Control-Allow-Origin': `https://a.com` },
            data: {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
            }
        })

        location.assign(`/confirmation-link`)
        
        // clear inputs
        firstname.value = ``
        lastname.value = ``
        email.value = ``
        password.value = ``
    } catch (error) {
        // error messages
        firstnameError.textContent = error.response.data.errors.firstname
        lastnameError.textContent = error.response.data.errors.lastname
        emailError.textContent = error.response.data.errors.email
        passwordError.textContent = error.response.data.errors.password
        
        // reset password
        password.value = ``
    }
})