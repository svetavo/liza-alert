const backBtn = document.querySelector('[name="back-btn"]');
const nextBtn = document.querySelector('[name="next-btn"]');
const restartBtn = document.querySelector('[name="restart-btn"]');
const startTestBtn = document.querySelector('[name="start_test-btn"]');
const checkResultBtn = document.querySelector('[name="check-result-btn"]');
const testPreviewPage = document.querySelector("#test-preview");
const testPage = document.querySelector("#test-body");
const courseCompletePage = document.querySelector("#course-complete");
const conditionCheck = document.querySelector(".content__conditions");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
const radios = document.querySelectorAll("input[type=radio]");
const headerTest = document.querySelector(".content__header");
const courseResultsPage = document.querySelectorAll(".content__main");
const breadcrumb = document.querySelectorAll(".breadcrumb-list");
const breadcrumbs = document.querySelectorAll(".breadcrumb-list__item");
const accordionItem = document.querySelector(".accordion__item_active");
var hasFinished = false;
var testScore = 0;

function setStartNavigation() {
  backBtn.addEventListener("click", returnToIndex);
  startTestBtn.addEventListener("click", startTest);
  nextBtn.disabled = true;
  checkBoxes.forEach((el) => {
    el.addEventListener("change", checkSelected);
  });
  radios.forEach((el) => {
    el.addEventListener("change", checkSelected);
  });
  conditionCheck.addEventListener("click", showCondition);
  checkResultBtn.addEventListener("click", checkResult);
}

function returnToIndex() {
  document.location.href = "./index.html";
}

function startTest() {
  backBtn.removeEventListener("click", returnToIndex);
  backBtn.addEventListener("click", returnToTestPreview);
  testPreviewPage.classList.toggle("content_visible");
  testPage.classList.toggle("content_visible");
}

function checkSelected() {
  const isSelectedAnswers = !(
    Array.from(checkBoxes).some((el) => el.checked) &&
    Array.from(radios).some((el) => el.checked)
  );
  checkResultBtn.disabled = isSelectedAnswers;
  if (!isSelectedAnswers) {
    checkResultBtn.classList.add("button_color_orange");
  } else {
    checkResultBtn.classList.remove("button_color_orange");
  }
}

function checkResult() {
  var correctFirstAnswerCount = Array.from(checkBoxes).filter(
    (el) => el.checked
  ).length;
  var correctSecondAnswerCount = 0;
  if (Array.from(radios).some((el) => el.id === "one" && el.checked)) {
    correctSecondAnswerCount++;
  }
  testScore = correctFirstAnswerCount * 17 - 1 + correctSecondAnswerCount * 50;
  hasFinished = true;
  showResult(testScore);
  renderIcon();
  disableAnswers();
}

function showResult(result) {
  var resultWindow =
    result > 79
      ? document.querySelector(".content__result_status_succes")
      : document.querySelector(".content__result_status_fail");
  resultWindow.classList.add("content_visible");
  resultWindow.querySelector(
    ".content__result-value"
  ).textContent = `${result}%`;
  checkResultBtn.classList.add("button__invisible");
  if (result < 100) restartBtn.classList.remove("button__invisible");

  nextBtn.classList.add("button_color_orange");
  nextBtn.disabled = false;
  nextBtn.addEventListener("click", showCourseComplitedPage);
}

function renderIcon() {
  checkBoxes.forEach((el) => {
    if (el.checked) {
      el.classList.add("content_choose_right");
    } else {
      el.classList.add("content_choose_null");
    }
  });
  radios.forEach((el) => {
    if (el.checked && el.id === "one") {
      el.classList.add("content_choose_right");
    } else if (el.checked) {
      el.classList.add("content_choose_fail");
    } else if (el.id === "one") {
      el.classList.add("content_choose_null");
    } else {
      el.classList.add("content_choose_not-choose-fail");
    }
  });
}

function disableAnswers() {
  checkBoxes.forEach((el) => (el.disabled = true));
  radios.forEach((el) => (el.disabled = true));
}

function showCondition() {
  checkResultBtn.classList.add("button__invisible");
  testPreviewPage.classList.toggle("content_visible");
  testPage.classList.toggle("content_visible");
  startTestBtn.classList.add("button__invisible");
  nextBtn.disabled = true;
  nextBtn.classList.remove("button_color_orange");
  if (!headerTest.querySelector(".content__conditions")) {
    createReturnLabel();
  }
}

function createReturnLabel() {
  const returnLabel = document.createElement("p");
  returnLabel.textContent = "Вернуться к тесту";
  returnLabel.classList.add("content__conditions");
  returnLabel.addEventListener("click", returnToTest);
  headerTest.append(returnLabel);
}

function returnToTest() {
  if (!hasFinished) {
    checkResultBtn.classList.remove("button__invisible");
  }
  if (hasFinished) {
    nextBtn.classList.add("button_color_orange");
    nextBtn.disabled = false;
  }
  testPreviewPage.classList.remove("content_visible");
  testPage.classList.toggle("content_visible");
  startTestBtn.classList.add("button__invisible");
  courseCompletePage.classList.remove("content_visible");
  backBtn.addEventListener("click", returnToTestPreview);
  courseResultsPage.forEach((el) =>
    el.classList.remove("content__main_active")
  );
  setPrevSideInfo();
}

function returnToTestPreview() {
  location.reload();
}

function showCourseComplitedPage() {
  testPage.classList.remove("content_visible");
  courseCompletePage.classList.add("content_visible");
  if (testScore > 79) {
    courseResultsPage[0].classList.add("content__main_active");
  } else {
    courseResultsPage[1].classList.add("content__main_active");
  }
  backBtn.removeEventListener("click", returnToTestPreview);
  backBtn.addEventListener("click", returnToTest);
  updateSideInfo();
}

function setPrevSideInfo() {
  accordionItem.classList.add("accordion__item_active");
  const menuIcon = accordionItem.querySelector(".menu__icon");
  menuIcon.src = "./images/test-icon-active.svg";
  breadcrumbs[3].querySelector(".breadcrumb-list__link_active").textContent =
    "Тест";
  breadcrumbs[2].style.display = "block";
}

function updateSideInfo() {
  accordionItem.classList.remove("accordion__item_active");
  const menuIcon = accordionItem.querySelector(".menu__icon");
  menuIcon.src = "./images/success_icon.svg";
  breadcrumbs[3].querySelector(".breadcrumb-list__link_active").textContent =
    "Курс завершен";
  breadcrumbs[2].style.display = "none";
}

setStartNavigation();
