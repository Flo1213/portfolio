"use strict";
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".navigation");
const headerList = document.querySelector(".header__list");
const headerLinks = nav.querySelectorAll(".header__link");
const headerHeight = header.getBoundingClientRect().height;
const allSections = document.querySelectorAll(".section");

// Navigation animation
const handleNavHover = function (e, opacity) {
  if (e.target.classList.contains("header__link")) {
    const link = e.target;
    headerLinks.forEach((headerLink) => {
      if (link !== headerLink) {
        headerLink.style.opacity = `${opacity}`;
      }
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  handleNavHover(e, 0.3);
});

nav.addEventListener("mouseout", function (e) {
  handleNavHover(e, 1);
});

// Scroll to section
headerLinks.forEach((nav) =>
  nav.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    console.log(id);

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  })
);

// Sticky Navigation

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

headerObserver.observe(hero);

// Reveal Section
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});
