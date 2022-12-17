// handle errors

const handleErrors = (err) => {

    let errors = { firstname: ``, lastname: ``, email: ``, password: `` }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = `That email is already registered.`
        return errors
    }

    // validation errors
    if (err.message.includes(`Users validation failed`)) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    if (err.message.includes(`User not found.`)) { errors.email = err.message}
    
    if (err.message.includes(`Incorrect password.`)) { errors.password = err.message}

    return errors
}

module.exports = handleErrors