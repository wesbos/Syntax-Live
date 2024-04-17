

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

console.log(`What a year ${new Date() .getFullYear()} was!`})


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

// Syntax Error 2 For Scott: TSX
function UserCard({ user }: { user: User } = { id: 0, name: '' }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.id}</p>
    </div>
  );
}

// Syntax error 3: CSS
const css = /* css */ `


  .wiggle {
    --move: 10px;
    transform: translateX(calc(var(--move) * -1px)) translateY(var(--move));
  }



`;
