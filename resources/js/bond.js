/*
 * Bond.js.
 * Records all user events on a web page and plays them back exactly as they occurred to simulate live actions.
 * Intended as a warning of what companies can track on the web -- your data will not be collected or sold.
 * 
 * Copyright (c) 2014 Jack Stone.
 * 
 * Released under the MIT license.
 * http://opensource.org/licenses/MIT
 */

// Array of events that stores the time and type of every DOM event, the target element, the target value (if applicable), and the mouse and scrollbar position at that time.
var events = [];

// Mouse coordinates.  Constantly updated via the mousemove event.
var mouseX = 0;
var mouseY = 0;

// The time, in milliseconds, that the page was first accessed.
var time = new Date();
time = time.getTime();

// Flag variable used after replay is finished to avoid showing user events, etc., multiple times.
var canUpdate = true;

/* 
 * Binding of DOM events.  As an event is fired, it is inserted into a master array of user events via the updateEvents() function.
 * 
 * Checks if the event is coming from a human first to avoid accidental updates of the array.
 */

if (canUpdate)
{
	$(document).change(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("change", event.target, ($(event.target).val() == null ? "" : $(event.target).val()));
	
	});
	
	$(document).keyup(function(event) {
	
	    if (event.originalEvent !== undefined)
	       updateEvents("keyup", event.target, ($(event.target).val() == null ? "" : $(event.target).val()));
	
		// If we're working with the search box then search Flickr.
		if ($(event.target).is("#search"))
		{
			$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
			    tags: $(event.target).val(),
			    tagmode: "any",
			    format: "json"
			}, function(data) {
				$("#output").html("");
			    $.each(data.items, function (i, item) {
			        $("#output").append("<img src=\"" + item.media.m + "\"/>");
			    });
			});		
		}
	
	});
	
	$(document).blur(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("blur", event.target, "");
	
	});
	
	$(document).focus(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("focus", event.target, "");
	
	});
	
	$(document).focusin(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("focusin", event.target, "");
	
	});
	
	$(document).focusout(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("focusout", event.target, "");
	
	});
	
	$(document).load(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("load", event.target, "");
	
	});
	
	$(document).resize(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("resize", event.target, "");
	
	});
	
	$(document).scroll(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("scroll", event.target, "");
	
	});
	
	$(document).unload(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("unload", event.target, "");
	
	});
	
	$(document).click(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("click", event.target, "");
	
	});
	
	$(document).dblclick(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("dblclick", event.target, "");
	
	});
	
	$(document).mousedown(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("mousedown", event.target, "");
	
	});
	
	$(document).mouseup(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("mouseup", event.target, "");
	
	});
	
	$(document).mousemove(function(event) {
		
		if (event.originalEvent !== undefined)
		{
			updateEvents("mousemove", event.target, "");
			// Constantly get mouse coordinates for use in the array of events.
			mouseX = event.pageX;
	        mouseY = event.pageY;
		}
	
	});
	
	$(document).mouseover(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("mouseover", event.target, "");
	
	});
	
	$(document).mouseout(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("mouseout", event.target, "");
	
	});
	
	$(document).mouseenter(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("mouseenter", event.target, "");
	            
	});
	
	$(document).mouseleave(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("mouseleave", event.target, "");
	
	});
	
	$(document).select(function(event) {
	    
	    if (event.originalEvent !== undefined)
	        updateEvents("select", event.target, "");
	
	});
	
	$(document).submit(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("submit", event.target, "");
		
	});
	
	$(document).error(function(event) {
		
		if (event.originalEvent !== undefined)
			updateEvents("error", event.target, "");
		
	});
}

/*
 * Updates an array of events as DOM events occur.
 * 
 * Each entry has the time and type of each event, the target element, 
 * the target value (if applicable), and the mouse and scrollbar position at that time.
 */

function updateEvents(targetEvent, targetElement, targetValue)
{
    if (canUpdate)
    {  
       // Get the time, in milliseconds, that the event was fired in user history.
       var currentTime = new Date();
       currentTime = currentTime.getTime() - time;
       
       // Push the event       
       events.push({time:currentTime, targetEvent:targetEvent, targetElement:targetElement, targetValue:targetValue, mouseX:mouseX, mouseY:mouseY, scrollY:scrollY});
    }
}

