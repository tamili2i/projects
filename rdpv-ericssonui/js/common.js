
/**
	Function used to show or hide the containers based on their id attribute
*/
function showOrHideMenu(id) {
	if(document.getElementById(id).style.display == 'none') {
		document.getElementById(id).style.display = 'block';
	} else {
		document.getElementById(id).style.display = 'none';
	}
}

/**
	Application need to move/go forward/backward to a specific file or location
	based on location atttribute. This function tochange window URL. Better to use in non-server place.
*/
function moveTo(location) {
 	window.location.href = ""+location+"";
}

//----- OPEN
$('[ericRdpv-popup-open]').on('click', function(e)  {
	 var targeted_popup_class = jQuery(this).attr('ericRdpv-popup-open');
	 $('[ericRdpv-popup="' + targeted_popup_class + '"]').fadeIn(350);

	 e.preventDefault();
});

//----- CLOSE
$('[ericRdpv-popup-close]').on('click', function(e)  {
	var targeted_popup_class = jQuery(this).attr('ericRdpv-popup-close');
	$('[ericRdpv-popup="' + targeted_popup_class + '"]').fadeOut(350);
	event.preventDefault();
});
//Calulates content height
function calculateHeight() {
	var screenHeight = $(window).height(),
		headerHeight = $(".eaContainer-SystemBarHolder").height(),
		breadcrumbHeight = $(".elLayouts-TopSection-breadcrumb").height(),
		SectionHeaderHeight = $(".ebLayout-SectionSubHeader").height(),
		titleHeight = $(".elLayouts-TopSection-title").height();
		return screenHeight - (headerHeight + breadcrumbHeight + SectionHeaderHeight + titleHeight + 70);
}
function addBodyScroll() {
	$("body").mCustomScrollbar({
		axis:"x",
		theme:"minimal-dark"
	});
}
addBodyScroll()

function messageTextToggle() {
	$(".message-button").css("display", "none");
	$(".message-area").css("display", "block");
	$(".message-area textarea").val("");
}
$(".message-area textarea").on("keydown", function(event) {
	if(event.keyCode == 13) {
		$(".message-button").css("display", "block");
		$(".message-area").css("display", "none");
	}
})

function closeChip(event) {
	$($(event.currentTarget).parent()).css("display", "none");
}

//fileupload
var fileTarget = $("#er-fileupload");
fileTarget.on('dragenter', function (e)
{
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #0B85A1');
});
fileTarget.on('dragover', function (e)
{
     e.stopPropagation();
     e.preventDefault();
});
fileTarget.on('drop', function (e)
{

     $(this).css('border', '2px dotted #0B85A1');
     e.preventDefault();
     var files = e.originalEvent.dataTransfer.files;

     //We need to send dropped files to Server
     handleFileUpload(files,fileTarget);
});
$(document).on('dragenter', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function (e)
{
  e.stopPropagation();
  e.preventDefault();
  fileTarget.css('border', '2px dotted #0B85A1');
});
$(document).on('drop', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});
function handleFileUpload(files,fileTarget)
{
   for (var i = 0; i < files.length; i++)
   {
        var fd = new FormData();
        fd.append('file', files[i]);

        var status = new createStatusbar(fileTarget,files[i]); //Using this we can set progress.
        status.setFileNameSize(files[i].name,files[i].size);
        sendFileToServer(fd,status);

   }
}

function sendFileToServer(formData,status)
{
		var percent = 0;
		var fileupload = (window).setInterval(function(){
			if(percent == 100) {
				clearInterval(fileupload);
			} else {
				percent = percent +10;
				status.setProgress(percent)
			}

		},100)
}

function createStatusbar(fileTarget,file)
{
     this.statusbar = $("<div class='upload-file'></div>");
		 this.fileview = $("<div class='file-view'></div>").appendTo(this.statusbar);
		 this.fileDetails = $("<div class='file-details'></div>").appendTo(this.statusbar);
     this.filename = $("<div class='filename'></div>").appendTo(this.fileDetails);
     this.size = $("<div class='filesize'></div>").appendTo(this.fileDetails);
     this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
     this.abort = $("<div class='abort' onclick='closeChip(event)'><i class='ebIcon alarmDelete'></i></div>").appendTo(this.statusbar);
     fileTarget.after(this.statusbar);

    this.setFileNameSize = function(name,size)
    {
        var sizeStr="";
        var sizeKB = size/1024;
        if(parseInt(sizeKB) > 1024)
        {
            var sizeMB = sizeKB/1024;
            sizeStr = sizeMB.toFixed(2)+" MB";
        }
        else
        {
            sizeStr = sizeKB.toFixed(2)+" KB";
        }

        this.filename.html(name);
        this.size.html(sizeStr);
    }
    this.setProgress = function(progress)
    {
        var progressBarWidth =progress*this.progressBar.width()/ 100;
        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
    }
    this.setAbort = function(jqxhr)
    {
        var sb = this.statusbar;
        this.abort.click(function()
        {
            jqxhr.abort();
            sb.hide();
        });
    }
}
$("#fileUpload").on("change", function(){
	var file = document.getElementById("fileUpload").files;
	handleFileUpload(file, fileTarget);
})


function openmodel(modal) {
	$("#"+modal).addClass("fadeIn");
	$(".modal-content").addClass("slideIn");
	$("#"+modal).addClass("modal-open");
}
function modelclose(modal){
	$(".modal-content").removeClass("slideIn");
	$("#"+modal).removeClass("fadeIn");
	$(".modal-content").addClass("slideOut");
	$(".modal").addClass("fadeOut");
	// $("#"+modal).addClass("model-close");
	// $("#"+modal).removeClass("modal-open");
	setTimeout(function(){
		$("#"+modal).removeClass("modal-open");
		$(".modal-content").removeClass("slideOut");
		$(".modal").removeClass("fadeOut");
	},300)
}
$(window).load(function() {
	setInterval(function(){
		document.getElementById("time").innerHTML = createTime();
	},100);
})
function createTime() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
	var timeZone = currentTime.toString().split("(");
	timeZone = timeZone[1].split(")");
  return currentHours + ":" + currentMinutes+"("+timeZone[0]+")";
}

function closeSearch() {
	$("#search-result").addClass("slideOutLeft");
	$("#incident-details").addClass("widthfull");
	setTimeout(function(){
		$("#search-result").addClass("er-display-none");
		$("#search-result").removeClass("slideOutLeft");
		$("#open-search").addClass("er-display-block");
	},300)
}

function openSearch() {
	$("#incident-details").removeClass("widthfull");
	$("#search-result").addClass("slideInLeft");
	$("#search-result").removeClass("er-display-none");
	setTimeout(function(){
		$("#search-result").removeClass("slideInLeft");
		$("#open-search").removeClass("er-display-block");
	},300)
}
