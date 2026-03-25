const people = [
  { name: 'wes bos', age: 32 },
  { name: 'scott tolinski', age: 34 }
];

const names = people.map(({
    name,
    parts = name.split(' '),
    first = parts[0],
    last = parts[1] }) => { first, last }));

//

function Podcast({ mp3Url }) {
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();
  return <div>
      <input type="range" min="0" max="1" step="0.1" onChange={e => setVolume(parseFloat(e.target.value))} value={volume}/>
      <audio src={mp3Uri} controls="hellya" ref={audioRef}></audio>
    </div>
}
<Podcast mp3Url="https://syntax.fm/show.mp3" />

// Three

console.log(`What a year ${new Date()      .getFullYear()} was!`})


// React Miami
import React from 'react';

const students = [
  { name: 'Wes', score: 2 },
  { name: 'Scott', score: 3 },
  { name: 'CJ', score: 4 },
];

const output = students
  .map((student) => ({ ...student, points: student.name.length * student.score }))
  .filter(({ points }) => points % 2)
  .reduce((acc, student) => acc + student.points, 0);

console.log(output);

// Syntax Error 1 For Scott: TypeScript. FIX
type User = { id: number; name: string };

type UserDocument = User & {
  _id: string;
  createdAt: Date;
};

export default async function saveUser(user: User): Promise<UserDocument> {
  const response = await fetch('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  return response.json();
}

type Podcast = {
  id: number;
  title: string;
};


// Syntax Error 2 For Scott: TSX
function PodcastCard({ podcast }  { podcast: Podcast } = { podcast: { id: 69, title: 'Syntax' } }) {
  return (
    <div>
      <h2>{podcast.title}</h2>
      <p>{podcast.id}</p>
    </div>
  );
}

// Syntax error 3: CSS
const css = /* css*/ `


  .wiggle {
    --move: 10px;
    transform: translateX(calc(var(--move) * -1px)) translateY(var(--move));
  }

  .child {
    background: red;
    :is(:hover, :focus) & & {
      background: blue;
    }
  }
`;

type Sandwich = {
  name: string;
  ingredients: string[];
}

type Pizza = {
  name: string;
  toppings: string[];
}

type PreparedFood<T> = T & {
  expires: Date;
}

const pizza: PreparedFood<Pizza> = {
  name: 'Pizza',
  toppings: ['cheese', 'pepperoni'],
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
}


// Above The Rim Syntax Erros

/* Wes 1 - For Loop */

for (let i = 0; i < 4_20_000; i++;) {
  console.log(i);
}

// Correct:

for (let i = 0; i < 4_20_000; i++) {
  console.log(i);
}


/* Wes 2 - Conditional Spread */
const isCool = true;
const coolPerson = {
  name: 'Wes',
  isCool && ...({ age: 42 }),
}


/* Wes 3 - CSS Spacing */

/*css*/`
.wiggle {
  rotate: calc(3turn-10px);
}

/* Wes 4 - CSS IF statements */

/*css*/`
.card {
  border: 3px yellow if (
    style(--theme: dotted): dashed;
    style(--theme: oldschool): inset;
    else: solid;
  );
}

`;

/* Wes 5 - Deep Ternary */
/* see deep-tern.tsx */


/*

CSS not setting unit

CSS calc spacing -
 /* ❌ */


obj?.prop = 1;

obj.?['prop'] = 10;

Guess the Token Count

Guess the programming Language
