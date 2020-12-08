

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
