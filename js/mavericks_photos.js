const renderPhotos = async () => {
  const html = await fetch("/gallery/").then(r => r.text());

  const doc = new DOMParser().parseFromString(html, "text/html");

  const photoArray = [...doc.querySelectorAll("a")]

    .map(a => a.getAttribute("href"))

    .filter(file => /\.(png|jpe?g|gif|webp|svg)$/i.test(file));
  const galleryNode = document.getElementById("links");

  photoArray.forEach(photoUrl => {
    if (photoUrl.indexOf("_thumb") === -1) {
      const thumbnailUrl = `${photoUrl.split(".")[0]}_thumb.jpg`;
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
  });
};

renderPhotos();
