const editButton = document.querySelector("#edit-button");
const popupProfileCloseButton = document.querySelector('#popup-profile__close-button');
const popupAddCard = document.querySelector(".popup_add-card");
const addButton = document.querySelector("#add-button");
const popupAddCardCloseButton = document.querySelector('#popup-add-card__close-button');
const profileForm = document.querySelector('.popup__container');
const createFormElement = document.querySelector('#popup__container_add-card');
const newPlaceName = document.querySelector('#popup__text_3');
const newPlaceLink = document.querySelector('#popup__text_4');
const closePopupImageButton = document.querySelector('#image-popup__close-button');
const popupCreateButton = document.querySelector('#popup__create-button');


const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
	const buttonElement = formElement.querySelector('.popup__save-button');
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
	});
};

//Валидация
enableValidation({
	formSelector: '.popup__container',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_inactive',
	inputErrorClass: 'popup__input-error',
	errorClass: 'popup__input-error_active'
  }); 
  

//Функция редактирования формы добавления карточки
function submitCreateCard(evt) {
	evt.preventDefault();
	const loadedElement = createCard(newPlaceName.value, newPlaceLink.value);
	elementsMassive.prepend(loadedElement);
	closePopup(popupAddCard);
	newPlaceName.value = '';
	newPlaceLink.value = '';
	makeSubmitButtonInactive(buttonElement, inactiveButtonClass);
}

//Кнопка открытия редактора профиля
editButton.addEventListener("click", () => openPopupProfile());


//Кнопка закрытия редактора профиля
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));

//Кнопка открытия формы добавления карточки
addButton.addEventListener("click", () => openPopup(popupAddCard));

//Кнопка закрытия формы добавления карточки
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));

//Кнопка "Сохранить" в форме редактирования профиля
profileForm.addEventListener('submit', submitProfileForm);

//Кнопка "Создать" в форме добавления карточки
createFormElement.addEventListener('submit', submitCreateCard);

//Кнопка закрытия увеличенного изображения
closePopupImageButton.addEventListener('click', () => closePopup(openImage));


const elementTemplate = document.querySelector('#element-template').content;
const elementsMassive = document.querySelector('.elements');
const openImage = document.querySelector('.image-popup');
const imagePopupPicture = document.querySelector('.image-popup__image');
const figcaptionPopup = document.querySelector('.image-popup__figcaption');

//Массив карточек
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

//Добавление маасива карточек

initialCards.forEach(function (elem) {
	const loadedElement = createCard(elem.name, elem.link);
	elementsMassive.append(loadedElement);
});

//Функция добавления карточки
function createCard(name, link) {
	const newElement = elementTemplate.querySelector('.element').cloneNode(true);
	const newElementName = newElement.querySelector('.element__title');
	const newElementImage = newElement.querySelector('.element__image');
	const newElementLikeButton = newElement.querySelector('.element__like-button');
	const newElementTrashButton = newElement.querySelector('.element__trash-button')
	newElementName.textContent = name;
	newElementImage.src = link;
	newElementImage.alt = name;
	newElementLikeButton.addEventListener('click', function (evt) {   //Реализация кнопкии like для добавляемых карточек
		evt.target.classList.toggle('element__like-button_active');
	});
	newElementTrashButton.addEventListener('click', function(){  //Реализация кнопки удаления для добавляемых карточек
		const deleteCard = newElementTrashButton.closest('.element');//Реализация кнопки удаления для добавляемых карточек
		deleteCard.remove();
	});
	newElementImage.addEventListener('click', function () {
		openPopup(openImage);
		imagePopupPicture.src = link;
		figcaptionPopup.textContent = name;
		imagePopupPicture.alt = name;
	});
	return newElement;
}

const nameInput = document.querySelector('#popup__text_1');
const jobInput = document.querySelector('#popup__text_2');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector(".profile-popup");
const popup = document.querySelectorAll('.popup');


//Функция открытия popup
function openPopup(element) {
	element.classList.add("popup_opened");
	document.addEventListener('keydown', closePopupWhithEsc);
}

//Функция закрытия модального окна клавишей ESC
function closePopupWhithEsc(evt) {
	if (evt.key === 'Escape') {
	  const openedPopup = document.querySelector('.popup_opened');
	  closePopup(openedPopup);
	}
  }

//Функция закрытия popup
function closePopup(element) {
	document.removeEventListener('keydown', closePopupWhithEsc);
	element.classList.remove("popup_opened");
}

//Функция редактирования профиля
function submitProfileForm (evt) {
	evt.preventDefault();
	const nameInputValue = nameInput.value;
	const jobInputValue = jobInput.value;
	profileName.textContent = nameInputValue;
	profileDescription.textContent = jobInputValue;
	closePopup(popupProfile);
}

//Заполнение модального окна профиля данными
function openPopupProfile(){
	openPopup(popupProfile);
	nameInput.value = profileName.innerText;
	jobInput.value = profileDescription.innerText;
}

//Закрытие popup-ов кликом на overlay
popup.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  })
);

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('popup__text_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('popup__text_error');
	errorElement.textContent = '';
	errorElement.classList.remove('popup__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};



function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
}

function toggleButtonState(inputList, buttonElement) {
	if (hasInvalidInput(inputList)) {
		makeSubmitButtonInactive(buttonElement);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove('popup__save-button_inactive');
	}
}

function enableValidation({
	formSelector,
	inputSelector,
	submitButtonSelector,
	inactiveButtonClass,
	inputErrorClass,
	errorClass
}) {
	const formList = Array.from(document.querySelectorAll(formSelector))
	formList.forEach((formElement) => {
		setEventListeners(
			formElement,
			inputSelector,
			submitButtonSelector,
			inactiveButtonClass,
			inputErrorClass,
			errorClass
		)
	})
}

function makeSubmitButtonInactive (buttonElement) {
  buttonElement.disabled = true;
  buttonElement.classList.add('popup__save-button_inactive');
}