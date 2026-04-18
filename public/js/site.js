(() => {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenuPanel = document.getElementById("mobileMenuPanel");

  const bagBtn = document.getElementById("bagBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");

  function setHidden(el, hidden) {
    if (!el) return;
    el.hidden = hidden;
  }

  function closeMobileMenu() {
    if (!mobileMenuPanel || !burgerBtn) return;
    setHidden(mobileMenuPanel, true);
    burgerBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    if (!mobileMenuPanel || !burgerBtn) return;
    const isOpen = !mobileMenuPanel.hidden;
    setHidden(mobileMenuPanel, isOpen);
    burgerBtn.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) closeCart();
  }

  function openCart() {
    if (!cartDrawer || !overlay || !bagBtn) return;
    setHidden(cartDrawer, false);
    setHidden(overlay, false);
    bagBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    closeMobileMenu();
  }

  function closeCart() {
    if (!cartDrawer || !overlay || !bagBtn) return;
    setHidden(cartDrawer, true);
    setHidden(overlay, true);
    bagBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  burgerBtn?.addEventListener("click", toggleMobileMenu);

  bagBtn?.addEventListener("click", () => {
    if (!cartDrawer) return;
    const isOpen = !cartDrawer.hidden;
    if (isOpen) closeCart();
    else openCart();
  });

  closeDrawerBtn?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (cartDrawer && !cartDrawer.hidden) closeCart();
    if (mobileMenuPanel && !mobileMenuPanel.hidden) closeMobileMenu();
  });
})();
