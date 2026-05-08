// Configuration
const KEYWORD = 'JA';
const SHORTCODE = '877';
let os = detectOS();
let currentStep = 1;
let userMsisdn = '';

// DOM Elements
const msisdnInput = document.getElementById("msisdn");
const pinInput = document.getElementById("pin");
const submitMsisdnBtn = document.getElementById("submit-msisdn");
const submitPinBtn = document.getElementById("submit-pin");
const pinBackBtn = document.getElementById("pin-back-btn");
const submitPopupBtn = document.getElementById("submit-popup");
const firstCtaBtn = document.getElementById("first-cta-btn");
const openSmsBtn = document.getElementById("btn-open-sms");

const msisdnSection = document.getElementById("msisdn-section");
const pinSection = document.getElementById("pin-section");
const thankYouSection = document.getElementById("thank-you");
const directSmsSection = document.getElementById("direct-sms-section");
const loadingScreen = document.getElementById("he-loading");

const msisdnError = document.getElementById("msisdn-error");
const pinError = document.getElementById("pin-error");
const globalMessage = document.getElementById("global-message");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);

    setupMsisdnInput();
    setupPinInput();
    setupEventListeners();
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.style.display = "none";
    }
}

/* MSISDN INPUT HANDLING */
function setupMsisdnInput() {
    if (!msisdnInput) return;

    msisdnInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        validateMsisdnField();
    });

    msisdnInput.addEventListener("blur", function () {
        validateMsisdnField();
    });
}

function validateMsisdnField() {
    const field = msisdnInput.closest(".field");
    if (!field) return;

    const isValid = msisdnInput.value.length >= 8 && msisdnInput.value.length <= 12;
    
    if (isValid) {
        field.classList.add("is-valid");
        msisdnError.classList.remove("is-show");
        msisdnError.textContent = "";
    } else {
        field.classList.remove("is-valid");
    }
}

/* PIN INPUT HANDLING */
function setupPinInput() {
    if (!pinInput) return;

    pinInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        validatePinField();
    });

    pinInput.addEventListener("blur", function () {
        validatePinField();
    });
}

function validatePinField() {
    const field = pinInput.closest(".field");
    if (!field) return;

    const isValid = pinInput.value.length >= 4 && pinInput.value.length <= 6;
    
    if (isValid) {
        field.classList.add("is-valid");
        pinError.classList.remove("is-show");
        pinError.textContent = "";
    } else {
        field.classList.remove("is-valid");
    }
}

/* EVENT LISTENERS */
function setupEventListeners() {
    // MSISDN Submit Button
    if (submitMsisdnBtn) {
        submitMsisdnBtn.addEventListener("click", handleMsisdnSubmit);
    }

    // PIN Back Button
    if (pinBackBtn) {
        pinBackBtn.addEventListener("click", goBackToMsisdn);
    }

    // PIN Submit Button
    if (submitPinBtn) {
        submitPinBtn.addEventListener("click", handlePinSubmit);
    }

    // Direct SMS Submit Button
    if (submitPopupBtn) {
        submitPopupBtn.addEventListener("click", handleDirectSmsSubmit);
    }

    // First CTA Button
    if (firstCtaBtn) {
        firstCtaBtn.addEventListener("click", handleFirstCtaSubmit);
    }

    // Open SMS Button (Thank You)
    if (openSmsBtn) {
        openSmsBtn.addEventListener("click", handleOpenSms);
    }
}

/* MSISDN SUBMIT HANDLER */
function handleMsisdnSubmit(e) {
    e.preventDefault();

    // Add click animation effect
    addButtonClickEffect(submitMsisdnBtn);
    
    // Trigger vibration if available
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }

    if (!msisdnInput.value) {
        showMsisdnError("Please enter a mobile number");
        return;
    }

    if (msisdnInput.value.length < 8 || msisdnInput.value.length > 12) {
        showMsisdnError("Mobile number must be between 8-12 digits");
        return;
    }

    userMsisdn = msisdnInput.value;
    transitionToPin();
}

function showMsisdnError(message) {
    msisdnError.textContent = message;
    msisdnError.classList.add("is-show");
}

function transitionToPin() {
    // Update progress
    updateProgressStep(2);

    // Hide MSISDN section with animation
    msisdnSection.classList.remove("active");
    
    // Show PIN section with animation
    setTimeout(() => {
        msisdnSection.style.display = "none";
        pinSection.style.display = "block";
        pinSection.classList.add("active");
        pinInput.focus();
    }, 300);
}

