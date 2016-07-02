var new_id = 20;
$(".compnentContent").draggable({
    cursor: "pointer",
    revert: "invalid",
    helper: function(event, ui) {
        var cloned = $(this).find(".component").clone();
        cloned.addClass('drag-obj');
        cloned.removeClass('visProp');
        return cloned;
    }
});

$(".droppable").droppable({
    accept: ".compnentContent",
    drop: function(event, ui) {
        var dropped = $(ui.draggable).find(".component").clone();
        var raLayoutTwo = dropped.contents().find(".ra-layout-two");
        //console.log(dropped);
        //dropped.contents().removeClass('e-textbox-hide');
        dropped.removeClass('component');
        dropped.removeClass('visProp');
        dropped.contents().find(".empty-div").addClass("droppable1");
        dropped.contents().find("e-draggable-labels").addClass("e-textbox-hide");
        var newId = ++new_id;
        dropped.attr('id', ("mainDiv-" + newId)).find(".right-input-container").append('<span class="ra-formbuilder"> <span class="ra-edit-content" id="editDrag-'+ newId+'"> <i class="ebIcon ebIcon_edit"></i></span> <span class="ra-remove-drag-item" id="removeDrag-'+newId+'"><i class="ebIcon ebIcon_delete"></i></span></span>');
        dropped.addClass('ui-draggable');
        var droppedOn = $(this);
        $(dropped).detach().css({
            top: 0,
            left: 0
        }).appendTo(droppedOn);

        //var currentContId= ("mainDiv-" + newId);
        //console.log("currentContId..............",currentContId);
        //console.log("--------------------",$('#'+currentContId).parent());

        //var res = dropped.contents().find(".empty-div");
        //console.log("event............",event);
        //console.log("event............",this);
        //console.log(this.html);
        /*var getLayoutFour = $(this).find(".ra-layout-four");
        var getLayoutTwo = $(this).find(".ra-layout-two");
        if (getLayoutFour.length > 0) {
          addDroppable(2);
        }else if(getLayoutTwo.length > 0) {
          addDroppable(0);
        }*/
        addDroppable();
        removeDragItems();
        editDragItems();

    },
    over: function(event, elem) {
        console.log("over");
    },
    out: function(event, elem) {
        console.log("out");
    }
}).sortable({
    revert: false
});


function addDroppable() {
    $(".droppable1").droppable({
        accept: ".compnentContent",
        drop: function(event, ui) {
            $(this).removeClass("dashed-border");
            var dropped = $(ui.draggable).find(".component").clone();
            dropped.removeClass('component');
            dropped.removeClass('visProp');
            $("#mainDiv-" + new_id).remove();
            //dropped.attr('id', ("mainDiv-" + newId)).find(".right-input-container").append('<span class="ra-formbuilder"> <span class="ra-edit-content" id="editDrag-'+ newId+'"> <i class="ebIcon ebIcon_edit"></i></span> <span class="ra-remove-drag-item" id="removeDrag-'+newId+'"><i class="ebIcon ebIcon_delete"></i></span></span>');
            //console.log("..event..1...",$(event.target).attr("class"));

            if ($(event.target).attr("class").indexOf("ra-layout-two") >= 0){
              dropped.contents().find(".ericRdpv-col-10").addClass("ericRdpv-col-8").removeClass("ericRdpv-col-10");
              dropped.contents().find(".ericRdpv-col-2").addClass("ericRdpv-col-4").removeClass("ericRdpv-col-2");
            }else{
              dropped.contents().find(".ericRdpv-col-10").addClass("ericRdpv-col-12").removeClass("ericRdpv-col-10");
              dropped.contents().find(".ericRdpv-col-2").addClass("ericRdpv-col-12").removeClass("ericRdpv-col-2");
            }
            var newId = ++new_id;
            dropped.attr('id', ('subDiv-' + newId).toString());
            var droppedOn = $(this);
            $(dropped).detach().css({
                top: 0,
                left: 0
            }).appendTo(droppedOn);
        },
        over: function(event, elem) {
            console.log("over");
            $(this).addClass("dashed-border");
        },
        out: function(event, elem) {
            console.log("out");
            $(this).removeClass("dashed-border");
        }
    }).sortable({
        revert: false
    });
}

$('.form-name').click(function() {
    var options = {
        content: "<input type='text' placeholder='Form Name' id='formNameText' class='form-control input-md'><button id='changeFormName' class='btn btn-success '> Ok </button><script>$('.close').click(function(){   $('.form-name').popover('hide');});$('#changeFormName').click(function(){if($('#formNameText').val().length != 0){$('.form-name').html('');$('.form-name').append($('#formNameText').val());}$('.form-name').popover('hide');});</script>",
        placement: "bottom",
        html: true,
        title: 'Change Form Name <button type="button" class="close" data-dismiss="popover" aria-hidden="true">&times;</button>',
    };
    $('.form-name').popover(options);
});

function removeDragItems() {
    $('.ra-remove-drag-item').click(function() {
        var getId = $(this).attr('id');
        var res = getId.split("-");
        $("#e-textbox-Render").css("display", "none");
        $("#mainDiv-" + res[1]).remove();
    });
}

//--------------------------EDIT DRAG ITEMS PROPERTY-----------------------

