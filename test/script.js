function getAge(sonAge, fatherAge) {
    let result = 0;
    let fatherAgeWhenSonWasBorn = fatherAge - sonAge;
    let sonYears = 0;
    while((fatherAgeWhenSonWasBorn + sonYears) / sonYears !== 2) {
        sonYears++;
        continue
    }
    result = Math.abs(fatherAgeWhenSonWasBorn + sonYears - fatherAge);
    fatherAge = fatherAgeWhenSonWasBorn + sonYears;

    console.log(result + ' років,', 'вік сина: ' + sonYears, ', вік тата: ' + fatherAge)
}

getAge(6, 22)