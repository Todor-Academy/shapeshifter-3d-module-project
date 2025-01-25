// form.test.js
import { Form } from "./Form";
import { GeometryTypes } from "../models/GeometryTypes";

// Мокаємо alert, щоб уникнути його виклику в тестах
global.alert = jest.fn();

describe("Form class", () => {
  let form;

  beforeEach(() => {
    // Створюємо новий екземпляр форми перед кожним тестом
    form = new Form();
    document.body.appendChild(form.getFormElement());
  });

  afterEach(() => {
    // Очищуємо тіло документа після кожного тесту
    document.body.innerHTML = "";
  });

  test("should create form element with correct fields", () => {
    const formElement = form.getFormElement();

    // Перевірка наявності елемента форми
    expect(formElement).toBeDefined();
    expect(formElement.tagName).toBe("FORM");

    // Перевірка наявності необхідних полів форми
    expect(formElement.querySelector("#figureName")).toBeDefined();
    expect(formElement.querySelector("#geometryType")).toBeDefined();
    expect(formElement.querySelector("#size")).toBeDefined();
    expect(formElement.querySelector("#color")).toBeDefined();
  });

  test("should create geometry select with options", () => {
    const geometrySelect = form.getFormElement().querySelector("#geometryType");
    const geometryOptions = geometrySelect.options;

    // Перевіряємо, що всі типи геометрії присутні в селекті
    const geometryTypes = Object.keys(GeometryTypes);
    geometryTypes.forEach((type, index) => {
      expect(geometryOptions[index].value).toBe(type);
      expect(geometryOptions[index].textContent).toBe(GeometryTypes[type]);
    });
  });
});
