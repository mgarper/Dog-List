import { useState } from 'react'
import './App.css'

import PrimaryButton from './components/buttons/PrimaryButton'
import Card from './components/cards/Card'

import getRandomDog from './services/api_requests'

type DogDataType = { 
  id: number; 
  breed: string; 
  imgUrl: any; 
  dislikeCount: number; 
  likeCount: number 
}

function App() {
  const [dogList, setDogList] = useState<DogDataType[]>([])
  const [dogBreeds, setDogBreeds] = useState<string[]>([])

  async function DogEndHandler() {
    let url = await getRandomDog('')
    if (url) {
      addBreed(url.breed)
      setDogList([...dogList, url])
    }
  }

  async function DogBeginningHandler() {
    let url = await getRandomDog('')
    if (url) {
      addBreed(url.breed)
      setDogList([url, ...dogList])
    }
  }

  function addBreed(breed: string) {
    if (!dogBreeds.includes(breed)) {
      setDogBreeds([...dogBreeds, breed])
    }
  }

  return (
    <>
      <div>
        <h2>Vote this doggos</h2>
      </div>
      <div>
        <PrimaryButton text='Add 1 doggo to the end' onClick={DogEndHandler} isFilter={false}></PrimaryButton>
        <PrimaryButton text='Add 1 doggo to the beginning' onClick={DogBeginningHandler} isFilter={false}></PrimaryButton>
      </div>
      <div>
        <h3>Breeds filter</h3>
        {
          dogBreeds.map((dog, index) => (
            <PrimaryButton key={index} text={dog} isFilter={true}></PrimaryButton>
          ))
        }
      </div>
      <div className='gallery'>
        {
          dogList.map((dog, index) => (
            <Card key={index} url={dog.imgUrl}></Card>
          ))
        }
      </div>
    </>
  )
}

export default App
