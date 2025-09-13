// Random character generators
function getRandomLower() { return String.fromCharCode(Math.floor(Math.random() * 26) + 97); }
function getRandomUpper() { return String.fromCharCode(Math.floor(Math.random() * 26) + 65); }
function getRandomNumber() { return String.fromCharCode(Math.floor(Math.random() * 10) + 48); }
function getRandomSymbol() { 
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)]; 
}

const randomFunc = { lower: getRandomLower, upper: getRandomUpper, number: getRandomNumber, symbol: getRandomSymbol };

// Generate Password
const generate = document.getElementById("generateBtn");
generate.addEventListener("click", () => {
  const length = +document.getElementById("Passwordlength").value;
  const hasUpper = document.getElementById("uppercase").checked;
  const hasLower = document.getElementById("lowercase").checked;
  const hasNumber = document.getElementById("numbers").checked;
  const hasSymbol = document.getElementById("symbols").checked;
  const result = document.getElementById("PasswordResult");

  const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

  // Typing animation
  result.value = "";
  result.classList.remove("glow");
  let i = 0;
  const typing = setInterval(() => {
    result.value += password.charAt(i);
    i++;
    if (i === password.length) {
      clearInterval(typing);
      result.classList.add("glow");
      setTimeout(() => result.classList.remove("glow"), 1000);
    }
  }, 80);
});

// Password generator function
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  return generatedPassword.slice(0, length);
}

// Copy to clipboard with flash & toast
const button = document.getElementById("clipboardBtn");
button.addEventListener("click", e => {
  e.preventDefault();
  const result = document.getElementById("PasswordResult");
  result.select();
  document.execCommand("copy");

  // Flash effect
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 500);

  // Toast notification
  showToast("✅ Password Copied!");
});

// Toast function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2500);
}

// Theme toggle
const toggleSwitch = document.getElementById("checkbox");
const currentTheme = localStorage.getItem("theme");

if(currentTheme){
  document.documentElement.setAttribute("data-theme", currentTheme);
  if(currentTheme === "dark") toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", e=>{
  if(e.target.checked){
    document.documentElement.setAttribute("data-theme","dark");
    localStorage.setItem("theme","dark");
  }else{
    document.documentElement.setAttribute("data-theme","light");
    localStorage.setItem("theme","light");
  }
});


