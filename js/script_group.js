document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById("donor-list");
  const searchInput = document.getElementById("search");

  fetch("../../data/donors.json")
    .then(response => response.json())
    .then(data => {
      const donors = data[upazila][bloodGroup];
      renderDonors(donors);

      searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();
        const filtered = donors.filter(d =>
          d.name.toLowerCase().includes(keyword) ||
          d.phone.includes(keyword) ||
          d.location.toLowerCase().includes(keyword)
        );
        renderDonors(filtered);
      });

      function renderDonors(list) {
        container.innerHTML = "";
        if (list.length === 0) {
          container.innerHTML = "<p>কোনো রক্তদাতা পাওয়া যায়নি।</p>";
          return;
        }
        list.forEach(d => {
          const div = document.createElement("div");
          div.className = "donor";
          div.innerText = `${d.name} - 📞 ${d.phone} (${d.location})`;
          container.appendChild(div);
        });
      }
    })
    .catch(() => {
      container.innerHTML = "<p>ডেটা লোড করতে সমস্যা হয়েছে।</p>";
    });
});
