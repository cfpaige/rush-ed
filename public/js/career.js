// logic for the certification view
function grabApprenticeOffice(city, state) {
    // gets the nearby apprentice offices
    let place = city + '%2C' + state;

    // calls the api through the back end
    let queryURL = '/api/apprenticeship/' + place;

    // an api call to get the information
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        let contacts = response.ApprenticeshipOfficeList[0].ListStateAppOfficeContact;
        for (let i = 0; i < 4; i++) {
            // makes a new div to put all the information in
            let newDiv = $('<div>');

            // grab all the information from the div
            let person = contacts[i];
            let address
            if (person.Address1.length > 0) {
                address = person.Address1;
            }
            if (person.Address2.length > 0) {
                if (address !== undefined) {
                    address += ', '
                    address += person.Address2;
                } else {
                    address = person.Address2;
                }
            }

            // put all the information into html tags
            let name = $('<h4>').text(person.ContactName).attr('class', 'name');
            let addressBox = $('<p>').text(address)
            let city = $('<p>').text('City: ' + person.City);
            let state = $('<p>').text(person.State);
            let phone = $('<p>').text('Phone: ' + person.ContactPhone);
            let email = $('<p>').text('Email: ' + person.ContactEmail).attr('class', 'url');

            // put all the info into the div
            newDiv.append(name);
            newDiv.append(addressBox);
            newDiv.append(city);
            newDiv.append(email);
            newDiv.append(phone);

            // Append the div to the page
            $('#person' + i).append(newDiv);
        }
    });
};

function grabCertData(field) {
    // gets relevent data about certifications for the selected field

    let queryURL = "/api/certification/" + field

    // api call to the backend 
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        // grab the list from the api call
        let certList = response.CertList;

        // make a new cert card for each cert in the list
        for (cert in certList) {
            let newLi = $('<li>')
            newLi.attr('class', 'collection-item avatar')
            let newI = $('<i>').text('star').attr('class', 'material-icons circle green')
            let theCert = certList[cert];
            let name = $('<span>').text(theCert.Name).attr('class', 'title');
            let description = $('<p>').text(theCert.Description);
            let certURL = $('<a>').text(theCert.Url).attr('href', theCert.Url);
            newLi.append(newI)
            newLi.append(name);
            newLi.append(description);
            newLi.append(certURL);
            $('.certifications').append(newLi);
        }
    })
};

function grabLicenseData(field, state) {
    // grabs license data 

    let queryURL = '/api/licenses/' + field + '/' + state;

    // call to the api to get the license data
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        // grab the license list
        let licenseList = response.LicenseList;

        // make a new card for each license in the list
        for (license in licenseList) {
            let newLi = $('<li>');
            newLi.attr('class', 'collection-item avatar')
            let newI = $('<i>').text('star').attr('class', 'material-icons circle red')
            let theLicense = licenseList[license];
            let title = $('<p>').text(theLicense.Title);
            let description = $('<p>').text(theLicense.Description);
            let licenseURL = $('<p>').text(theLicense.LicenseAgency.Url);
            newLi.append(newI);
            newLi.append(title);
            newLi.append(description);
            newLi.append(licenseURL);
            $('.license').append(newLi);
        }
    })
};

window.onload = function () {
    // makes sure to wait for window to load before adding code to the submit button

    // takes the city, state, and field options from the form and enters it into all the functions
    $('#submit').on('click', function (event) {
        event.preventDefault();

        var answers = {
            field: $('.field').val(),
            city: $('.city').val(),
            state: $('.state').val()
        }

        grabApprenticeOffice(answers.city, answers.state);
        grabCertData(answers.field);
        grabLicenseData(answers.field, answers.state);
    })
};      