const inputsContainer = document.querySelector(".inputs-container");
let allInputBoxes = document.querySelectorAll(".input-box");
const addBtn = document.querySelector(".add-btn");
const error = document.querySelector(".error");
const bar = document.querySelector('.bar')
const totalTask = document.querySelector(".completion-bar span");
let inputText = null;
let checkbox = null;
let isChecked = null;

const allTextInputs = () => {
  inputText = [...allInputBoxes].map((ele) => {
    return ele.children[1];
  });
  setData()
};

const allCheckBoxes = () => {
  checkbox = [...allInputBoxes].map((ele) => {
    return ele.children[0];
  });
};

const howMuchCheckBoxChecked = () => {
  isChecked = checkbox.filter((el) => {
    if (el.checked) {
      return true;
    }
  });
  bar.style.width = isChecked.length / inputText.length * 100 + '%'
  totalTask.innerText = `${isChecked.length}/${inputText.length} Completed`;
};

const setData = () => {
  inputText.forEach((ele,index) => {
    ele.addEventListener('input',(e) => {
      localStorage.setItem(index, JSON.stringify(e.target.value))
    })
});
}

allTextInputs();
allCheckBoxes();
howMuchCheckBoxChecked();
setData()

addBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if(isChecked.length){
    return;
  }
  const clonedElement = allInputBoxes[0].cloneNode(true);
  clonedElement.children[0].checked = false
  clonedElement.children[1].value = ""
  inputsContainer.append(clonedElement);
  allInputBoxes = document.querySelectorAll(".input-box");
  allTextInputs();
  allCheckBoxes();
  error.innerText = `Please set all the ${inputText.length} goals!`;
  bar.style.width = isChecked.length / inputText.length * 100 + '%'
  totalTask.innerText = `${isChecked.length}/${inputText.length} Completed`;
});

// use of event delegation
inputsContainer.addEventListener("click", (e) => {
  if (
    e.target != inputsContainer &&
    e.target.className != "input-text" &&
    e.target.className !== "input-box"
  ) {
    const isAllFieldFill = [...inputText].every((ele) => {
      if (ele.value !== "") return true;
    });
    if (isAllFieldFill) {
      e.target.checked = true;
      totalTask.style.color = '#EEFFE0'
      error.style.visibility = "hidden";
      e.target.nextElementSibling.classList.add('complete-task-text')
      inputText.forEach((ele,index) => {
        if(e.target.nextElementSibling === ele){
          localStorage.removeItem(index)
        }
      })
      howMuchCheckBoxChecked();
    } else {
      e.target.checked = false;
      error.style.visibility = "visible";
      error.innerText = `Please set all the ${inputText.length} goals!`;
    }
  }
});


const getData = () => {
  inputText.forEach((ele,index) => {
    const result = JSON.parse(localStorage.getItem(index))
    ele.value = result
  })
}

getData()


