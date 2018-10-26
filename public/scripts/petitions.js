
 $('form').submit(function(e) {
    var currentForm = this;
    e.preventDefault();
    bootbox.confirm({title:"Sign Petition",closeButton:false, message: "Are you sure you want to sign the petition?",size:"large",buttons: {
        cancel: {
            label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
            label: '<i class="fa fa-check"></i> Confirm'
        }
    },callback: function(result){
        if(result)
        {
            currentForm.submit();
        }
        
    } 
    }

);
});
$(document).on("click", ".signed", function(e) {
    bootbox.alert({
        closeButton:false, 
        title:"Petition Signed",
        size: "large",
    message: "You have already signed this petition", 
        callback: function(){ }
      })
     
});

/*$('form').submit(function(e){
    bootbox.confirm({
        closeButton:false,
        size:"large",
        title:"Sign Petition",
        message: "Are you sure you want to sign this petition?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
            if(result == true)
            {
                currentForm.submit();       
            }
        }
    });
});*/