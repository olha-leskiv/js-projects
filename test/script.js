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

function olderThanSon(dadAge, sonAge)  {

    let dadAgeSonWasBorn = dadAge - sonAge;
 
        for(dadAgeSonWasBorn; ; dadAgeSonWasBorn++) {
            for(let i = 0; ; i++) {
                if (dadAgeSonWasBorn / i !== 2) {
                    continue;
                } else {
                    return(dadAgeSonWasBorn, i)
                }
            }
        }
  }
  
  console.log(olderThanSon(6, 22))