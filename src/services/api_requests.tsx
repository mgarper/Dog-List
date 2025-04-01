function getRandomInt(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomDogImage(breed: string) {
    const url =
      breed === '' ? 'https://dog.ceo/api/breeds/image/random' : `https://dog.ceo/api/breed/${breed}/images/random`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      let image = json.message

      if (!breed) {
        let aux = image.match(/(?<=breeds\/)([^\/]+)/);
        if (aux && aux[0].includes("-")) {
            let auxArray = aux[0].split("-");
            auxArray = auxArray.map((element: string) => {
                return `${element.charAt(0).toUpperCase()}${element.substring(1)}`;
            });
            breed = auxArray.reverse().join(" ");
        } else if (aux) {
            breed = `${aux[0].charAt(0).toUpperCase()}${aux[0].substring(1)}`;
        }
      }

      // TODO random breed
      return {
        id: Date.now() + Math.random(),
        breed: breed,
        imgUrl: image,
        dislikeCount: getRandomInt(0, 2),
        likeCount: getRandomInt(0, 1)
      };
    } catch (error) {
    }
}

export default getRandomDogImage