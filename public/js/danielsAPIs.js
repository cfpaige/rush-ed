

function grabApprenticeOffice(city, state) {

    let place = city + '%2C' + state;

    let queryURL = '/api/apprenticeship/' + place;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        let contacts = response.ApprenticeshipOfficeList[0].ListStateAppOfficeContact;
        for (people in contacts) {
            let newDiv = $('<div>');
            let person = contacts[people];
            let name = $('<p>').text(person.ContactName).attr('class', 'name');
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
            let city = $('<p>').text(person.City);
            let state = $('<p>').text(person.State);
            let phone = $('<p>').text(person.ContactPhone);
            let email = $('<p>').text(person.ContactEmail).attr('class', 'url');
            newDiv.append(name);
            newDiv.append(addressBox);
            newDiv.append(city);
            newDiv.append(state);
            newDiv.append(email);
            newDiv.append(phone)
            //append to the list
            console.log(person)
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
            let newDiv = $('<div>')
            let theCert = certList[cert];
            let name = $('<p>').text(theCert.Name);
            let description = $('<p>').text(theCert.Description);
            let certURL = $('<a>').text(theCert.Url).attr('href', theCert.Url);
            newDiv.append(name);
            newDiv.append(description);
            newDiv.append(certURL);
            console.log(name, description, certURL)
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
            let newDiv = $('<div');
            let theLicense = licenseList[license];
            let title =  $('<p>').text(theLicense.Title);
            let description =  $('<p>').text(theLicense.Description);
            let licenseURL =  $('<p>').text(theLicense.LicenseAgency.Url);
            newDiv.append(title);
            newDiv.append(description);
            newDiv.append(licenseURL);
            console.log(title, description, licenseURL);
        }
    })
}