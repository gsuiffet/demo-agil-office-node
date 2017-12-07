$( document ).ready(function() {
    $(function(){
        $('#select_link').click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/call',
                success: function(notification) {
                    //console.log(JSON.stringify(notification));
                    if ((JSON.stringify(notification.notification))) {
                        location.reload();
                    }
                }
            });
        });
    });
});