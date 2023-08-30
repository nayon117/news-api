const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await res.json();
    const catagories = data.data.news_category;
    console.log(catagories);
     

    const tabContainer = document.getElementById("tab-container")
    // loop for accessing element from the array 

catagories.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')"  class="tab tab-active">${category.category_name}</a>
        `
        tabContainer.appendChild (div) 
    });

}
// onclich funtion and load data from api 

const handleLoadNews = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(
        `https://openapi.programming-hero.com/api/news/category/${categoryId}`
      );
      const data = await response.json();
     
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    data.data.forEach((news) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure>
          <img
            src=${news.image_url}
            alt="images"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
             ${news.title.slice(0,40)}
            <div class="badge badge-secondary p-5">${news?.rating?.badge} </div>
          </h2>
          <p>
            ${news.details.slice(0,50)}
          </p>
          <div class="card-footer flex justify-between mt-8">
            <div class="flex">
              <div>
                <div class="avatar online">
                  <div class="w-14 rounded-full">
                    <img
                      src= ${news?.author?.img}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6>${news?.author?.name}</h6>
                <small>${news?.author?.published_date}</small>
              </div>
            </div>
            <div class="card-detaild-btn">
              <button onclick="handleModal('${news._id}')"
                class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div> 
        `
        cardContainer.appendChild(div)
    })
}

const handleModal =async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await res.json();
    console.log(data.data[0]);
    const newsI = data.data[0]
    const modalContainer = document.getElementById("modal-container")
    
        const div = document.createElement("div");
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
   <form method="dialog" class="modal-box">
   <img src= ${newsI.image_url}>
    <h3 class="font-bold text-lg">${newsI.title}</h3>
    <p class="py-4">${newsI.details.slice(0,70)}</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>`;
    modalContainer.appendChild(div)
    const modal = document.getElementById("my_modal_1");
    modal.showModal()
    
}

handleLoadNews("01")
loadData();