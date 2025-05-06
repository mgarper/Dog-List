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
  likeCount: number; 
}

type FilterType = {
  breed: string[];
  vote: boolean[];
}

function App() {
  const [selectedBreed, setSelectedBreed] = useState<string>("random")
  const [dropdownContent, setDropdownContent] = useState<string[]>([])
  const [dogList, setDogList] = useState<DogDataType[]>([])
  const [dogBreeds, setDogBreeds] = useState<string[]>([])
  const [appliedFilters, setAppliedFilters] = useState<FilterType>({ breed: [], vote: [false,false] })

  async function dropdownLoad() {
    if(dropdownContent.length !== 0) {
      return
    }
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
          if (!breeds.includes(url.breed)) {
            breeds.push(url.breed)
          }
          dogs.push(url)
        }
      }
      setDogList([...dogs])
      setDogBreeds([...breeds])
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
          if (!breeds.includes(url.breed)) {
            breeds.push(url.breed)
          }
          dogs.unshift(url)
        }
      }
      setDogList([...dogs])
      setDogBreeds([...breeds])
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
      const vote = value === "Cute" ? 0 : 1
      filterArray[type][vote] = !filterArray[type][vote]
    }
    setAppliedFilters(filterArray)
  }

  function updateVoteList(id: number, vote: string) {
    let dogs: DogDataType[] = [...dogList]
    let index = dogs.findIndex((dog) => dog.id === id)
    if (vote === "like") {
      dogs[index].likeCount++
    } else {
      dogs[index].dislikeCount++
    }
    setDogList([...dogs])
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
          dogList.map((dog) => {
            let filters = appliedFilters;
            let breedFilters = filters.breed;
            let voteFilters = filters.vote;

            if (
              breedFilters.length === 0 || breedFilters.includes(dog.breed)
            ) {
              if (voteFilters[0] === true && voteFilters[1] === false && dog.likeCount <= dog.dislikeCount) {
                return null; 
              }
              if (voteFilters[0] === false && voteFilters[1] === true && dog.likeCount >= dog.dislikeCount) {
                return null; 
              }
              return (
                <Card
                  id={dog.id}
                  url={dog.imgUrl}
                  n_likes={dog.likeCount}
                  n_dislikes={dog.dislikeCount}
                  onClick={updateVoteList}
                />
              );
            }
            
            return null;
          })
        }
      </div>
    </>
  )
}

export default App
