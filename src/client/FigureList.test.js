const { FigureList } = require("./FigureList");

const figuresDataMock = [
  {
    id: 1,
    name: "Cube",
    geometryType: "CUBE",
    size: 5,
    color: "rgb(255, 0, 0)",
  },
  {
    id: 2,
    name: "Sphere",
    geometryType: "SPHERE",
    size: 7,
    color: "rgb(0, 255, 0)",
  },
];

describe("FigureList", () => {
  let figureList;
  let mockDeleteHandler;

  beforeEach(() => {
    mockDeleteHandler = jest.fn();
    figureList = new FigureList(mockDeleteHandler);
    document.body.appendChild(figureList.figureList);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should create a fugure list item correctly", () => {
    const figure = figuresDataMock[0];

    const figureListItem = figureList.createFigureListItem(figure);
    expect(figureListItem.querySelector(".figure-name").innerText).toBe(
      figure.name
    );

    expect(
      figureListItem.querySelector(".color-preview").style.backgroundColor
    ).toBe(figure.color);

    expect(figureListItem.querySelector(".geometry-details").innerText).toBe(
      `| ${figure.geometryType} | ${figure.size}`
    );

    expect(figureListItem.id).toBe(String(figure.id));
  });

  it("should update the figure list with new figures", () => {
    figureList.updateList(figuresDataMock);

    expect(figureList.figureListItems.length).toBe(figuresDataMock.length);

    figuresDataMock.forEach((figure, index) => {
      const listItem = figureList.figureListItems[index];
      expect(listItem.querySelector(".figure-name").innerText).toBe(
        figure.name
      );

      expect(
        listItem.querySelector(".color-preview").style.backgroundColor
      ).toBe(figure.color);

      expect(listItem.querySelector(".geometry-details").innerText).toBe(
        `| ${figure.geometryType} | ${figure.size}`
      );
    });
  });

  it("should call onDeleteHandler when delete button is clicked", () => {
    const figure = figuresDataMock[0];

    const figureListItem = figureList.createFigureListItem(figure);
    figureList.figureList.appendChild(figureListItem);

    const deleteButtonElement = figureListItem.querySelector(".delete-button");
    deleteButtonElement.click();

    expect(mockDeleteHandler).toHaveBeenCalledWith(figure.id);
  });

  it("should clear the list and add new figures when updateList is called", () => {
    const initialFigures = [figuresDataMock[0]];

    figureList.updateList(initialFigures);
    expect(figureList.figureListItems.length).toBe(1);

    const newFigures = [figuresDataMock[1]];

    figureList.updateList(newFigures);

    expect(figureList.figureListItems.length).toBe(1);
    expect(
      figureList.figureListItems[0].querySelector(".figure-name").innerText
    ).toBe("Sphere");
  });
});
