# ReactJS assessment with MaterialUI components

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A UI built in ReactJS utilizing MaterialUI for it's objects. it's designed to display a number of partitions and their corrisponding infermation, as well as the information of any harddrives that partition contains (physical or virtual)

this was my first time really using ReactJS so I was having to learn as I worked which made for some messy areas.

This test had me learn a bunch of new things I hadn't touched before.

* Microsoft's WSL (Windows Subsystem for Linux)
    * this for some reason wasn't installed on my windows 11 machine so i had to jump through all those hoops
* Visual Studio Code and it's integration with WSL based projects was amazingly convinient
* ReactJS 
    * Create React App
    * ReactJS Hooks
* New javascript syntax (I've been forced to use old versions of javascript for far too long..)
    * spread syntax
    * arrow function expressions
* MaterialUI


## Things that could be improved
 Honestly a lot. 
 
 * The main page could use some more information as to what you are looking at
 * I'd rather swtich to differtent pages when I click on a partition rather than using a full screen Dialog component (but I was able to reuse the same component for both partitions, and call a second one for the hard drive data as well so I can't complain)
 * There are a number of visual bugs that I didn't have time to correct such as sizing/positioning of components causing items to grow or shrink when they should be fixed to the size of the largest content item
 * Proper use of themes and styles would be nice than the mess I have
 * A bit better code separation 
 * Possibly some changes to DataDialog to more genericize it (I realized rather late that I only needed to modify a couple of lines in order to make it work for both partition data and drive data)
 * There are a couple of assumptions made towards the json object that I'm sure given some more thought I could get rid of and make it even more genericized
