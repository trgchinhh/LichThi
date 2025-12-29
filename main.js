const items = document.querySelectorAll(".monhoc-item");
const today = new Date();
today.setHours(0, 0, 0, 0);
items.forEach(item => {
    const examDate = new Date(item.dataset.date);
    examDate.setHours(0, 0, 0, 0);
    const diffDays = (examDate - today) / (1000 * 60 * 60 * 24);
    if (diffDays === 0) {
        item.classList.add("today");
    } 
    else if (diffDays > 0 && diffDays <= 2) {
        item.classList.add("soon");
    }
});