/* PIN SUBMIT HANDLER */
function handlePinSubmit(e) {
    e.preventDefault();

    if (!pinInput.value) {
        showPinError("Please enter your PIN");
        return;
    }

    if (pinInput.value.length < 4 || pinInput.value.length > 6) {
        showPinError("PIN must be between 4-6 digits");
        return;
    }

    // Move to thank you screen
    updateProgressStep(3);
    transitionToThankYou();

    // Simulate SMS sending
    setTimeout(() => {
        triggerSmsSubmit();
    }, 1000);
}

function showPinError(message) {
    pinError.textContent = message;
    pinError.classList.add("is-show");
}

function goBackToMsisdn(e) {
    e.preventDefault();

    // Update progress
    updateProgressStep(1);

    // Hide PIN section
    pinSection.classList.remove("active");
    setTimeout(() => {
        pinSection.style.display = "none";
        msisdnSection.style.display = "block";
        msisdnSection.classList.add("active");
        msisdnInput.focus();
    }, 300);
}

function transitionToThankYou() {
    // Hide PIN section
    pinSection.classList.remove("active");
    
    setTimeout(() => {
        pinSection.style.display = "none";
        thankYouSection.style.display = "block";
        thankYouSection.classList.add("active");
    }, 300);
}

/* DIRECT SMS SUBMIT HANDLER */
function handleDirectSmsSubmit(e) {
    e.preventDefault();
    
    // Add click animation effect
    addButtonClickEffect(submitPopupBtn);
    
    // Trigger vibration if available
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
    
    triggerSmsSubmit();
}

/* FIRST CTA SUBMIT HANDLER */
function handleFirstCtaSubmit(e) {
    e.preventDefault();
    
    // Add click animation effect
    addButtonClickEffect(firstCtaBtn);
    
    // Trigger vibration if available
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
    
    // Transition to next step (assuming it goes to MSISDN section)
    transitionToMsisdnFromCta();
}

/* TRANSITION FROM FIRST CTA TO MSISDN */
function transitionToMsisdnFromCta() {
    const firstCtaSection = document.getElementById("first-cta-section");
    
    // Hide first CTA section
    if (firstCtaSection) {
        firstCtaSection.classList.remove("active");
        setTimeout(() => {
            firstCtaSection.style.display = "none";
            // Show MSISDN section
            if (msisdnSection) {
                msisdnSection.style.display = "block";
                msisdnSection.classList.add("active");
                if (msisdnInput) msisdnInput.focus();
            }
        }, 300);
    }
}

/* BUTTON CLICK ANIMATION EFFECT */
function addButtonClickEffect(button) {
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'vibration 0.3s ease-in-out';
    }, 10);
    
    setTimeout(() => {
        button.style.animation = '';
    }, 350);
}

/* SMS SUBMIT HANDLER */
function triggerSmsSubmit() {
    const smsBody = KEYWORD;
    let smsUrl = '';

    if (os === 'iOS') {
        smsUrl = "sms:" + SHORTCODE + "&body=" + smsBody;
    } else {
        smsUrl = "sms:" + SHORTCODE + "?body=" + smsBody;
    }

    // Show thank you before redirect
    if (!thankYouSection.classList.contains("active")) {
        transitionToThankYou();
    }

    // Redirect to SMS
    setTimeout(() => {
        window.location.href = smsUrl;
    }, 500);
}

/* THANK YOU BUTTON HANDLER */
function handleOpenSms(e) {
    e.preventDefault();
    triggerSmsSubmit();
}

/* PROGRESS INDICATOR */
function updateProgressStep(step) {
    currentStep = step;
    
    for (let i = 1; i <= 3; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (stepEl) {
            if (i < step) {
                stepEl.classList.remove("active");
            } else if (i === step) {
                stepEl.classList.add("active");
            }
        }
    }
}

/* UTILITY FUNCTIONS */
function detectOS() {
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'iOS';
    } else if (/Android/.test(userAgent)) {
        return 'Android';
    }
    return 'Unknown';
}

function generateRandomNumber(length) {
    return Math.floor(
        Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1))
    );
}

/* HELPER: Show global message */
function showGlobalMessage(message, type = 'error') {
    if (globalMessage) {
        globalMessage.textContent = message;
        globalMessage.classList.add("is-show");
        globalMessage.classList.remove(type === 'error' ? 'success' : 'error');
        globalMessage.classList.add(type);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            globalMessage.classList.remove("is-show");
        }, 5000);
    }
}