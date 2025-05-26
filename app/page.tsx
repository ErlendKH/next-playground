'use client';

// Unused at the moment
import NextImage from "next/image";

import { trainContext } from "./_components/trainContext";

// Navigation
import { useRouter } from 'next/navigation'

// Next UI
import { Avatar, Button, ButtonGroup, Image, Link } from "@nextui-org/react";

import { IconTree, IconTrain } from "./_components/icons"
import { useContext, useState } from "react";

import { toast } from 'react-hot-toast';
import { createTrees, Tree } from "./_components/tree";
import { delay, randomIntegerInRange } from "./_utils/utilityFunctions";

export default function Home() {

  const context = useContext(trainContext)
  // console.log(context)

  const router = useRouter() // For navigation

  const [initialTrainText, setInitialTrainText] = useState("Let's create a railway.");
  const [createTrainClicked, setCreateTrainClicked] = useState(false);
  const [trainIsLoading, setTrainIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("On and on and on ...");
  const [trainCounter, setTrainCounter] = useState(0);
  const [nextStageText, setNextStageText] = useState("Whenever you are ready.")
  const [leavingTrain, setLeavingTrain] = useState(false)

  function initialTrainButton(text:string, isClicked:boolean, loading:boolean){
    return isClicked ? (
      null
    ) : (
      <Button isLoading={loading} size="lg" color="primary" variant="ghost" 
        className="text-xl text-sky-300 mb-12" onClick={(e) => {createTrainHandler(e)}}>
        { text }
      </Button>
    )
  }
  
  function createTrainHandler(e:any){
    // console.log(e)
    console.log(`Creating the train express ...`)

    setInitialTrainText("Creating the train ...")
    setTrainIsLoading(true)

    delay(3000).then((v) => {
      console.log(`The train is ready. Splendid.`)
      setCreateTrainClicked(true)
    })
  }

  function showTrain(trainCreated:boolean){
    return trainCreated ? (
      <ButtonGroup className="">
        <Button isIconOnly radius="full" className="w-96 h-96 text-emerald-300 border-2 border-emerald-300" onClick={(e) => {trainHandler(e)}}>
          <IconTrain className="size-32" />
        </Button>
      </ButtonGroup>
    ) : null
  }

  function showTrainCounter(trainCreated:boolean, counter:number){
    return trainCreated ? (
      <div className="text-xl text-center">Path towards infinity ... <span className="text-amber-700 dark:text-amber-300">{ trainCounter < 1 ? '' : trainCounter }</span></div>
    ) : null
  }

  // Just a different way of defining a function
  const trainHandler = (e:any) => {
    const newCount = trainCounter + 1
    // console.log(newCount)

    setTrainCounter(newCount)
    context.momentsPassed++

    prepareToast(newCount)
  }

  function prepareToast(counter:number){
    // console.log(`Preparing a toast. The counter is ${counter}`)

    // Override when reaching a target point
    // if(counter % 100 == 0){
    if(counter % 50 == 0){

      const random = randomIntegerInRange(1,4)
      // console.log(`Fate rolled ${random}.`)
      let randomIcon = '🌅'
      switch(random){
        case 1: randomIcon='🌅'; context.sunsets++; break;
        case 2: randomIcon='🌄'; context.sunsets++; break;
        case 3: randomIcon='🌠'; context.stars++; break;
        case 4: randomIcon='🌌'; context.stars++; break;
      }

      toast.success("You arrived.", {
        style: {
          color: 'midnightblue'
        },
        icon: randomIcon
        // icon: '🌅'
      })
      return // Returning early
    }

    const randomNumber = Math.round(Math.random() * 100)
    // console.log(`randomNumber: ${randomNumber}`)
    // console.log(trainCounter)
    if(randomNumber > 90){
      toast.success('Oh! You found a golden nugget.', {
        style: {
          color: 'darkgreen'
        },
        icon: '💰'
      })
      context.goldenNuggets++
    } else if(randomNumber < 10){
      toast.success('Oh! You found a wild pikachu.', {
        style: {
          color: 'darkgoldenrod'
        },
        icon: '🐹'
      })
      context.pikachus++
    } else {
      toast.success(toastMessage);
    }
  }

  function reachedDestination(counter:number, nextStageText:string, leaving:boolean) {

    // return counter >= 100 ? (
    return counter >= 50 ? (
      <Button isLoading={leaving} color="primary" variant="bordered" size="lg" className="text-sky-300 text-xl"
        onClick={(e) => {nextStage(e)}}
      >
        {nextStageText}
      </Button>
    ) : ( 
      null
     )
  }

  function nextStage(e:any){
    console.log(`Initiating next stage ...`)

    setNextStageText("Leaving train...")
    setLeavingTrain(true)

    delay(3000).then((v) => {
      console.log(`Finally breathing the fresh air outside.`)
      router.push('/train-station')
    })
  }

  return (
    <main className="flex flex-col items-center bg-slate-950">
      <header className="flex flex-col items-center mt-32 mb-40 mx-16">
        <h1 className="text-6xl text-center dark:text-sky-300 text-sky-700 mb-20">
          Next.js Playground
        </h1>
      </header>

      <div className="flex flex-col mb-40 mx-16">

        <div className="flex flex-row items-end justify-center mb-6">

          {createTrees(["sm","xs","md","lg","xs","sm"])}

        </div>

        <div className="flex justify-center">
        {initialTrainButton(
          initialTrainText,
          createTrainClicked,
          trainIsLoading
        )}
        </div>

        <div className="flex flex-col gap-6 items-center w-full mb-12">
          {showTrain(createTrainClicked)}
          {showTrainCounter(createTrainClicked, trainCounter)}
        </div>

        <div className="flex justify-center">
          {reachedDestination(trainCounter, nextStageText, leavingTrain)}
        </div>

      </div>

      <footer className="mb-24">
        <div className="flex flex-col items-center">
          <Avatar
            name="Erlend"
            src="Erlend-Kyrkjerud-Haartveit-Bilde-No-Background.png"
            className="mb-4 w-20 h-20"
          />
          <div className="text-md text-center">
            {"Created by "}
            <Link title="Link to my more-or-less official website" href="https://www.erlend.work" target="_blank" className="dark:text-green-300 text-green-700">
              Erlend Kyrkjerud Hårtveit
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
