function makeTodaySummary(data, labels) {
  for (let i = 0; i < data.length; i++) {
    const todaySummary = document.querySelector(".today-summary");
    const summaryItem = document.createElement("div");

    summaryItem.innerHTML = `   <p class="today-high today-summary-info">${data[i]}</p>
        <p class="today-high-label today-summary-label">${labels[i]}</p>`;

    todaySummary.appendChild(summaryItem)    
  }
}

export { makeTodaySummary };
