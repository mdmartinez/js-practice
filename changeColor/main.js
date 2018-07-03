// Fires encompassing functions when all of the DOM has loaded
document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector('button'),
  lis = document.querySelectorAll('.menu li');

  // Showcases "Be Gentle" text when hover over button
  button.addEventListener("mouseenter", function() {
    return button.textContent = "Be gentle!";
  });

  // Button text changes back to original when mouse leaves it
  button.addEventListener("mouseleave", function() {
    return button.textContent = "New Color!";
  });

  // Function to provide random color hex
  function randomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
  }

  button.addEventListener("mousedown", function() {
    // Changes the background color when button is pressed
    document.body.style.backgroundColor = randomColor();

    // Changes text on button
    let randomResponse = ["Good job!", "You're awesome!", "Keep going!", "Fancy!"];
    button.textContent = randomResponse[Math.floor(Math.random()*4)];
  });

  // Removes links in top nav upon being clicked
  // const linkList = Array.from(document.querySelectorAll('.menu li a'));
  // linkList.map(link => link.addEventListener('click',
  //   function(a) {
  //     let parent = a.target.parentElement.parentElement;
  //     parent.removeChild(a.target.parentElement);
  //   }));

  // Iteration of the commented one above (event listener on ul instead li)
  const menu = document.querySelector('.menu');
  menu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      const li = e.target.parentElement;
      menu.removeChild(li);
    }
  });
});
