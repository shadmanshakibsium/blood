document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById("donor-list");
  const searchInput = document.getElementById("search");

  fetch("../data/donors.json")
    .then(response => response.json())
    .then(data => {
      if (!data[upazila]) {
        container.innerHTML = "<p>এই উপজেলায় কোনো তথ্য পাওয়া যায়নি।</p>";
        return;
      }

      const groups = data[upazila];
      renderDonors(groups);

      searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();
        const filtered = {};

        for (let group in groups) {
          const matches = groups[group].filter(donor =>
            donor.name.toLowerCase().includes(keyword) ||
            donor.phone.includes(keyword) ||
            donor.location.toLowerCase().includes(keyword)
          );
          if (matches.length > 0) {
            filtered[group] = matches;
          }
        }

        renderDonors(filtered);
      });

      function renderDonors(groupData) {
        container.innerHTML = "";
        for (let group of ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]) {
          const donors = groupData[group];
          if (!donors || donors.length === 0) continue;

          const section = document.createElement("div");
          section.className = "group-section";

          const h2 = document.createElement("h2");
          h2.innerText = `🩸 ${group} গ্রুপ`;
          section.appendChild(h2);

          donors.forEach(donor => {
            const p = document.createElement("div");
            p.className = "donor";
            p.innerText = `${donor.name} - 📞 ${donor.phone} (${donor.location})`;
            section.appendChild(p);
          });

          container.appendChild(section);
        }
      }
    })
    .catch(error => {
      console.error("ডেটা লোডে সমস্যা:", error);
      container.innerHTML = "<p>ডেটা লোড করতে সমস্যা হয়েছে।</p>";
    });
});