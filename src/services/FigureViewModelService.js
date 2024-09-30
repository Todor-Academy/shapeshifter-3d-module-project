import {Figure} from "../models/Figure";

export class FigureViewModelSerice {
    toViewModel (figureData) {
        return new Figure(...figureData);
    }

    toSerializedData (figureViewModel) {
        return {
            id: figureViewModel.id,
            name: figureViewModel.name,
            color: figureViewModel.color,
            geometryType: figureViewModel.geometryType,
            size: figureViewModel.size,
        }
    }
}