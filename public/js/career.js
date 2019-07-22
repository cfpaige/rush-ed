

function grabApprenticeOffice(city, state) {

    let place = city + '%2C' + state;

    let queryURL = '/api/apprenticeship/' + place;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        let contacts = response.ApprenticeshipOfficeList[0].ListStateAppOfficeContact;
        for (let i = 0; i < 4; i++) {
            let newDiv = $('<div>');
            let person = contacts[i];
            let name = $('<h4>').text(person.ContactName).attr('class', 'name');
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
            let addressBox = $('<p>').text(address)
            let city = $('<p>').text('City: ' + person.City);
            let state = $('<p>').text(person.State);
            let phone = $('<p>').text('Phone: ' + person.ContactPhone);
            let email = $('<p>').text('Email: ' + person.ContactEmail).attr('class', 'url');
            newDiv.append(name);
            newDiv.append(addressBox);
            newDiv.append(city);
            newDiv.append(email);
            newDiv.append(phone)

            $('#person' + i).append(newDiv);
        }
    });
};

function grabCertData(field) {
    let queryURL = "/api/certification/" + field

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        let certList = response.CertList;
        for(cert in certList) {
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
}

function grabLicenseData(field, state) {
    let queryURL = '/api/licenses/' + field + '/' + state;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        let licenseList = response.LicenseList;
        for(license in licenseList) {
            let newLi = $('<li>');
            newLi.attr('class', 'collection-item avatar')
            let newI = $('<i>').text('star').attr('class', 'material-icons circle red')
            let theLicense = licenseList[license];
            let title =  $('<p>').text(theLicense.Title);
            let description =  $('<p>').text(theLicense.Description);
            let licenseURL =  $('<p>').text(theLicense.LicenseAgency.Url);
            newLi.append(newI);
            newLi.append(title);
            newLi.append(description);
            newLi.append(licenseURL);
            $('.license').append(newLi);
        }
    })
}

window.onload = function() {
    $('#submit').on('click', function(event) {
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

}

        