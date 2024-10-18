const createUser = (name, city) => {
    let user = {name: name, city: city}
    return user
}
console.dir(createUser('Anton', 'Lutsk'))
const data1 = [
    {name: 'Anton', phone: '+3800000000'},
    {name: 'Vika', phone: '+3800777000'},
    {name: 'Kostya', phone: '+3811235813'},
    {name: 'Davyd', phone: '+3819391945'},
]
const findPhoneByName1 = (name) => {
    for (const user of data1) {
        if (user.name === name) return user.phone
    }
}
console.dir(findPhoneByName1('Davyd'))
const data2 = {
    Anton: '+3800000000',
    Vika: '+3800777000',
    Kostya: '+3811235813',
    Davyd: '+3819391945',
}
const findPhoneByName2 = (name) => {
    return data2[name]
}
console.dir(findPhoneByName2('Vika'))