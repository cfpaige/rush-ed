function grabApprenticeOffice(place) {

    let queryURL = '/api/apprenticeship/' + place;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        let contacts = response.ApprenticeshipOfficeList[0].ListStateAppOfficeContact;
        for (people in contacts) {
            let newDiv = $('<div>');
            let person = contacts[people];
            let name = person.ContactName;
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
            let city = person.City;
            let state = person.State;
            let phone = person.ContactPhone;
            let email = person.ContactEmail;
            console.log(name, address, city, state, phone, email)
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
            let theCert = certList[cert];
            let name = theCert.Name;
            let description = theCert.Description;
            let certURL = theCert.Url;
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
            let theLicense = licenseList[license];
            let title = theLicense.Title ;
            let description = theLicense.Description;
            let licenseURL = theLicense.LicenseAgency.Url;
            console.log(title, description, licenseURL);
        }
    })
}