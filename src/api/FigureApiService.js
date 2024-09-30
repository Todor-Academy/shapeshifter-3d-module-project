import axios from "axios";

export class FigureApiService {
    constructor() {
        this.data = [];
        this.basePath = "http://localhost:3000/figures";
    }

    async getFiguresData() {
        try {
            this.data = await axios.get(this.basePath);
            return this.data;
        } catch (error) {
            console.error("Error while fetching figures data", error);
        }
    }

    async addFigureData(figureData) {
        try {
            const newFigureData = await axios.post(this.basePath, figureData);
            this.data.push(newFigureData);
            return newFigureData;
        } catch (error) {
            console.error("Error while adding figure data:", error);
        }
    }

    async updateFigureData(figureData) {
        try {
            const updateFigureData = await axios.put(`${this.basePath}/${figureData.id}`, figureData);
            const index = this.data.findIndex((item) => item.id === figureData.id);

            if (index !== -1) {
                this.data[index] = updateFigureData;
                return updateFigureData;
            } else throw new Error("Could find figure on client side");
        } catch (error) {
            console.error("Error while updating figure data:", error);
        }
    }

    async removeFigureData(figureId) {
        try {
            await axios.delete(`${this.basePath}/${figureId}`);
            const index = this.data.findIndex((item) => item.id === figureId);

            if (index !== -1) {
                this.data.splice(index, 1);
                return figureId;
            } else throw new Error("Could remove figure on client side");
        } catch (error) {
            console.error("Error while removing figure data:", error);
        }
    }
}

export const figureApiService = new FigureApiService();
