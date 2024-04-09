class Activity {
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.Title = title;
        this.Description = description;
        this.imgUrl = imgUrl;

    }
    
}

class Repository {
    constructor(){
        this.activities = [];
        this.id = 0;
    }
    getAllActivities(){
        return this.activities
    }
    createActivity( title, description, imgUrl){
        this.id++
        const activity = new Activity(this.id, title, description, imgUrl)
        this.activities.push(activity)

    }
    deleteActivity(activityId) {
        this.activities = this.activities.filter(activity => activity.id !== activityId);
        return this.activities
    }
}
const repository = new Repository();

function createHTMLCard(activity) {
    const {id, Title, Description, imgUrl } = activity;

    const titleEl = document.createElement('h3');
    titleEl.innerHTML = Title;

    const descripElem = document.createElement('p');
    descripElem.innerHTML = Description;

    const imgEl = document.createElement('img');
    imgEl.src = imgUrl;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteButtonHandler(id));
    
    const cardT = document.createElement('div');
    titleEl.classList.add("estilo1");
    descripElem.classList.add("estilo2")
    imgEl.classList.add("estiloimg")
    cardT.classList.add('estilo'); 
    cardT.appendChild(titleEl);
    cardT.appendChild(descripElem);
    cardT.appendChild(imgEl);
    cardT.appendChild(deleteButton);

    return cardT;
}


function refreshContainer(container) {
    container.innerHTML = ''; 

    
    const activities = repository.getAllActivities();

    const htmlCards = activities.map(activity => createHTMLCard(activity));

    htmlCards.forEach(card => container.appendChild(card));
}

function ButtonHandler() {
    const TitleInput = document.getElementById('title').value;
    const imgUrlInput = document.getElementById('imgUrl').value;
    const DescriptionInput = document.getElementById('descripcion').value;

    if (!TitleInput || !DescriptionInput || !imgUrlInput) {
        alert('Por favor, complete todos los campos que estan imcompletos.');
        return;
    }

    
    repository.createActivity(TitleInput, DescriptionInput, imgUrlInput);

    const activityContainer = document.getElementById('conte');
    refreshContainer(activityContainer);

}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('imgUrl').value = '';
    document.getElementById('descripcion').value = '';
}




const addButton = document.getElementById('button');
addButton.addEventListener('click',(evento)=>{
    evento.preventDefault()
    ButtonHandler()
} );

const addButtonClear = document.getElementById('button')
addButtonClear.addEventListener('click', () =>{clearForm()})


function deleteButtonHandler(activityId) {
    repository.deleteActivity(activityId);

    const activityContainer = document.getElementById('conte');
    refreshContainer(activityContainer);
}

