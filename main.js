const apiUrl = API_URL;

$(document).ready(function () {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Hello',accessToken,window.location.href)
    const currentPath = window.location.pathname;
    const loginLogoutLink = document.getElementById('loginLogout');
    if(localStorage.getItem('accessToken')){
        loginLogoutLink.innerText = "Logout";
        loginLogoutLink.href = "#";
        loginLogoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/index.html";
        });
        if (currentPath.includes('index.html')) {
            window.location.href = "/src/components/home/home.html";
        }
    }
    else{
        loginLogoutLink.innerText = "Login/SignUp";
        loginLogoutLink.href = "/index.html";
    }
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        $.post(`${apiUrl}/api/users/login`, { username, password })
            .done((data) => {
                token = data.accessToken;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = "/src/components/home/home.html";
            })
            .fail(function () {
                alert('Login failed! Please check your credentials.');
            });
    });
    $('#registerForm').on('submit', function(e){
        e.preventDefault();
        console.log('Hello')
        const username = $('#new-username').val();
        const password = $('#new-password').val();
        const role = $('#role').val();
        const confirmPassword = $('#confirmPassword').val();

        if(password !== confirmPassword){
            alert('Password and Confirm Password must match')
        }
        else if(password.length == 0 || confirmPassword.length == 0 || username.length == 0){
            alert('Fields cannot be empty')
        }
        else{
            $.post(`${apiUrl}/api/users/register`, {
                username: username,
                password: password,
                role: role
            })
            .done((data) => {
                alert('User Added Successfully');
                window.location.reload();
            })
            .fail(() => {
                alert('Error registering user');
            });
        }
    })
})