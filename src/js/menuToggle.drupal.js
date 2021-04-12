// @file isJSEnabled.drupal.js

(({ behaviors }) => {
  behaviors.menuToggle = {
    attach(context) {
      const $body = document.querySelector('body');
      const $mainNavigation = document.querySelector('.js-main-navigation');
      const $menuOpenButton = document.querySelector('.js-menu-main-open');
      const $menuCloseButton = document.querySelector('.js-menu-main-close');
      const $submenuToggleButton = document.querySelectorAll('.js-submenu-toggle');

      // Handle menu open.
      $menuOpenButton.addEventListener('click', () => {

        // Show menu.
        $mainNavigation.classList.remove('opacity-0', 'invisible');

        // Scale it up.
        $mainNavigation.classList.add('scale-100');

        // Fix body when navigation is opened.
        $body.classList.add('fixed');

        // Indicate that menu is opened (SR users.
        $menuOpenButton.setAttribute('aria-expanded', 'true');
      });

      // Handle menu close.
      $menuCloseButton.addEventListener('click', () => {
        // Hide menu.
        $mainNavigation.classList.add('opacity-0', 'invisible');

        // Scale it down.
        $mainNavigation.classList.remove('scale-100');

        // Unfix body.
        $body.classList.remove('fixed');

        // Indicate that menu is closed (SR users.
        $menuOpenButton.setAttribute('aria-expanded', 'false');
      });

      // Handles sub menu toggle functionality.
      $submenuToggleButton.forEach((item) => {
        item.addEventListener('click', (e) => {
          const target = e.target;
          const parent = e.target.parentNode.closest('li');
          const subMenu = parent.querySelector('.js-submenu');
          const icon = target.querySelector('svg');

          const maxSubMenuWidth = 256;
          const lgBreakPoint = '(min-width: 1024px)';
          const bodyOffset = $body.getBoundingClientRect();
          const parentOffset = parent.getBoundingClientRect();

          // Menu toggle accessibility states.
          target.getAttribute('aria-expanded') === 'true'
            ? target.setAttribute('aria-expanded', 'false')
            : target.setAttribute('aria-expanded', 'true');

          console.log(window.matchMedia(lgBreakPoint).matches);

          if (window.matchMedia(lgBreakPoint).matches) {
            // Rotate icon.
            icon.classList.toggle('lg:-rotate-90');

            // Position sub menu correctly depending on available space to the right.
            bodyOffset.right - (parentOffset.right - parentOffset.width) > maxSubMenuWidth
              ? subMenu.classList.toggle('lg:left-0')
              : subMenu.classList.toggle('lg:right-0');
          } else {
            // Rotate icon.
            icon.classList.toggle('rotate-90');

            // Highlight parent.
            parent.classList.toggle('bg-gray-100');
            target.classList.toggle('bg-gray-200');
          }

          // Show hide sub menu.
          subMenu.classList.toggle('hidden');
        });
      });
    }
  };
})(Drupal);
