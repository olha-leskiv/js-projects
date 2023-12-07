async function testApi() {
  let today = new Date();
  console.log(today);
  const apiUrl = "https://russianwarship.rip/api/v2/statistics/2022-04-13";
  try {
    const response = await fetch(apiUrl);
    let info = await response.json();
    console.log(info);
  } catch (err) {
    alert(err);
  }
}

testApi();
