angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope, $state) {
    BaasBox.setEndPoint("http://localhost:9000");
    BaasBox.appcode = "1234567890";
    console.log("BaasBox initiated");


    // Form data for the login modal
    $scope.loginData = {};

    // Form data for the signUp modal
    $scope.signUpData = {};

    console.log(window.localStorage);

    var userData = JSON.parse(window.localStorage['user-data'] || '{}');
    console.log(userData);
    if (userData != null) {
        $scope.username = userData.username;
        $scope.email = userData.email;
        $scope.token = userData.token;

    }

    // Richiede il logout
    $scope.logout = function() {
        if(confirm('Vuoi effettuare il logout')) {
            $scope.doLogout();
        }
    };



    // Perform the login action when the user submits the login form
    $scope.doLogout = function() {
        console.log('Doing logout', $scope.loginData);
        BaasBox.logout()
            .done(function (res) {
                console.log(res);
                $scope.username = null;
            })
            .fail(function (error) {
                console.log("error ", error);
            })
        window.localStorage['user-data'] = null;
        $scope.username = null;
    };




    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        BaasBox.login($scope.loginData.username, $scope.loginData.password)
            .done(function (user) {
                console.log("Logged in ", user.username);
                $scope.username = user.username;
                $scope.email = user.visibleByTheUser.email;

                window.localStorage['user-data'] = JSON.stringify({
                    'username' : user.username,
                    'password' : $scope.loginData.password,
                    'token' : user.token
                });

                console.log('Logged ', window.localStorage['user-data']);
                $state.go('home');

            })
            .fail(function (err) {
                console.log("error ", err.responseText )
                alert("Login errato, riprovare.")
            });
    };

    $scope.doSignUp = function() {
        console.log('Doing SignUp', $scope.signUpData);

        BaasBox.signup($scope.signUpData.username, $scope.signUpData.password, {"visibleByTheUser": {"email" : $scope.signUpData.email}})
            .done(function (res) {
                console.log("signup ", user);

                $scope.username = user.username;
                $scope.email = $scope.signUpData.email;
                window.localStorage['user-data'] = JSON.stringify({
                    'username' : $scope.signUpData.username,
                    'password' : $scope.loginData.password,
                    'token' : user.token
                });

                console.log(window.localStorage);
            })
            .fail(function (error) {$scope.signUpData
                console.log("error ", err.responseText );
            });
    };
})
   
.controller('homeCtrl', function($scope) {

})
   
.controller('profiloCtrl', function($scope) {

})
   
.controller('cercaCtrl', function($scope, HttpService) {
    /*HttpService.getPost()
        .then(function(response) {
            $scope.post = response;
        });

    HttpService.getUsers()
        .then(function(response) {
            $scope.users = response;
        });*/
})
   
.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('profiloTrainerCtrl', function($scope) {

})

.controller('creaSchedeCtrl', function($scope) {

})
    