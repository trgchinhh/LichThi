const items = document.querySelectorAll(".monhoc-item");
const loginOverlay = document.getElementById("login-overlay");
const welcome = document.getElementById("welcome");
const monhocList = document.querySelector(".monhoc-list");
const loginBtn = document.getElementById("login-btn");
const mssvInput = document.getElementById("mssv-input");

const mssv = localStorage.getItem("mssv");

if (!mssv) {
    loginOverlay.style.display = "flex";
    monhocList.style.display = "none";
    welcome.style.display = "none";
} else {
    loginOverlay.style.display = "none";
    monhocList.style.display = "block";
    welcome.style.display = "block";
    welcome.textContent = `MSSV: ${mssv}`;

    runCheckin(); 
}

loginBtn.onclick = () => {
    const value = mssvInput.value.trim();

    if (!value) {
        alert("Vui lòng nhập MSSV!");
        return;
    }

    localStorage.setItem("mssv", value);
    location.reload();
};

function runCheckin() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    items.forEach((item) => {
        const examDate = new Date(item.dataset.date);
        examDate.setHours(0, 0, 0, 0);

        const diffDays = (examDate - today) / (1000 * 60 * 60 * 24);
        const key = `checked_${mssv}_${item.dataset.date}`;

        if (localStorage.getItem(key) === "true") {
            item.classList.add("checked");

            const btn = document.createElement("button");
            btn.textContent = "Đã điểm danh";
            btn.className = "checkin-btn checked";
            btn.disabled = true;

            item.appendChild(btn);
            return;
        }
        if (diffDays === 0) {
            item.classList.add("today");

            const btn = document.createElement("button");
            btn.textContent = "Điểm danh";
            btn.className = "checkin-btn";

            btn.onclick = () => {
                btn.textContent = "Đã điểm danh";
                btn.classList.add("checked");
                btn.disabled = true;

                item.classList.remove("today");
                item.classList.add("checked");

                localStorage.setItem(key, "true");
            };

            item.appendChild(btn);
        }
        else if (diffDays < 0) {
            item.classList.add("past");

            const btn = document.createElement("button");
            btn.textContent = "Không điểm danh";
            btn.className = "fail-btn";
            btn.disabled = true;

            item.appendChild(btn);
        }
    });
}

function logout() {
    localStorage.removeItem("mssv");
    location.reload();
}

function saveMSSV() {
    const input = document.getElementById("mssv-input");
    const value = input.value.trim();

    if (!value) {
        alert("Vui lòng nhập MSSV!");
        return;
    }

    localStorage.setItem("mssv", value);
    location.reload();
}
