$(document).ready(function () {
    $('#spinner').hide()
    $('#errorMsg').hide()
    $('#spinner-login').hide()
});
$('#user-login').on('submit', function (e) {
    $('#spinner').show()
    var phoneNo = iti.getNumber();
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/api/twilio/sendOtp',
        dataType: 'json',
        data: {
            PhoneId: phoneNo
        },
        cache: false,
        success: function (data) {
            if (data.Sid && data.IsPosted) {
                $('.spinner-border').delay(1500).fadeOut()
                generateModel(phoneNo, false)
            } else if (data.IsPosted == false) {
                $('#errorMsg').show()
                $('#errorMsg').html("Something went wrong,please try again...")
                $('#errorMsg').delay(3500).fadeOut()
                $('.spinner-border').fadeOut()
            }

        }
    })

})

function generateModel(PhoneId, isError) {
    var title = 'Otp Sent Successfully'
    var icon = 'fa fa-smile-o'
    var type = 'blue'
    if (isError) {
        title = 'Otp Verification Failed,<br><br>Please retry..'
        icon = 'fa fa-frown-o'
        type = 'red'
    }

    $.confirm({
        title: title,
        content: 'url:/otpview',
        icon: icon,
        theme: 'modern',
        animation: 'scale',
        type: type,
        buttons: {
            sayMyName: {
                text: 'Verify',
                btnClass: 'btn-orange',
                action: function () {
                    var otp = this.$content.find('input#otp');
                    if (!otp.val()) {
                        $.alert({
                            content: "Please Enter Otp",
                            type: 'red'
                        });
                        return false;
                    } else {
                        $('#spinner-login').show()
                        verifyOtp(otp.val(), PhoneId)
                    }
                }
            },
            later: function () {
                // do nothing.
            }
        }
    });

}
function verifyOtp(otp, PhoneId) {
    $.ajax({
        type: 'post',
        url: '/api/twilio/verifyOtp',
        dataType: 'json',
        data: {
            Otp: otp,
            PhoneId: PhoneId
        },
        cache: false,
        success: function (data) {
            if (data.IsAuthenticated && data.access_token) {
                $('#spinner-login').hide()
                window.localStorage.setItem('access_token', data.access_token)
                window.location.href = "/profile"
            } else {
                $('#spinner-login').hide()
                generateModel(PhoneId, true)
            }
        }
    })
}