function editDragItems() {
    $('.ra-edit-content').click(function() {
        var getId = $(this).attr('id');
        var res = getId.split("-");
        //var pos = $(this).position();
        hideAllNaves();
        var top = $(this).offset().top + 12;
        var left = $(this).offset().left - 60;
        console.log(res);
        $("#e-textbox-prop-pop").css({
            top: top + "px",
            left: left + "px"
        });
        $("#e-textbox-prop-pop").css("display", "block");
        var getPropertyName = $("#mainDiv-" + res[1]).attr('name');
        var mainContent = "#mainDiv-" + res[1];
        if(getPropertyName == 'textInput' || getPropertyName == 'passwordInput' || getPropertyName == 'searchInput') {
            editTextInputProperty(mainContent);
        }
    });
}

function editTextInputProperty(mainContent) {
    var getFormDivContent = $(mainContent).find('.form-group');
    var labeltext = $("#textbox-caption").text();
    var labelclass = $(".ebLabel-text").attr('class');
    var getText = getFormDivContent.find('input');
    var textBoxVal = getText.val();
    var textBoxID = getText.attr('id');
    var textBoxPlaceholder = getText.attr('placeholder');
    var textBoxStyle = getFormDivContent.find('div').attr('style');
    var helpText = $('.help-text').html();
    $("#labeltext").val(labeltext);
    $("#labeltextsize").val(labelclass);
    $("#inputTextValue").val(textBoxVal);
    $("#textBoxId").val(textBoxID);
    $("#textPlaceHolder").val(textBoxPlaceholder);
    $("#textBoxSize").val(textBoxStyle);
    $("#helpText").val(helpText);
    $('#renderFormContent').click(function() {
      alert("..."+$('#helpText').val());
        labeltext = $('#labeltext').val();
        labelTextSize = getTagEditorValues('labelBoxSize');
        textBoxVal = $('#textBoxVal').val();
        textBoxID = $('#textBoxId').val();
        textBoxPlaceholder = $('#textPlaceHolder').val();
        textBoxClass = getTagEditorValues('textBoxClass');
        helpText = $('#helpText').val();
        var textBoxValue = $("#inputTextValue").val();
        $(".ebLabel-text").text(labelText1);
        getFormDivContent.find('.ebLabel-text').attr('class', labelTextSize);
        getText.val(textBoxValue);
        getText.attr('id', textBoxID);
        getText.attr('placeholder', textBoxPlaceholder);
        getFormDivContent.find('div').attr('style', textBoxClass);
        getFormDivContent.find('.help-text').html(helpText);
        $("#e-textbox-prop-pop").css("display", "none");
    });
}


/*
function editTextInputProperty(mainContent){
    var getFormContent     = $(mainContent).find('.form-group');
    var labelText          = getFormContent.find('label').text();
    var labelTextSize      = getFormContent.find('label').attr('class');
    var getText            = getFormContent.find('input');
    var textBoxVal         = getText.val();
    var textBoxID          = getText.attr('id');
    var textBoxPlaceholder = getText.attr('placeholder');
    var textBoxClass       = getFormContent.find('div').attr('class');
    var helpText           = getFormContent.find('.help-block').text();
    var getClass           = labelTextSize.split(' ');
    var seperateClass      = '';
    for ( var i = 0, l = getClass.length; i<l; ++i ) {
        seperateClass = seperateClass + getClass[i] + ',';
    }
    $('#labelText').val(labelText);
    $('#labelBoxSize').val(seperateClass);
    $('#textBoxVal').val(textBoxVal);
    $('#textBoxID').val(textBoxID);
    $('#textBoxPlaceholder').val(textBoxPlaceholder);
    $('#textBoxClass').val(textBoxClass);
    $('#helpText').val(helpText);
    $('#labelBoxSize').tagEditor({
        autocomplete: {
            delay: 0, // show suggestions immediately
            position: { collision: 'flip' }, // automatic menu position up/down
            source: ['col-md-12', 'col-md-8', 'col-md-6', 'col-md-4', 'col-md-2']
        },
        forceLowercase: false,
        placeholder: 'Bootstrap Class...'
    });
    $('#textBoxClass').tagEditor({
        autocomplete: {
            delay: 0,
            position: { collision: 'flip' },
            source: ['col-md-12', 'col-md-8', 'col-md-6', 'col-md-4', 'col-md-2']
        },
        forceLowercase: false,
        placeholder: 'Bootstrap Class...'
    });
    $('#renderTextInput').click(function(){
        labelText          = $('#labelText').val();
        labelTextSize      = getTagEditorValues('labelBoxSize');
        textBoxVal         = $('#textBoxVal').val();
        textBoxID          = $('#textBoxID').val();
        textBoxPlaceholder = $('#textBoxPlaceholder').val();
        textBoxClass       = getTagEditorValues('textBoxClass');
        helpText           = $('#helpText').val();
        getFormContent.find('label').text(labelText);
        getFormContent.find('label').attr('class', labelTextSize);
        getText.val(textBoxVal);
        getText.attr('id',textBoxID);
        getText.attr('placeholder', textBoxPlaceholder);
        getFormContent.find('div').attr('class', textBoxClass);
        getFormContent.find('.help-block').text(helpText);
        return false;
    });
}*/

//Seperate a class name and return
function getTagEditorValues(id) {
    return $('#' + id).val().replace(/\,/g, ' ');
}
