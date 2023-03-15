const container = document.getElementById("post-container");
const catagoriesLinks = document.getElementById("catagories");

function loadCatagory() {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCatagory(data.data.news_category));
}

function displayCatagory(catagories) {
  catagories.forEach((catagory) => {
    const catagoryLink = document.createElement("a");
    catagoryLink.setAttribute("href", "#");
    catagoryLink.setAttribute("data", `${catagory.category_id}`);
    catagoryLink.classList.add("text-decoration-none");
    catagoryLink.innerText = catagory.category_name;

    catagoriesLinks.appendChild(catagoryLink);
  });
}

loadCatagory();

catagoriesLinks.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data");
  loadData(id, e.target.innerText);
});

function loadData(category_id, catagory_name) {
  fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data, catagory_name));
}

function displayData(dataCollection, catagory_name) {
  container.innerHTML = "";
  const resultCount = dataCollection.length;
  const resultsFound = document.getElementById("results-found");
  if (resultCount) {
    resultsFound.innerText = `${resultCount} items are found for category ${catagory_name}`;
  } else {
    resultsFound.innerText = `No results found for category ${catagory_name}`;
  }
  dataCollection.forEach((data) => {
    const div = document.createElement("div");
    div.className = "card mb-3 h-100";
    div.innerHTML = `<div class="row g-0">
                      <div class="col-md-4">
                        <img src=${
                          data.image_url
                        } class="img-fluid h-100 rounded-start" alt="post thumbnail" />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${data.title}</h5>
                          <p class="card-text">${data.details.slice(
                            0,
                            500
                          )}...</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                              <div>
                                <img class="img-fluid author-img rounded-circle"
                                src="images/author.jpg"
                                alt="author image"/>
                              </div>
                              <div class="ms-2">
                                <p class="author-name m-0">${
                                  data.author.name
                                }</p>
                                <p class="post-date m-0 text-muted">${
                                  data.author.published_date
                                }</p>
                              </div>
                            </div>
                          <div class="d-flex align-items-center">
                            <i class="fa-light fa-eye"></i>
                            <p class="post-views ms-2">${data.total_view}M</p>
                          </div>
                          <div class="d-flex align-items-center">
                            <p class="m-0 p-0 me-1">${data.rating.number}</p>
                            <i class="fa-regular fa-star"></i>
                          </div>
                          <div class="d-flex align-items-center">
                            <i class="fa-solid fa-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>`;
    container.appendChild(div);
  });
}
