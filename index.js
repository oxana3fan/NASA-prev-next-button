function getPOD(date, renderComponent) {
    return fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`)
    .then(response => {
        return response.json()
    })
    .then(result => {
        renderComponent(result,date)
    })
}

function renderPODComponent(result,date) {
    const { url, copyright, title, explanation } = result;

    const container = document.getElementById('pod-list');
    const titleComponent = document.createElement('h2');
    titleComponent.innerText = title;
    const dateComponent = document.createElement('p');
    dateComponent.innerText = date;
    const imageComponent = document.createElement('img');
    imageComponent.src = url;
    imageComponent.style.width = '200px'; 
    const descriptionComponent = document.createElement('p');
    descriptionComponent.innerText = explanation;
    const copyrightComponent = document.createElement('p');
    copyrightComponent.innerText = copyright;
    container.append(...[titleComponent, dateComponent, imageComponent, descriptionComponent, copyrightComponent])
}

function calcDays(date, action) {
    let totalPerPage = 3;
    let daysArray = [];

    if (action == 'prev') {
        for(let i = 1; i <= totalPerPage; i++) {
            daysArray.push(moment(date).subtract(i, "days").format("YYYY-MM-DD"));
        }
    } else if (action == 'next') {
        for(let i = 1; i <= totalPerPage; i++) {
            daysUp = moment(date).add(totalPerPage-1, "days");
            daysArray.push(daysUp.add(i, "days").format("YYYY-MM-DD"));
            
        }
    }
    
    return daysArray;
};

function callButton(action) {
    newDatesArray = calcDays(podList.dataset.lastdate, action);
    
    if (action == 'prev') {
        newLastDate = newDatesArray.slice(-1)[0];
    } else if (action == 'next') {
        newLastDate = newDatesArray[0];
    }

    podList.innerHTML = "";
    
    newDatesArray.forEach(date =>{
        getPOD(date, renderPODComponent)
    })

    podList.dataset.lastdate = newLastDate;

    if (newLastDate < lastDate) {
        nextButton.style.visibility = "visible";
    } else {
        nextButton.style.visibility = "hidden";
    }
    
    
  }

today = moment().format("YYYY-MM-DD");
datesArray = calcDays(today, 'prev');
lastDate = datesArray.slice(-1)[0];

datesArray.forEach(date =>{
    getPOD(date, renderPODComponent)
})

podList = document.getElementById("pod-list");
podList.dataset.lastdate = lastDate;

prevButton = document.getElementById("prev");
prevButton.addEventListener("click", function(){callButton('prev');});

nextButton = document.getElementById("next");
nextButton.addEventListener("click", function(){callButton('next');});

  

  

