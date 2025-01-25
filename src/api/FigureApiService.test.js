import axios from "axios";
import { figureApiService } from "./FigureApiService";

jest.mock("axios");

let consoleErrorMock;

describe("FigureApiService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    figureApiService.data = [];

    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  it("should fetch figures data successfully", async () => {
    const mockData = [
      { id: 1, name: "Cube" },
      { id: 2, name: "Sphere" },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const result = await figureApiService.getFiguresData();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/figures");
    expect(result).toEqual(mockData);
    expect(figureApiService.data).toEqual(mockData);
  });

  it("should handle error while fetching figures data", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    const result = await figureApiService.getFiguresData();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/figures");
    expect(result).toEqual(undefined);
    expect(console.error).toHaveBeenCalledWith(
      "Error while fetching figures data",
      expect.any(Error)
    );
  });

  it("should add figure data successfully", async () => {
    const newFigure = { id: 3, name: "Pyramid" };
    axios.post.mockResolvedValue({ data: newFigure });

    const result = await figureApiService.addFigureData(newFigure);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/figures",
      newFigure
    );
    expect(result).toEqual({ data: newFigure });
    expect(figureApiService.data).toContainEqual({ data: newFigure });
  });

  it("should update figure data successfully", async () => {
    figureApiService.data = [{ id: 1, name: "Cube" }];
    const updatedFigure = { id: 1, name: "Updated Cube" };
    axios.put.mockResolvedValue({ data: updatedFigure });

    const result = await figureApiService.updateFigureData(updatedFigure);

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3000/figures/1",
      updatedFigure
    );
    expect(result).toEqual({ data: updatedFigure });
    expect(figureApiService.data[0]).toEqual({ data: updatedFigure });
  });

  it("should handle error while updating figure data", async () => {
    axios.put.mockRejectedValue(new Error("Update figure error"));

    const result = await figureApiService.updateFigureData({
      id: 1,
      name: "Cube",
    });

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "Error while updating figure data:",
      expect.any(Error)
    );
  });

  it("should remove figure data successfully", async () => {
    figureApiService.data = [{ id: 1, name: "Cube" }];
    axios.delete.mockResolvedValue();

    const result = await figureApiService.removeFigureData(1);

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:3000/figures/1"
    );
    expect(result).toEqual(1);
    expect(figureApiService.data).toEqual([]);
  });

  it("should handle error while removing figure data", async () => {
    axios.delete.mockRejectedValue(new Error("Remove figure error"));

    const result = await figureApiService.removeFigureData(1);

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "Error while removing figure data:",
      expect.any(Error)
    );
  });
});
