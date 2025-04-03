function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function listAllBreeds() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching breed list:", error);
    return null;
  }
}

function formatDogBreed(input: string) {
  if (!input) return "Unknown";
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .reverse()
    .join(" ");
}

async function getRandomDogImage(breed: string) {
  let url = "https://dog.ceo/api/breeds/image/random"; // Default random dog
  
  if (breed) {
    const breedPath = breed.toLowerCase();
    
    // Check if the breed contains a hyphen (indicating two parts)
    if (breedPath.includes("-")) {
      const breedParts = breedPath.split("-");
      // Reverse the order of the breed components in the URL
      url = `https://dog.ceo/api/breed/${breedParts[1]}/${breedParts[0]}/images/random`;
    } else {
      url = `https://dog.ceo/api/breed/${breedPath}/images/random`;
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const json = await response.json();
    let image = json.message;
    let extractedBreed = breed;

    if (!breed) {
      const match = image.match(/breeds\/([\w-]+)/);
      extractedBreed = match ? match[1] : "Unknown";
    }

    return {
      id: Date.now() + Math.random(),
      breed: formatDogBreed(extractedBreed),
      imgUrl: image,
      dislikeCount: getRandomInt(0, 2),
      likeCount: getRandomInt(0, 1),
    };
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return null;
  }
}


export default { listAllBreeds, getRandomDogImage };
