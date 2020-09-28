var accessToken = window.localStorage.getItem('access_token')

$(document).ready(function () {

    $('#spinner').show()
    $('.user-table').hide()
    $('#welcomeMessage').hide()
    $('#spinner-update').hide()
    if (accessToken != null) {
        getUserProfile(accessToken)
    } else {
        window.location.href = '/logout'
    }
});

function getUserProfile(accessToken) {
    $.ajax({
        type: 'get',
        url: '/api/getProfile?access_token=' + accessToken,
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.IsExist) {
                $("#name").text(data.Profile[0].Name);
                $("#email").text(data.Profile[0].Email);
                $("#phone").text(data.Profile[0].PhoneId);
                $("#uid").text(data.Profile[0]._id);
                $("#createdAt").text(data.Profile[0].CreatedAt);
                $("#phoneVerified").text(data.Profile[0].PhoneVerified);
                $('#spinner').hide()
                $('.user-table').show()
                if (data.Profile[0].Name != null) {
                    $('#welcomeName').text(data.Profile[0].Name)
                    $('#welcomeMessage').show()
                }
                if (data.Profile[0].Name == null && data.Profile[0].Email == null) {
                    generateModel(false)
                }


            }
            if (data.IsAuthenticated == false) {
                document.location.href = '/login'
            }
        }
    })
}

function generateModel(isError) {
    var title = 'Please complete your <br><br> Profile!'
    var icon = 'fa fa-user-circle-o'
    var type = 'blue'
    if (isError) {
        title = 'Profile Update Failed,<br><br>Please retry..'
        icon = 'fa fa-frown-o'
        type = 'red'
    }

    $.confirm({
        title: title,
        content: 'url:/updateProfileView',
        icon: icon,
        theme: 'modern',
        animation: 'scale',
        type: type,
        buttons: {
            sayMyName: {
                text: 'Save',
                btnClass: 'btn-orange',
                action: function () {

                    var data = {
                        Email: this.$content.find('input#email').val(),
                        Name: this.$content.find('input#name').val()
                    }
                    if (!data.Email || !data.Name) {
                        $.alert({
                            content: "Please Enter Required Fields",
                            type: 'red'
                        });
                        return false;
                    } else {
                        $('#spinner-update').show()
                        updateProfile(data)
                    }
                }
            },
            later: function () {
                // do nothing.
            }
        }
    });

}


function updateProfile(data) {

    $.ajax({
        type: 'post',
        url: '/api/updateProfile?access_token=' + accessToken,
        dataType: 'json',
        data: data,
        cache: false,
        success: function (data) {
            if (data.IsUpdated) {
                setTimeout(function () {
                    $('#spinner-update').hide()
                    window.location.reload();

                }, 5000);
            }
            if (data.err) {
                $('#spinner-update').hide()
                generateModel(true)
            }
            if (data.IsAuthenticated == false) {
                document.location.href = '/login'
            }
        }
    })
}
function logout() {
    window.localStorage.removeItem('access_token')
    window.location.href = '/logout'
}