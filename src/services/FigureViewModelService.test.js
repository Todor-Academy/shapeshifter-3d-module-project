import { FigureViewModelService } from "./FigureViewModelService";
import { Figure } from "../models/Figure";

jest.mock("../models/Figure");

const figureData = {
  id: 1,
  name: "Box",
  color: "#FF0000",
  geometryType: "BoxGeometry",
  size: 5,
};

describe("FigureViewModelService", () => {
  let service;

  beforeEach(() => {
    service = new FigureViewModelService();
  });

  it("method 'toViewModel' should create a Figure instance with correct data", () => {
    expect(service).toBeTruthy();

    const mockFigureInstance = {
      id: 1,
      name: "Box",
      color: "#FF0000",
      geometryType: "BoxGeometry",
      size: 5,
    };

    Figure.mockImplementation(() => mockFigureInstance);

    const result = service.toViewModel(figureData);

    expect(Figure).toHaveBeenCalledWith(
      figureData.id,
      figureData.name,
      figureData.color,
      figureData.geometryType,
      figureData.size
    );

    expect(result).toBe(mockFigureInstance);
  });

  it("toSerializedData should return correct serialized data from Figure instance", () => {
    const figureInstance = new Figure(
      figureData.id,
      figureData.name,
      figureData.color,
      figureData.geometryType,
      figureData.size
    );

    const result = service.toSerializedData(figureInstance);

    expect(result).toEqual({
      id: 1,
      name: "Box",
      geometryType: "BoxGeometry",
      size: 5,
      color: "#FF0000",
    });
  });
});
