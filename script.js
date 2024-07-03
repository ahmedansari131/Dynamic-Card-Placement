const cards = document.querySelectorAll(".cards");
const cardsContainer = document.querySelector(".card-container");

const cardLength = cards.length;
const gap = 25;

function getCardPerRow() {
  if (cards.length === 0) return 0;
  const cardWidth = cards[0].clientWidth;
  const containerWidth = cardsContainer.clientWidth;
  return Math.floor(containerWidth / (cardWidth + gap));
}

function createRowsAndColumns() {
  let parentMatrix = [];
  let row = [];
  const cardInlineLimit = getCardPerRow();

  for (let i = 0; i < cards.length; i++) {
    row.push(cards[i]);

    if (row.length === cardInlineLimit) {
      parentMatrix.push(row);
      row = [];
    }
  }

  if (row.length > 0) {
    parentMatrix.push(row);
  }

  return parentMatrix;
}

function placeCardsDynamically() {
  const cardInlineLimit = getCardPerRow();
  let structuredCards = createRowsAndColumns();
  for (let col = 0; col < cardInlineLimit; col++) {
    let columnHeight = 0;
    for (let row = 0; row < structuredCards.length; row++) {
      if (structuredCards[row].length <= col) {
        continue;
      }
      let positionY = columnHeight;
      let positionX = (cards[0].clientWidth + gap) * col;
      columnHeight =
        columnHeight + (structuredCards[row][col]?.clientHeight + gap);

      structuredCards[row][
        col
      ].style.transform = `translate(${positionX}px, ${positionY}px)`;
    }
  }
}

window.addEventListener("resize", (e) => {
  placeCardsDynamically();
});

window.addEventListener("DOMContentLoaded", (e) => {
  placeCardsDynamically();
});
