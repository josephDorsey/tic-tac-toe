# tic-tac-toe

We are going to think in terms of the numbers or spots needed to win tic-tac-toe:

if you have [1,2,3] || [4,5,6] || [7,8,9] || [1,5,9] || [7,5,3]
You win the game. So make a property on the gameBoard for winning solutions:

let solutions = [[1,2,3], [4,5,6], [7,8,9], [1,5,9], [7,5,3]]

So make a function that checks the players array and that if they have the following combinations that they win.

let the player have 3 arrays

player = {
rowOne = []
rowTwo = []
rowThree = []
}

whenever we press the button:

- we want to get the boxNumber of the box so we can push it to the corresponding array.
- For example: if

box-1 || box-2 || box-3 then we push to rowOne
box-4 || box-5 || box-6 then we push to rowTwo
box-7 || box-8 || box-9 then we push to rowThree
