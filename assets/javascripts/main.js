---
---

/*!
 * Basically Basic Jekyll Theme 1.4.1
 * Copyright 2017-2018 Michael Rose - mademistakes | @mmistakes
 * Free for personal and commercial use under the MIT license
 * https://github.com/mmistakes/jekyll-basically-theme/blob/master/LICENSE.md
*/

var menuItems = document.querySelectorAll('#sidebar li');

// Get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';

// Animate sidebar menu items
function animateMenuItems() {
  for (var i = 0; i < menuItems.length; i++) {
    var item = menuItems[i];
    // Stagger transition with transitionDelay
    item.style[transitionProp + 'Delay'] = (i * 75) + 'ms';
    item.classList.toggle('is--moved');
  }
};

var myWrapper = document.querySelector('.wrapper');
var myMenu = document.querySelector('.sidebar');
var myToggle = document.querySelector('.toggle');
var myInitialContent = document.querySelector('.initial-content');
var mySearchContent = document.querySelector('.search-content');
var mySearchToggle = document.querySelector('.search-toggle');

// Toggle sidebar visibility
function toggleClassMenu() {
  myMenu.classList.add('is--animatable');
  if (!myMenu.classList.contains('is--visible')) {
    myMenu.classList.add('is--visible');
    myToggle.classList.add('open');
    myWrapper.classList.add('is--pushed');
  } else {
    myMenu.classList.remove('is--visible');
    myToggle.classList.remove('open');
    myWrapper.classList.remove('is--pushed');
  }
}

// Animation smoother
function OnTransitionEnd() {
  myMenu.classList.remove('is--animatable');
}

myMenu.addEventListener('transitionend', OnTransitionEnd, false);
myToggle.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
myMenu.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
if (mySearchToggle) {
  mySearchToggle.addEventListener('click', function () {
    toggleClassSearch();
  }, false);
}

// Toggle search input and content visibility
function toggleClassSearch() {
  mySearchContent.classList.toggle('is--visible');
  myInitialContent.classList.toggle('is--hidden');
  setTimeout(function () {
    document.querySelector('.search-content input').focus();
  }, 400);
}






/**
* PAGE SCROLLING
* Plain JavaScript internal anchor and top-of-page scrolling, no jQuery required
*/

// shows the scroll-to-top button after scrolling down 200px
window.onscroll = function () {
  if (window.pageYOffset >= 200) {
    document.getElementById('scroll-to-top').style.opacity = "1";
  } else {
    document.getElementById('scroll-to-top').style.opacity = "0";
  }
};


// handles scrolling to internal anchors and top of page

/*jshint devel:true, asi:true */

/*global define, module */


