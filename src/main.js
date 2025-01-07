import './style.css';
import { getHomeData } from "./getData";
import { isValidImageUrl } from "./checkImageUrl";
import { addKeyboardNavigation } from './addKeyboardNavigation';
import { openModal } from './modal';

const DISNEY_DATA_API = "https://cd-static.bamgrid.com/dp-117731241344/home.json";
const appNode = document.querySelector("#app");

appNode.addEventListener('keydown', (event) => {
  switch (event.key) {
    case "Enter":
      event.preventDefault();
      populateTheModal(event);
      openModal(event)
      break;
    default:
      return;
  };
});

function populateTheModal (event) {
  const modalHeader = document.querySelector("#modal .modalHeader");
  modalHeader.textContent = event.target.firstElementChild.alt;
};

function renderHeading(category) {
  const title = category?.set?.text?.title?.full?.set?.default?.content;  
  if (title) {
    const headingNode = document.createElement("h2");
    headingNode.setAttribute("class", "title");
    headingNode.textContent = title;
    document.querySelector("#app").appendChild(headingNode);
  }
}

function createTheULNode(){
  const containerNode = document.createElement("ul");
  containerNode.classList.add("inline");
  return containerNode;
}

function createTheLINode(indexOfRow, indexOfColumn){
  const listItemNode = document.createElement("li");
  listItemNode.dataset.row = indexOfRow;
  listItemNode.dataset.col = indexOfColumn;
  return listItemNode;
}

function createTheButtonNode(){
  const buttonItem = document.createElement("button");
  buttonItem.setAttribute("type", "button");
  return buttonItem;
}

function createTheImageNode(movieItem){
  const { content : movieTitle } = movieItem?.text?.title?.full?.series?.default || movieItem?.text?.title?.full?.program?.default || movieItem?.text?.title?.full?.collection?.default;
  const { url : imageURL } = movieItem?.image?.tile?.["1.78"]?.series?.default || movieItem?.image?.tile?.["1.78"]?.program?.default || movieItem?.image?.tile?.["1.78"]?.default?.default;
  const imageItem = document.createElement("img");
  imageItem.setAttribute("src", imageURL);
  imageItem.setAttribute("alt", movieTitle);
  return imageItem;
}

function renderData(disneyData) {
  const containers = disneyData?.StandardCollection?.containers;
  
  containers.forEach((category, indexOfRow)=>{
    let colIndex = 0;
    const categoryHasMovies = category?.set?.items;

    if (categoryHasMovies) {

      renderHeading(category);

      const containerNode = createTheULNode();

      const { items } = category.set;
      
      if (items.length) {
        items.forEach(async (movieItem)=>{

          const imageItem = createTheImageNode(movieItem);
          
          await isValidImageUrl(imageItem.src)
          .then((isValid) => {
            if (isValid) {
                
                const listItem = createTheLINode(indexOfRow, colIndex);
                const buttonItem = createTheButtonNode();

                buttonItem.appendChild(imageItem);
                listItem.appendChild(buttonItem);
                containerNode.appendChild(listItem);

                colIndex++;
              } else {
                console.log("The image URL is invalid.");
              }
          })
          .catch((error) => console.error("An error occurred:", error));
        })
      }
      document.querySelector("#app").appendChild(containerNode);
    }
  })
}

getHomeData(DISNEY_DATA_API)
  .then((disneyData)=>{
    renderData(disneyData);
    window.setTimeout(()=>{
      addKeyboardNavigation("#app");
    }, 100);
  })
  .catch((error) => {
    console.log(error.message);
  });
