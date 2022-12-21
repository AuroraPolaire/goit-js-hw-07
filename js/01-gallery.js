import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
const markup = createGalleryItem(galleryItems);
let instance = null;

galleryEl.innerHTML = markup;

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onClickOpenPicture(event) {
  const { target } = event;
  event.preventDefault();

  if (target.nodeName !== "IMG") {
    return;
  }

  const chosenPicture = target.dataset.source;

  instance = basicLightbox.create(`
    <img src="${chosenPicture}" width="800" height="600">
  `);

  instance.show();
}

galleryEl.addEventListener("click", onClickOpenPicture);

function onEscCloseModal(event) {
  if (event.key === "Escape" && instance.visible()) {
    instance.close();
  }
}

document.addEventListener("keydown", onEscCloseModal);
