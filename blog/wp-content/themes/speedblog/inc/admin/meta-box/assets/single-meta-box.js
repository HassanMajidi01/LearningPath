!(function ($) {
  var speedblogPostMeta = speedblogPostMeta || {};

  speedblogPostMeta.overridePostMeta = function () {
    // Meta Override.
    let isPostMetaOverridden = document.getElementById(
      "speedblog-override-post-metas"
    );
    let postMetasWrapperDiv = document.querySelector(
      ".speedblog-available-post-metas"
    );
    if (isPostMetaOverridden) {
      isPostMetaOverridden.addEventListener("click", function (event) {
        if (true === event.target.checked) {
          postMetasWrapperDiv.style.display = "block";
        } else {
          postMetasWrapperDiv.style.display = "none";
        }
      });
    }
  };

  speedblogPostMeta.tabs = function () {
    // Tabs.
    let postMetaWrapper = document.querySelector(".interface-meta-wrapper");
    if (postMetaWrapper) {
      var tabLinks = document.querySelectorAll(
        ".interface-meta-header .interface-meta-label"
      );
      var tabContents = document.querySelectorAll(
        ".interface-meta-content .interface-meta-details"
      );

      tabLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          // Remove active class from all tab links
          tabLinks.forEach(function (tabLink) {
            tabLink.classList.remove("is-active");
          });

          // Add active class to the clicked tab link
          this.classList.add("is-active");

          // Hide all tab contents
          tabContents.forEach(function (content) {
            content.classList.remove("is-active");
          });

          // Show the corresponding tab content
          var tabId = "speedblog-tab-" + this.getAttribute("data-tab");
          document.getElementById(tabId).classList.add("is-active");
        });
      });
    }
  };

  $(document).ready(function ($) {
    speedblogPostMeta.overridePostMeta();
    speedblogPostMeta.tabs();
  });
})(jQuery);
