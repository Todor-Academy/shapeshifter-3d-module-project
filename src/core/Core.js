import {Form} from '../client/Form';
import {FigureList} from '../client/FigureList';
import {FigureViewModelService} from '../services/FigureViewModelService';
import {figureApiService} from '../api/FigureApiService';
import {Viewer} from "../three/Viewer";

export class Core {
    constructor () {
        this.viewerCanvas = document.createElement("canvas");
        this.viewerCanvas.id = "viewerRoot";
        const root = document.getElementById("root");

        this.formController = new Form();
        this.formController.onCreate(this.onCreateHandler.bind(this));
        
        this.figureListController = new FigureList(this.onDeleteHandler.bind(this));

        this.figureViewModelService = new FigureViewModelService();

        this.viewModels = [];

        root.append(
            this.formController.getFormElement(),
            this.viewerCanvas,
            this.figureListController.figureList
        );

        this.viewerController = new Viewer(this.viewerCanvas.id);
        this.viewerController.init();
    }

    async start() {
        const figuresData = await figureApiService.getFiguresData();

        figuresData.forEach(figureData => {
            const viewModel = this.figureViewModelService.toViewModel(figureData);
            this.viewModels.push(viewModel);
            this.viewerController.draw(viewModel);
        });

        this.figureListController.updateList(this.viewModels);
    }

    onCreateHandler(formData) {
        const figureViewModel = this.figureViewModelService.toViewModel(formData);
        figureApiService.addFigureData(figureViewModel);
        this.viewModels.push(figureViewModel);
        this.figureListController.updateList(this.viewModels);
        this.viewerController.draw(figureViewModel);
    }

    onDeleteHandler(id) {
        figureApiService.removeFigureData(id);
        this.viewerController.removeFigure(id);
        this.viewModels.splice(this.viewModels.findIndex(vm => vm.id === id), 1);
        this.figureListController.updateList(this.viewModels);
    }
}