$(document).ready(function() {
	
	// Set OS-specific mouse type.
	if (navigator.platform.toUpperCase().indexOf("MAC") != -1)
		$("#mouse").css({backgroundImage:"url(\"http://jackstonedev.com/portfolio/bond/resources/images/macmouse.png\")", height:21});
	else $("#mouse").css({backgroundImage:"url(\"http://jackstonedev.com/portfolio/bond/resources/images/pcmouse.png\")", height:23});
	
	// Hide the dialog and mouse, which will be shown during the replay.
    $("#dialog, #mouse").hide();
    
    // Save the starting state of the page for later restoration during replay.
    // This is not completely indicative of the original page state, but does save values of elements.
    $("body *").each(function() {
    	    	
    	if ($(this).is("input:text, input:password, textarea, select"))
    		$(this).data("val", $(this).val());
    	else if ($(this).is("input:checkbox"))
    		$(this).data("checked", $(this).prop("checked"));
    	    	
    });
    
	// Implementation of Flickr search to show how user events can be monitored.
	$("#search").keyup(function() {

		// Abort AJAX requests.
		$.ajaxQ.abortAll();
		
		$("#output").html("<h2>Loading...</h2>");
		
		$.get("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
		    tags: $(this).val(),
		    tagmode: "any",
		    format: "json"
		}, function(data) {
			
			$("#output").html("");
			
		    $.each(data.items, function (i, item) {
		        $("#output").append("<img src=\"" + item.media.m + "\"/>");
		    });
		    
		});		
		
	});
	
    $("#replay").click(function() {
        
        if (canUpdate)
        {
       		// Nice little animation for the dialog.
	        $("#dialog").show().animate({top:0}, 500);
        	   
        	// Update the dialog every 10 ms for how long the user was on the page during replay.        	
        	temp = 0;
        	        	
        	window.setInterval(function() {
        		
        		if (canUpdate)
        		{
        			// Increment the time by .01 for a stopwatch effect.
        			temp += .01;
        			$("#seconds").html(temp.toFixed(2));
        			// Pulsate animation.
        			$("#dialog").animate({opacity:0.2}, 1200, "linear").animate({opacity:1.0}, 1200, "linear");
        		}
        		else {
        			// Clear the animation queue to stop extra pulsating.
        			$("#dialog").clearQueue();
        			// Return original opacity of dialog.
        			$("#dialog").animate({opacity:1.0}, 200, "linear");
        		}
        		
        	}, 10);
        		        	
        	// Show the "mouse."        
	        $("#mouse").show();
	
	        // Restore the original state of the page (more or less).
	        $("body *").each(function() {
	        		        	
	        	if ($(this).data("val") !== undefined)
	        		$(this).val($(this).data("val"));
	        	else if ($(this).data("checked") !== undefined)
	        		$(this).prop("checked", $(this).data("checked"));
	        	
	        });
	        
			// Restore the output div.
			// This is extremely localized and is not good design.
			// However, restoring the original HTML changes object IDs, meaning events can not be replicated on the same objects.
			$("#output").html("");	
			                       
	        // Iterate through the array of events and perform timed actions.
	        $.each(events, function() {  
	            
	    		window.setTimeout(action, this.time, this);
	                        
	        });
	                        
	        // Cancel all updates and set a timed self-destruct of the array of events.
	        window.setTimeout(function() {
	
	        	canUpdate = false; 
	            events = [];
	
	        }, events[events.length - 1].time + 1);
	    }
        
    });
    
});

/*
 * Aborts all AJAX requests.
 * Used in the Flickr search to prevent delayed results.
 */

$.ajaxQ = (function() {
           
	var id = 0, Q = {};

  	$(document).ajaxSend(function(e, jqx) {
    	jqx._id = ++id;
    	Q[jqx._id] = jqx;
  	});
  	
  	$(document).ajaxComplete(function(e, jqx) {
    	delete Q[jqx._id];
  	});

  	return {
    	abortAll: function() {
      		var r = [];
      		
      		$.each(Q, function(i, jqx) {
        		r.push(jqx._id);
        		jqx.abort();
      		});
      		
      		return r;
    	}
  	};

})();

/* 
 * Action function.  Takes an individual entry in the array of events and performs its target action.
 * 
 * It is called at specific times based on when in user history a certain DOM event was fired.
 */

function action(object)
{    
	// "Move" the mouse and scrollbar just like the user did.
	$("#mouse").animate({left:object.mouseX, top:object.mouseY}, 0);
    $("html, body").animate({scrollTop:object.scrollY}, 0);

	// Get information about the element from the array.		
	var targetEvent = object.targetEvent;
	var targetElement = object.targetElement;
	var targetValue = object.targetValue;		
					
	// Make sure that nothing is undefined.
	if (targetEvent !== undefined && targetElement !== undefined && targetValue !== undefined)
	{    	    	
        // Decide which event to trigger.
        if (targetEvent == "change")
        {
        	// Change the value of the element if possible.
        	if (targetValue !== null)
        		$(targetElement).val(targetValue);
        		
            $(targetElement).change();
        }
        else if (targetEvent == "keyup")
        {
            // Simulate live typing.
            $(targetElement).val(targetValue);
            // Retain cursor position and user viewpoint in text fields and textareas.
            var length = $(targetElement).val().length;
            targetElement.setSelectionRange(length, length);
            targetElement.scrollLeft = targetElement.scrollWidth;
            targetElement.scrollTop = targetElement.scrollHeight;
            
            $(targetElement).keyup();
        }
        else if (targetEvent == "blur")
            $(targetElement).blur();
        else if (targetEvent == "focus")
            $(targetElement).focus();
        else if (targetEvent == "focusin")
        	$(targetElement).focusin();
       	else if (targetEvent == "focusout")
       		$(targetElement).focusout();
        else if (targetEvent == "click")
            $(targetElement).click();
        else if (targetEvent == "dblclick")
            $(targetElement).dblclick();
        else if (targetEvent == "mouseover")
            $(targetElement).mouseover();
        else if (targetEvent == "mouseout")
            $(targetElement).mouseout();
        else if (targetEvent == "mouseenter")
            $(targetElement).mouseenter();
        else if (targetEvent == "mouseleave")
            $(targetElement).mouseleave();
        else if (targetEvent == "select")
            $(targetElement).select();
        else if (targetEvent == "load")
            $(targetElement).load();
        else if (targetEvent == "resize")
            $(targetElement).resize();
        else if (targetEvent == "scroll")
            $(targetElement).scroll();
        else if (targetEvent == "unload")
            $(targetElement).unload();
        else if (targetEvent == "mousedown")
            $(targetElement).mousedown();
        else if (targetEvent == "mouseup")
            $(targetElement).mouseup();
        else if (targetEvent == "submit")
            $(targetElement).submit();
        else if (targetEvent == "error")
            $(targetElement).error();
	}
}
