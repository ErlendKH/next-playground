'use client';

// Navigation
import { useRouter } from 'next/navigation'

import { Avatar, Button, ButtonGroup } from "@nextui-org/react";
import { trainContext } from "../_components/trainContext";
import { useContext, useState } from "react";
import { IconGoldNugget, IconMoment, IconMouse, IconStarryNightAnimated, IconSunsetAnimated } from "../_components/icons";
import Link from "next/link";
import { createRandomizedTreeGroup } from '../_components/tree';

export default function Station() {

    const context = useContext(trainContext)
    // console.log(context)

    // Potential easter egg, but context resets on refresh too.
    // const endText = context.momentsPassed > 0 ? "You've reached the end of the line." : "Well, well, aren't you a clever one. Didn't get to see any pikachus, though."

    const router = useRouter()

    function goingBack(e:any){
        // Reset context
        context.momentsPassed = 0
        context.goldenNuggets = 0
        context.pikachus = 0
        context.sunsets = 0
        context.stars = 0

        // Returning to home
        router.push('/')
    }

    return (
        <main className="flex flex-col items-center bg-slate-950">
            <header className="flex flex-col items-center mt-32 mb-40 mx-16">
                <h1 className="text-6xl text-center dark:text-sky-300 text-sky-700 mb-20">
                    Train Station
                </h1>
                <div className="text-xl text-center">
                    {"You've reached the end of the line."}
                </div>
            </header>
            <div className="flex flex-col mb-40 mx-16">

                <div className="flex flex-col sm:flex-row justify-center gap-12 lg:gap-24 xl:gap-36 mb-8">

                    <div className="flex flex-col justify-center text-center">
                        <ButtonGroup isDisabled className="mb-2">
                            <Button isIconOnly radius="full" className="w-24 h-24 text-sky-300">
                                <IconMoment className="size-3/5" />
                            </Button>
                        </ButtonGroup>
                        <div className="text-lg">Moments passed</div>
                        <div className="text-2xl text-sky-700 dark:text-sky-300">{ context.momentsPassed }</div>
                    </div>

                    <div className="flex flex-col justify-center text-center">
                        <ButtonGroup isDisabled className="mb-2">
                            <Button isIconOnly radius="full" className="w-24 h-24 text-amber-300">
                                <IconGoldNugget className="size-3/5" />
                            </Button>
                        </ButtonGroup>
                        <div className="text-lg">Golden nuggets found</div>
                        <div className="text-2xl text-amber-700 dark:text-amber-300">{ context.goldenNuggets }</div>
                    </div>

                    <div className="flex flex-col justify-center text-center">
                        <ButtonGroup isDisabled className="mb-2">
                            <Button isIconOnly radius="full" className="w-24 h-24 text-yellow-300">
                                <IconMouse className="size-3/5" />
                            </Button>
                        </ButtonGroup>
                        <div className="text-lg">Pikachus found</div>
                        <div className="text-2xl text-yellow-700 dark:text-yellow-300">{ context.pikachus }</div>
                    </div>

                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-12 lg:gap-24 xl:gap-36 mb-32">

                    <div className="flex flex-col justify-center text-center">
                        <ButtonGroup isDisabled className="mb-2">
                            <Button isIconOnly radius="full" className="w-24 h-24 text-amber-300">
                                <IconSunsetAnimated className="size-3/5" />
                            </Button>
                        </ButtonGroup>
                        <div className="text-lg">Sunsets</div>
                        <div className="text-2xl text-amber-700 dark:text-amber-300">{context.sunsets}</div>
                    </div>

                    <div className="flex flex-col justify-center text-center">
                        <ButtonGroup isDisabled className="mb-2">
                            <Button isIconOnly radius="full" className="w-24 h-24 text-yellow-300">
                                <IconStarryNightAnimated className="size-3/5" />
                            </Button>
                        </ButtonGroup>
                        <div className="text-lg">Starry nights</div>
                        <div className="text-2xl text-yellow-700 dark:text-yellow-300">{context.stars}</div>
                    </div>

                </div>

                <div className="flex flex-col gap-3 justify-center items-center">
                    <div>
                        {createRandomizedTreeGroup(6)}
                    </div>
                    <Button size="lg" variant="light" className="text-3xl text-sky-700 dark:text-sky-300"
                        onClick={(e) => {goingBack(e)}}
                    >
                        {"Just one more trip ..."}
                    </Button>
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
    )
}