(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory());
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    (function install() {
      // To make sure smoothScrolling can be referenced from the header, before `body` is available
      if (document && document.body) {
        root.smoothScrolling = factory();
      } else {
        // retry 9ms later
        setTimeout(install, 9);
      }
    })();
  }
}(this, function () {
  "use strict";


  // Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
  var isNativeSmoothScrollEnabledOn = function (elem) {
    return ("getComputedStyle" in window) &&
      window.getComputedStyle(elem)["scroll-behavior"] === "smooth";
  };


  // Exit if it’s not a browser environment:
  if (typeof window === "undefined" || !("document" in window)) {
    return {};
  }


  var makeScroller = function (container, defaultDuration, edgeOffset) {

    // Use defaults if not provided
    defaultDuration = defaultDuration || 999; //ms
    if (!edgeOffset && edgeOffset !== 0) {
      // When scrolling, this amount of distance is kept from the edges of the container:
      edgeOffset = 1; //px
    }

    // Handling the life-cycle of the scroller
    var scrollTimeoutId;
    var setScrollTimeoutId = function (newValue) {
      scrollTimeoutId = newValue;
    };

    /**
     * Stop the current smooth scroll operation immediately
     */
    var stopScroll = function () {
      clearTimeout(scrollTimeoutId);
      setScrollTimeoutId(0);
    };

    var getTopWithEdgeOffset = function (elem) {
      return Math.max(0, container.getTopOf(elem) - edgeOffset);
    };

    /**
     * Scrolls to a specific vertical position in the document.
     *
     * @param {targetY} The vertical position within the document.
     * @param {duration} Optionally the duration of the scroll operation.
     *        If not provided the default duration is used.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollToY = function (targetY, duration, onDone) {
      stopScroll();
      if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
        container.toY(targetY);
        if (onDone) {
          onDone();
        }
      } else {
        var startY = container.getY();
        var distance = Math.max(0, targetY) - startY;
        var startTime = new Date().getTime();
        duration = duration || Math.min(Math.abs(distance), defaultDuration);
        (function loopScroll() {
          setScrollTimeoutId(setTimeout(function () {
            // Calculate percentage:
            var p = Math.min(1, (new Date().getTime() - startTime) / duration);
            // Calculate the absolute vertical position:
            var y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)));
            container.toY(y);
            if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
              loopScroll();
            } else {
              setTimeout(stopScroll, 99); // with cooldown time
              if (onDone) {
                onDone();
              }
            }
          }, 9));
        })();
      }
    };

    /**
     * Scrolls to the top of a specific element.
     *
     * @param {elem} The element to scroll to.
     * @param {duration} Optionally the duration of the scroll operation.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollToElem = function (elem, duration, onDone) {
      scrollToY(getTopWithEdgeOffset(elem), duration, onDone);
    };

    /**
     * Scrolls an element into view if necessary.
     *
     * @param {elem} The element.
     * @param {duration} Optionally the duration of the scroll operation.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollIntoView = function (elem, duration, onDone) {
      var elemHeight = elem.getBoundingClientRect().height;
      var elemBottom = container.getTopOf(elem) + elemHeight;
      var containerHeight = container.getHeight();
      var y = container.getY();
      var containerBottom = y + containerHeight;
      if (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
        // Element is clipped at top or is higher than screen.
        scrollToElem(elem, duration, onDone);
      } else if ((elemBottom + edgeOffset) > containerBottom) {
        // Element is clipped at the bottom.
        scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone);
      } else if (onDone) {
        onDone();
      }
    };

    /**
     * Scrolls to the center of an element.
     *
     * @param {elem} The element.
     * @param {duration} Optionally the duration of the scroll operation.
     * @param {offset} Optionally the offset of the top of the element from the center of the screen.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollToCenterOf = function (elem, duration, offset, onDone) {
      scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight()/2 + (offset || elem.getBoundingClientRect().height/2)), duration, onDone);
    };

    /**
     * Changes default settings for this scroller.
     *
     * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.
     *        Ignored if null or undefined.
     * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.
     * @returns An object with the current values.
     */
    var setup = function (newDefaultDuration, newEdgeOffset) {
      if (newDefaultDuration === 0 || newDefaultDuration) {
        defaultDuration = newDefaultDuration;
      }
      if (newEdgeOffset === 0 || newEdgeOffset) {
        edgeOffset = newEdgeOffset;
      }
      return {
        defaultDuration: defaultDuration,
        edgeOffset: edgeOffset
      };
    };

    return {
      setup: setup,
      to: scrollToElem,
      toY: scrollToY,
      intoView: scrollIntoView,
      center: scrollToCenterOf,
      stop: stopScroll,
      moving: function () { return !!scrollTimeoutId; },
      getY: container.getY,
      getTopOf: container.getTopOf
    };

  };


  var docElem = document.documentElement;
  var getDocY = function () { return window.scrollY || docElem.scrollTop; };

  // Create a scroller for the document:
  var smoothScrolling = makeScroller({
    body: document.scrollingElement || document.body,
    toY: function (y) { window.scrollTo(0, y); },
    getY: getDocY,
    getHeight: function () { return window.innerHeight || docElem.clientHeight; },
    getTopOf: function (elem) { return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop; }
  });


  /**
   * Creates a scroller from the provided container element (e.g., a DIV)
   *
   * @param {scrollContainer} The vertical position within the document.
   * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.
   *        Ignored if 0 or null or undefined.
   * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. 
   *        Ignored if null or undefined.
   * @returns A scroller object, similar to `smoothScrolling` but controlling the provided element.
   */
  smoothScrolling.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {
    return makeScroller({
      body: scrollContainer,
      toY: function (y) { scrollContainer.scrollTop = y; },
      getY: function () { return scrollContainer.scrollTop; },
      getHeight: function () { return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight); },
      getTopOf: function (elem) { return elem.offsetTop; }
    }, defaultDuration, edgeOffset);
  };


  // Automatic link-smoothing on achors
  // Exclude IE8- or when native is enabled or smoothScrolling auto- is disabled
  if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {


    var isScrollRestorationSupported = "scrollRestoration" in history;

    // On first load & refresh make sure the browser restores the position first
    if (isScrollRestorationSupported) {
      history.scrollRestoration = "auto";
    }

    window.addEventListener("load", function () {

      if (isScrollRestorationSupported) {
        // Set it to manual
        setTimeout(function () { history.scrollRestoration = "manual"; }, 9);
        window.addEventListener("popstate", function (event) {
          if (event.state && "smoothScrollingY" in event.state) {
            smoothScrolling.toY(event.state.smoothScrollingY);
          }
        }, false);
      }

      // Add edge offset on first load if necessary
      // This may not work on IE (or older computer?) as it requires more timeout, around 100 ms
      if (window.location.hash) {
        setTimeout(function () {
          // Adjustment is only needed if there is an edge offset:
          var edgeOffset = smoothScrolling.setup().edgeOffset;
          if (edgeOffset) {
            var targetElem = document.getElementById(window.location.href.split("#")[1]);
            if (targetElem) {
              var targetY = Math.max(0, smoothScrolling.getTopOf(targetElem) - edgeOffset);
              var diff = smoothScrolling.getY() - targetY;
              // Only do the adjustment if the browser is very close to the element:
              if (0 <= diff && diff < 9 ) {
                window.scrollTo(0, targetY);
              }
            }
          }
        }, 9);
      }

    }, false);

    // Handling clicks on anchors
    var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)");
    window.addEventListener("click", function (event) {
      var anchor = event.target;
      while (anchor && anchor.tagName !== "A") {
        anchor = anchor.parentNode;
      }
      // Let the browser handle the click if it wasn't with the primary button, or with some modifier keys:
      if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      // Save the current scrolling position so it can be used for scroll restoration:
      if (isScrollRestorationSupported) {
        try {
          history.replaceState({ smoothScrollingY: smoothScrolling.getY() }, "");
        } catch (e) {
          // Avoid the Chrome Security exception on file protocol, e.g., file://index.html
        }
      }
      // Find the referenced ID:
      var href = anchor.getAttribute("href") || "";
      if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
        var targetY = 0;
        var targetElem = document.getElementById(href.substring(1));
        if (href !== "#") {
          if (!targetElem) {
            // Let the browser handle the click if the target ID is not found.
            return;
          }
          targetY = smoothScrolling.getTopOf(targetElem);
        }
        event.preventDefault();
        // By default trigger the browser's `hashchange` event...
        var onDone = function () { window.location = href; };
        // ...unless there is an edge offset specified
        var edgeOffset = smoothScrolling.setup().edgeOffset;
        if (edgeOffset) {
          targetY = Math.max(0, targetY - edgeOffset);
          onDone = function () { history.pushState(null, "", href); };
        }
        smoothScrolling.toY(targetY, null, onDone);
      }
    }, false);

  }


  return smoothScrolling;


}));
