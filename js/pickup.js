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

document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters
  var urlParams = new URLSearchParams(window.location.search);
  var firstName = urlParams.get('f');
  var lastName = urlParams.get('l');
  var name = urlParams.get('n');
  var comment = urlParams.get('c');
  if (name) {
    var nameParts = name.split(' ');
    firstName = nameParts[0];
    lastName = nameParts.slice(1).join(' ');
  }

  // Update editable fields if at least one URL parameter is given
  if (firstName || lastName || comment) {
    document.getElementById('firstname').textContent = firstName ? firstName : '';
    document.getElementById('lastname').textContent = lastName ? lastName : '';
    document.getElementById('comment').textContent = comment ? comment : '';
  }

  adjustFontSize();

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


// Full screen button

document.addEventListener("DOMContentLoaded", function() {
  if (document.fullscreenEnabled) {
    const fullscreen_button = document.createElement("button");
    fullscreen_button.setAttribute('id','fullscreen-button');
    fullscreen_button.addEventListener("click", toggle_fullscreen);
    fullscreen_button.innerHTML  = `
        <svg viewBox="0 0 24 24">
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 
            11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        </svg>
        <svg viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 
            7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>

    `;
    document.body.appendChild(fullscreen_button);
  }

  function toggle_fullscreen() {
    if (!document.fullscreenElement) {
        document.body.requestFullscreen();
        document.body.setAttribute("fullscreen",""); 
    } else {
        document.exitFullscreen();
        document.body.removeAttribute("fullscreen"); 
    }
  } 
});

/*
 * Install button
 */

document.addEventListener('DOMContentLoaded', (event) => {
  let deferredPrompt;

  const installButton = document.getElementById('installButton');
  installButton.disabled = true;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
    installButton.disabled = false;
  });

  installButton.addEventListener('click', (e) => {
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
