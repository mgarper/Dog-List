import { useState } from 'react'
import './App.css'

import PrimaryButton from './components/buttons/PrimaryButton'
import Card from './components/cards/Card'
import DropdownMenu from './components/buttons/DropdownMenu'

import Api from './services/api_requests'

type DogDataType = { 
  id: number; 
  breed: string; 
  imgUrl: any; 
  dislikeCount: number; 
  likeCount: number 
}

type FilterType = {
  breed: string[];
  vote: string;
}

function App() {
  const [selectedBreed, setSelectedBreed] = useState<string>("random")
  const [dropdownContent, setDropdownContent] = useState<string[]>([])
  const [dogList, setDogList] = useState<DogDataType[]>([])
  const [dogBreeds, setDogBreeds] = useState<string[]>([])
  const [appliedFilters, setAppliedFilters] = useState<FilterType>({ breed: [], vote: "" })

  async function dropdownLoad() {
    let list = await Api.listAllBreeds()
    if (list) {
      let array : string[] = ["random"]
      Object.keys(list).forEach((element) => {
        if (list[element].length !== 0) {
          list[element].forEach((item : string) => {
            array.push(`${item}-${element}`)
          })
        } else {
          array.push(element)
        }
      })
      setDropdownContent(array)
    }
  }

  dropdownLoad()

  function onClickDropdownHandler(breed: string) {
    setSelectedBreed(breed)
  }
  
  async function DogEndHandler(times?: number) {
    let breed = selectedBreed === 'random' ? '' : selectedBreed
    if (times) {
      let dogs: DogDataType[] = dogList
      let breeds: string[] = dogBreeds
      for(let i=0; i < times; i++) {
        let url = await Api.getRandomDogImage(breed)
        if (url) {
          breeds.push(url.breed)
          dogs.push(url)
        }
      }
      setDogList(dogs)
      setDogBreeds(breeds)
    } else {
      let url = await Api.getRandomDogImage(breed)
      if (url) {
        addBreed(url.breed)
        setDogList([...dogList, url])
      }
    }
  }

  async function DogBeginningHandler(times?: number) {
    let breed = selectedBreed === 'random' ? '' : selectedBreed
    if (times) {
      let dogs: DogDataType[] = dogList
      let breeds: string[] = dogBreeds
      for(let i=0; i < times; i++) {
        let url = await Api.getRandomDogImage(breed)
        if (url) {
          breeds.push(url.breed)
          dogs.unshift(url)
        }
      }
      setDogList(dogs)
      setDogBreeds(breeds)
    } else {
      let url = await Api.getRandomDogImage(breed)
      if (url) {
        addBreed(url.breed)
        setDogList([url, ...dogList])
      }
    }
  }

  function addBreed(breed: string) {
    if (!dogBreeds.includes(breed)) {
      setDogBreeds([...dogBreeds, breed])
    }
  }

  function addFilter(type: keyof FilterType, value: string) {
    let filterArray = {...appliedFilters}
    if(type === 'breed') {
      if (filterArray[type].includes(value)) {
        let index = filterArray[type].indexOf(value)
        filterArray[type].splice(index, 1)
      } else {
        filterArray[type].push(value)
      }
    } else {

    }
    setAppliedFilters(filterArray)
  }

  return (
    <>
      <div>
        <h1>Rate this doggos</h1>
      </div>
      <div className='interaction'>
        <div>
          <DropdownMenu label='Select a breed' options={dropdownContent} onSelect={onClickDropdownHandler}></DropdownMenu>
        </div>
        <div>
          <PrimaryButton text='Add 1 to the end' onClick={DogEndHandler} isFilter={false}></PrimaryButton>
          <PrimaryButton text='Add 1 to the beginning' onClick={DogBeginningHandler} isFilter={false}></PrimaryButton>
          <PrimaryButton text='Add 5 to the end' onClick={() => DogEndHandler(5)} isFilter={false}></PrimaryButton>
          <PrimaryButton text='Add 5 to the beginning' onClick={() => DogBeginningHandler(5)} isFilter={false}></PrimaryButton>
        </div>
        
      </div>
      <div>
        {
          dogBreeds.length !== 0 ? (
            <>
              <h3>Vote filter</h3>
              <PrimaryButton text={"Cute"} onClick={() => addFilter("vote", "Cute")} isFilter={true} isActive={false}></PrimaryButton>
              <PrimaryButton text={"Ugly"} onClick={() => addFilter("vote", "Ugly")} isFilter={true} isActive={false}></PrimaryButton>
              <h3>Breeds filter</h3>
              {
                dogBreeds.map((dog, index) => (
                  <PrimaryButton key={index} text={dog} onClick={() => addFilter("breed", dog)} isFilter={true} isActive={false}></PrimaryButton>
                ))
              }
            </>
          ) : null
        }
      </div>
      <div className='gallery'>
      {
        dogList.map((dog, index) => {
          let filters = appliedFilters
          let breedFilters = filters.breed
          let voteFilters = filters.vote
          if ((breedFilters.length === 0 || breedFilters.includes(dog.breed)) && (voteFilters.length === 0 || voteFilters.includes(dog.breed))) {
            return <Card key={index} url={dog.imgUrl}></Card>;
          }
          return null;
        })
      }
      </div>
    </>
  )
}

export default App
