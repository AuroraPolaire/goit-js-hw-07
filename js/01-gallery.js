import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
const markup = createGalleryItem(galleryItems);

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

const instance = basicLightbox.create(`<img class="modal-img src="">`, {
  onShow: (instance) => {
    window.addEventListener("keydown", onEscCloseModal);
  },

  onClose: (instance) => {
    window.removeEventListener("keydown", onEscCloseModal);
  },
});

function onClickOpenPicture(event) {
  const { target } = event;
  event.preventDefault();

  if (target.nodeName !== "IMG") {
    return;
  }

  instance.element().querySelector("img").src = target.dataset.source;

  instance.show();
}

galleryEl.addEventListener("click", onClickOpenPicture);

function onEscCloseModal(event) {
  if (event.key === "Escape") {
    instance.close();
    return;
  }
}
