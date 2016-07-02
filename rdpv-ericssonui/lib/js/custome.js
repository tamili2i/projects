//-----------------------------TAB MENU FUNCTIONALITIES -------------------------------

$("#inputNav").click(function(){
    hideAllNaves();
    $("#input").show(scrollToTop());
    $(this).parent().addClass("active");
});

$("#radioscheckboxesNav").click(function(){
    hideAllNaves();
    $("#radioscheckboxes").show(scrollToTop());
    $(this).parent().addClass("active");
});

$("#selectNav").click(function(){
    hideAllNaves();
    $("#select").show(scrollToTop());
    $(this).parent().addClass("active");
});

$("#buttonsNav").click(function(){
    hideAllNaves();
    $("#buttons").show(scrollToTop());
    $(this).parent().addClass("active");
});

$("#renderedNav").click(function(){
    hideAllNaves();
    $("#rendered").show(scrollToTop());
    $(this).parent().addClass("active");
});

$("#propertyNav").click(function(){
    hideAllNaves();
    $("#property").show(scrollToTop());
    $(this).parent().addClass("active");
});

function hideAllNaves(){
    var navValues = ["input","radioscheckboxes","select","buttons","rendered","property"];
    for(var i=0; i<navValues.length; i++){
        $("#"+navValues[i]).hide();
        $("#"+navValues[i]+"Nav").parent().removeClass("active");
    }
}

function scrollToTop(){
    $('html, body').animate({ scrollTop: 0 });
}

// ---------------------------------------------JSON CONVERTER ------------------------------------------------

$('#convertJson').click(function(){
    var formField = new Array;
    $("#contentSortabble .ui-draggable").each(function() {
        var fieldName = $(this).attr('name');
        console.log(fieldName);
        var formGroup   = $(this).find('.form-group');
        var labelProperty   = { };
        var contentProperty = { };
        var formProperty  = { };
        var labelField   = new Array;
        var contentField = new Array;
        labelProperty = getLabelProperty(formGroup);
        //-------------------------------Construct Object Container----------------------------------
        if(fieldName == 'textInput' || fieldName == 'passwordInput' || fieldName == 'searchInput')
            contentProperty = getTextInput(formGroup);
        if(fieldName == 'prependedText' || fieldName == 'appendedText')
            contentProperty = getPrependAppendTextInput(formGroup);
        if(fieldName == 'prependedCheckbox' || fieldName == 'appendedCheckbox')
            contentProperty = getPrependAppendCheckBox(formGroup);
        if(fieldName == 'buttonDropDown')
            contentProperty = getButtonDropDown(formGroup);
        if(fieldName == 'textArea')
            contentProperty = getTextAreaContent(formGroup);
        //----------------------Get Help Text-----------------------
        contentProperty["helpText"] = formGroup.find('.help-block').text();
        //-----------------------------------Construct Object----------------------------------------
        formProperty["title"]   = fieldName;
        formProperty["label"]   = labelProperty;
        formProperty["content"] = contentProperty;
        formField.push(formProperty);
    });
    hideAllNaves();
    $('#render').html(JSON.stringify(formField));
    $("#rendered").show(scrollToTop());
    $("#renderedNav").parent().addClass("active");
});

//-----Get label Properties
function getLabelProperty (formGroup){
    var labelProperty   = { };
    labelProperty["labelClass"] = formGroup.find('label').attr('class');
    labelProperty["labelText"]  = formGroup.find('label').text();
    return labelProperty;
}

//-----Get Text Input , Password Input & Search Input Properties
function getTextInput (formGroup){
    var contentProperty = { };
        contentProperty["divClass"] = formGroup.find('div').attr('class');
        contentProperty             = getTextBoxContent(formGroup.find('input'), contentProperty);
    return contentProperty;
}

//-----Get Prepend Append Text 
function getPrependAppendTextInput (formGroup){
    var contentProperty = { };
        contentProperty["divClass"] = formGroup.find('div').attr('class');
        contentProperty["subText"]  = formGroup.find('.input-group-addon').text();
        contentProperty             = getTextBoxContent(formGroup.find('input'), contentProperty);
    return contentProperty;
}

//-----Get Prepend Append CheckBox 
function getPrependAppendCheckBox (formGroup){
    var contentProperty = { };
    var getCheckBox = formGroup.find('input[type="checkbox"]');
    var getTextBox  = formGroup.find('input[type="text"]');
        contentProperty["divClass"]  = formGroup.find('div').attr('class');
        contentProperty["isChecked"] = getCheckBox[0].checked;
        contentProperty              = getTextBoxContent(getTextBox, contentProperty);
    return contentProperty;
}

//-----Get Text Area Content 
function getTextAreaContent (formGroup){
    var contentProperty = { };
    var getTextBox  = formGroup.find('input[type="text"]');
        contentProperty["divClass"]  = formGroup.find('div').attr('class');
        contentProperty["id"] = formGroup.find('textarea').attr('id');
        contentProperty["name"] = formGroup.find('textarea').attr('name');
        contentProperty["text"] = formGroup.find('textarea').text();
    return contentProperty;
}

// ------- Get button Drop Down
function getButtonDropDown (formGroup){
    var contentProperty = { };
    var getTextBox  = formGroup.find('input[type="text"]');
    contentProperty["divClass"]    = formGroup.find('div').attr('class');
    contentProperty                = getTextBoxContent(getTextBox, contentProperty);
    contentProperty["mainBtnText"] = formGroup.find('button').text();
    var dropDownMenu = new Array;
    formGroup.find(".dropdown-menu li").each(function() {
        var dropContent   = $(this).find('a');
        var dropDownContent = {};
        dropDownContent['href'] = dropContent.attr('href');
        dropDownContent['text'] = dropContent.text();
        dropDownMenu.push(dropDownContent);
    });
    contentProperty["dropdownMenu"] = dropDownMenu;
    return contentProperty;
}

// ------- Get main Text Content
function getTextBoxContent (getText, contentProperty){
        contentProperty["inputType"]        = getText.attr('type');
        contentProperty["inputId"]          = getText.attr('id');
        contentProperty["inputVal"]         = getText.val();
        contentProperty["inputPlaceHolder"] = getText.attr('placeholder');
        contentProperty["inputClass"]       = getText.attr('class');
    return contentProperty;
}
