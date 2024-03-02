function adjustFontSize() {
    var display = document.getElementById('display');
    var lines = display.getElementsByClassName('name');
    var maxWidth = display.getBoundingClientRect().width;

    // Create a canvas context to measure the text width
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // Start with a reasonable guess at the font size
    var fontSize = 20; 
    var maxFontSize = window.innerHeight / 4;

    // Increase the font size until the widest line is as wide as the display
    var widestLineWidth;
    do {
      fontSize++;
      widestLineWidth = 0;
      for (var i = 0; i < lines.length; i++) {
        context.font = fontSize + 'px sans-serif'; // Adjust the font family if necessary
        var lineWidth = context.measureText(lines[i].textContent).width;
        if (lineWidth > widestLineWidth) {
          widestLineWidth = lineWidth;
        }
      }
    } while (widestLineWidth < maxWidth && fontSize < maxFontSize); // Added a limit to fontSize to prevent infinite loop

    // The widest line is now too wide, so decrease the font size by one step
    fontSize--;
    for (var i = 0; i < lines.length; i++) {
      lines[i].style.fontSize = fontSize + 'px';
    }
}

// Call the adjustFontSize() when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', adjustFontSize);


document.addEventListener('DOMContentLoaded', function() {
  var display = document.getElementById('display');

  var hideForm = function(event) {
    if (event.target.tagName === 'INPUT') {
      return; // Ignore the event if the clicked element is an input field
    }

    var inputs = Array.from(display.getElementsByTagName('input'));
  
    for (var i = 0; i < inputs.length; i++) {
      var span = inputs[i].parentNode;
      var text = inputs[i].value;
      span.removeChild(inputs[i]);
      // Reset the font-size style
      span.style.fontSize = '';
      span.textContent = text;
    }
  
    adjustFontSize();
    display.removeEventListener('click', hideForm);
    display.addEventListener('click', displayClickListener);
  };

  var displayClickListener = function(event) {
    if (event.target.classList.contains('editable')) {
      var editables = Array.from(display.getElementsByClassName('editable'));

      for (var i = 0; i < editables.length; i++) {
        var input = document.createElement('input');
        input.type = 'text';
        input.value = editables[i].textContent;
        if (i === editables.length - 1) { // If it's the last input field
          input.addEventListener('blur', hideForm); // Listen for the blur event
          // Intercept the Tab key
          input.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
              e.preventDefault();
              // Move focus to the first input field
              if (editables[0].firstChild) {
                editables[0].firstChild.focus();
              }
            }
          });
        }
        // Replace the content of the container
        editables[i].textContent = '';
        editables[i].appendChild(input);

        requestAnimationFrame(adjustFontSize);

        // If it's the first input field, set the focus to it
        if (i === 0) {
          input.focus();
        }
      }
      display.removeEventListener('click', displayClickListener);
      display.addEventListener('click', hideForm);
    }
  };

  // Le reste de votre code va ici...
  display.addEventListener('click', displayClickListener);
});
