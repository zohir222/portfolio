
window.removeCursor = () => {
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        setTimeout(() => {
            typewriter.style.borderRight = 'none'; // Remove the blinking cursor
            console.log("Cursor removed");
        }, 3000); // Match the duration of the typing animation
    } else {
        console.error("Typewriter element not found");
    }
};

window.addOutsideClickListener = (menuId, dotNetHelper) => {
    document.addEventListener('click', function (event) {
        const menu = document.getElementById(menuId);
        const menuIcon = document.querySelector('nav > span.icon');
        if (menu && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
            console.log("lplp");
            dotNetHelper.invokeMethodAsync('CloseMenu');
        }
    });
};

window.initializeProjects = (container) => {
    if (!container || !container.children) {
        console.error("Container or its children are not available.");
        return;
    }

    const children = container.children;
    if (children.length === 0) {
        console.error("No children found in the container.");
        return;
    }

    const cardWidth = children.offsetWidth;


    container.style.gap = "70px";

    setTimeout(() => {
        container.style.transition = "gap 1s";
        container.style.gap = "0px";
    }, 1000);
    setTimeout(() => {
        container.style.transition = "gap 0.2s";
        container.style.gap = "16px";

    }, 2200);
};

//window.initializeProjects = (container) => {
//    const maxRetries = 10;
//    let retries = 0;

//    const initialize = () => {
//        if (!container || !container.children) {
//            if (retries < maxRetries) {
//                retries++;
//                setTimeout(initialize, 100); // Retry after 100ms
//                return;
//            } else {
//                console.error("Container or its children are not available.");
//                return;
//            }
//        }

//        const children = container.children;
//        if (children.length === 0) {
//            if (retries < maxRetries) {
//                retries++;
//                setTimeout(initialize, 100); // Retry after 100ms
//                return;
//            } else {
//                console.error("No children found in the container.");
//                return;
//            }
//        }

//        for (let i = 0; i < children.length; i++) {
//            children[i].style.transform = `translateX(${i * 220}px)`;
//        }

//        setTimeout(() => {
//            for (let i = 0; i < children.length; i++) {
//                children[i].style.transition = 'transform 1s';
//                children[i].style.transform = `translateX(${i * 220 - container.clientWidth}px)`;
//            }
//        }, 1000);
//    };

//    initialize();
//};

/*****************************************************************************/
/************************* Display projects Scrolling ************************/
/*****************************************************************************/




window.displayScrolling = () => {

    console.log("function is working ..")


    const wrapper = document.querySelector(".projects-container .wrapper");
    const carousel = document.querySelector(".projects-container .wrapper .carousel");
    const arrowBtns = document.querySelectorAll(".projects-container .wrapper i");

    if (!carousel) {
        console.error("Carousel element not found");
        return;
    }


    const firstCardWidth = carousel.querySelector(".project-card").offsetWidth;


    const carouselChildren = [...carousel.children];

    let isDragging = false, startX, startScrollLeft, timeoutId;

    //get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


    /**********************loop  scrooling *************************************************/

    //insert copies of the last few cards to beginning of carousel for infinite scrolling
    //carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    //    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    //});

    //insert copies of the first few cards to the end of carousel for infinite scrolling
    //carouselChildren.slice(0, cardPerView).forEach(card => {
    //    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    //});

    /************************************************************************************ */

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : + firstCardWidth;
        })
    });

    const draggStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        //record the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return; //if isDragging is false return from her 
        //update the scroll position of the carousel based on the cursor mvmt
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = (e) => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }



    const inifinitScroll = () => {

        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        //clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800) return;
        // Autoplay the carousel after every 2500ms 
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
    }

    //autoPlay();

    carousel.addEventListener("mousedown", draggStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    //carousel.addEventListener("scroll", inifinitScroll);
    //wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    //wrapper.addEventListener("mouseleave", autoPlay);

}

/*********************************************************************************************/
/************************************** Automatic Scrolling **********************************/
/*********************************************************************************************/

window.automaticScrollingToProjects = () => {
    setTimeout(() => {
        document.getElementById("Projects").scrollIntoView({ behavior: "smooth" });

    }, 100); // Adjust the delay as needed
};

window.automaticScrollingToContactMe = () => {
    setTimeout(() => {
        document.getElementById("ContactMe").scrollIntoView({ behavior: "smooth" });

    }, 300); // Adjust the delay as needed
};

// wwwroot/js/downloadFile.js
window.downloadFile = (fileName, byteBase64) => {
    var link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:application/octet-stream;base64,' + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


//window.addOutsideClickListener = (menuId, dotNetHelper) => {
//    document.addEventListener('click', function (event) {
//        const menu = document.getElementById(menuId);
//        const menuIcon = document.querySelector('nav > span.icon');
//        if (menu && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
//            dotNetHelper.invokeMethodAsync('CloseMenu');
//        }
//    });
//};

window.clickOutSidePop = (popId, dotNetHelper) => {

    document.addEventListener('click', function (event) {

        const popup = document.getElementById(popId);
        const btnOpens = document.querySelectorAll(".openDescreption");

        let hasClickedBtnsOpen = false;


        btnOpens.forEach(btnOpen => {

            if (btnOpen.contains(event.target)) {
                hasClickedBtnsOpen = true;
            }

        })

        if (popup && !popup.contains(event.target) && !hasClickedBtnsOpen) {

                console.log("kokok");
                dotNetHelper.invokeMethodAsync('ClosePopup')

            }

    });
};