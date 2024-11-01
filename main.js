//Code from:
//https://css-tricks.com/snippets/jquery/smooth-scrolling/

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

const container = document.querySelector('.head-container');
const textNode = document.querySelector('.text');
const textNodeValue = textNode.innerText;

const breakIntoWordArr = (phrase) => {
   return phrase.split(' ');
}

const breakWordIntoLetterArr = (word) => {
  return word.split('');
}

const wordArr = breakIntoWordArr(textNodeValue);

const newWordContainer = document.createElement('div');
let delayIndex = 0;
wordArr.forEach((word, i, wordArr) => {
  const letterArr = breakWordIntoLetterArr(word);

  letterArr.forEach((letter, j, letterArr) => {
    const newSpan = document.createElement('span');
    const letterContent = document.createTextNode(letter);
    newSpan.appendChild(letterContent);
    newSpan.classList.add("letter");
    newSpan.style.setProperty('--gliss-delay', `${delayIndex * 0.1}s`);
    delayIndex++;
    newWordContainer.appendChild(newSpan);
    
    if(j === letterArr.length - 1 && i !== wordArr.length - 1) {
      const newSpaceSpan = document.createElement('span');
      newSpaceSpan.appendChild(document.createTextNode(' '));
      newWordContainer.appendChild(newSpaceSpan);
    } 
  })
})

textNode.replaceWith(newWordContainer);