function adjustFontSize() {
    var display = document.getElementById('display');
    var lines = display.getElementsByClassName('name');
    var maxWidth = display.getBoundingClientRect().width;

    // Create a canvas context to measure the text width
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // Start with a reasonable guess at the font size
    var fontSize = 20; 

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
    } while (widestLineWidth < maxWidth && fontSize < 300); // Added a limit to fontSize to prevent infinite loop

    // The widest line is now too wide, so decrease the font size by one step
    fontSize--;
    for (var i = 0; i < lines.length; i++) {
      lines[i].style.fontSize = fontSize + 'px';
    }
}

// Call the adjustFontSize() when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', adjustFontSize);
