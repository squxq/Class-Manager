const formDOM = document.querySelector(`#form`)

const email = document.querySelector(`#email`)
const password = document.querySelector(`#password`)

const emailError = document.querySelector(`.error-email`)
const passwordError = document.querySelector(`.error-password`)

formDOM.addEventListener(`submit`, async (element) => {
    element.preventDefault()

    // clear errors
    emailError.textContent = ``
    passwordError.textContent = ``

    try {
        const { data } = await axios({
            method: `post`,
            url: `login`,
            withCredentials: true,
            // headers: { 'Access-Control-Allow-Origin': `https://a.com` },
            data: {
                email: email.value,
                password: password.value,
            }
        })

        // location.assign(`/dashboard`)
        
        // clear inputs
        email.value = ``
        password.value = ``
    } catch (error) {
        // error messages
        console.log(error.response.data.errors);
        emailError.textContent = error.response.data.errors.email
        passwordError.textContent = error.response.data.errors.password
        
        // reset password
        password.value = ``
    }
})