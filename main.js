
var btn = document.getElementById('btn');
const form = document.getElementById('Form')
const firstname_input = document.getElementById('FirstNameInput')
const email_input = document.getElementById('EmailInput')
const password_input = document.getElementById('PasswordInput')
const repeat_password_input = document.getElementById('RepeatPasswordInput')
const error_message = document.getElementById('ErrorMsg')
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input!=null)
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;



form.addEventListener('submit', (e) =>{ 
    let errors = []
    e.preventDefault() 

    if(firstname_input){
        //If we have a first name input this means we are in the signup page
        errors = getSignUpFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)

        if(errors.length === 0){
            // Retrieve existing users or initialize an empty array
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Checking if the email already exists
            const emailExists = existingUsers.some(user => user.email === email_input.value);

            if (emailExists) {
                error_message.innerText = "Email already exists!";
                email_input.parentElement.classList.add('incorrect');
                return;  // Stop the signup process
            }

            // Adding the new user to the array
            existingUsers.push({
                firstname: firstname_input.value,
                email: email_input.value,
                password: password_input.value
            });

            // Storing the updated users array in localStorage
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        }

    }else{
        //If we don't have a first name input this means we are in the login page
        errors = getLogInFormErrors(email_input.value, password_input.value)

        if (errors.length === 0){
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.email === email_input.value && user.password === password_input.value);

            if(user && user.email === email_input.value &&user.password === password_input.value){
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1000);

            }else{
                errors.push("Incorrect email or password!");
            }
        }

    }

    if(errors.length > 0){
        // If there are any errors
        e.preventDefault()
        error_message.innerText = errors.join("/  ")
        console.log(errors)
    }
})

function getSignUpFormErrors(firstname, email, password, repeatpPassword){
    let errors = []
    
    if(firstname ==='' || firstname == null){
        errors.push('Firstname  is required')
        firstname_input.parentElement.classList.add('incorrect')
    }

    if(email ==='' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }else if(!emailPattern.test(email)){
        errors.push('Please enter a valid email address');
        email_input.parentElement.classList.add('incorrect')
    }



    if(password ==='' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }else if(!passwordPattern.test(password)){
        errors.push('Password must be at least 8 characters - contain at least one uppercase letter - one lowercase letter - and one number - and only include letters and numbers.')
        password_input.parentElement.classList.add('incorrect')
    }

    if(password !== repeatpPassword){
        errors.push('Passwords must match')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

allInputs.forEach( input => {
    input.addEventListener('input' , () =>{
       if(input.parentElement.classList.contains('incorrect')){
        input.parentElement.classList.remove('incorrect')
        error_message.innerText=''
       } 
    })
})

function getLogInFormErrors(email, password){
    let errors = []
    const user = JSON.parse(localStorage.getItem("users"));

    if(email ==='' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password ==='' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

