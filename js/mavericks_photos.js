const renderPhotos = async () => {
  const gallery = document.getElementById("gallery");

  const images = await fetch("./gallery/index.json").then(r => r.json());

  const doc = new DOMParser().parseFromString(html, "text/html");

  const galleryNode = document.getElementById("links");

  for (const image of images) {
    const photoUrl = `/gallery/${image}.jpg`;
    const thumbnailUrl = `/gallery/${image}_thumb.jpg`;

    const container = document.createElement("div");
    container.className = "col-xs-3 col-sm-2 thumbnail-container";
    container.style.padding = "0";
    const imageLink = document.createElement("a");
    imageLink.className = "img-fluid";
    imageLink.setAttribute("data-toggle", "lightbox");
    imageLink.setAttribute("data-gallery", "example-gallery");
    imageLink.href = photoUrl;
    const imageNode = document.createElement("img");
    imageNode.className = "pwimages";
    imageNode.style.width = "100%";
    imageNode.src = thumbnailUrl;
    imageLink.appendChild(imageNode);
    container.appendChild(imageLink);

    galleryNode.appendChild(container);
  }
};

renderPhotos();
