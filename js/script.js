document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       ELEMENT
    =============================== */

    const body = document.body;
    const navbar = document.querySelector(".navbar");

    const menuToggle = document.getElementById("menu-toggle");
    const navWrapper = document.getElementById("nav-wrapper");

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    const navLinks = document.querySelectorAll(".nav-link");


    /* ===============================
       DARK / LIGHT MODE
    =============================== */

    const savedTheme = localStorage.getItem("nadaa-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    function updateThemeIcon() {

        if (body.classList.contains("dark-mode")) {
            themeIcon.textContent = "☀";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        } else {
            themeIcon.textContent = "☾";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }

    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const isDark =
                body.classList.contains("dark-mode");

            localStorage.setItem(
                "nadaa-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    /* ===============================
       MOBILE MENU
    =============================== */

    if (menuToggle && navWrapper) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            navWrapper.classList.toggle("active");

            const isOpen =
                navWrapper.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });

    }


    /* ===============================
       CLOSE MENU WHEN CLICK LINK
    =============================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navWrapper) {
                navWrapper.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });

    });


    /* ===============================
       CLOSE MENU WHEN CLICK OUTSIDE
    =============================== */

    document.addEventListener("click", (event) => {

        if (
            navWrapper &&
            menuToggle &&
            !navWrapper.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navWrapper.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* ===============================
       ESCAPE CLOSE MENU
    =============================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navWrapper) {
                navWrapper.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }

    });


    /* ===============================
       NAVBAR SCROLL
    =============================== */

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );

    handleNavbarScroll();


    /* ===============================
       SMOOTH NAVIGATION
    =============================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight + 25 : 25;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ===============================
       ACTIVE NAVIGATION
    =============================== */

    const sections =
        document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* ===============================
       SCROLL REVEAL
    =============================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-image"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* ===============================
       CURRENT YEAR
    =============================== */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });

});