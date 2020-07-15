const q = [
  'I am careful about the direct and implied meanings of the words I choose.  ', 'I find satisfaction in dealing with numbers.', 'I am good at putting together jigsaw puzzles, and reading instructions, patterns, or blueprints.', 'I appreciate a wide variety of music.', 'I like the most thrilling rides at the fun fair.', 'I am able to influence other individuals to believe and/or behave in response to my own beliefs, preferences and desires.', 'I am aware of the complexity of my own feelings, emotions, and beliefs in various circumstances.', 'I am conscious of wildlife while on a walk and can ‘read’ weather signs.', 'I am grammatically accurate.', 'I prefer questions that have definite "right" and "wrong" answers.', 'I tend to make a visual record of events with a camera or camcorder.', 'I understand the basic precepts of music such as harmony, chords, and keys.', 'I need to physically handle something to fully understand it.', 'I have a large circle of close associates.', 'My ability to understand my own emotions helps me to decide whether or how to be involved in certain situations.', 'I am a keen gardener.', 'I am sensitive to the sounds, rhythms, and inflections, especially as found in poetry.', 'I am interested in new scientific advances.', 'I find myself doodling when taking notes or thinking through something.', 'I have a good sense of musical pitch.', 'I use hand gestures or other kinds of body language to express myself.', 'I have several very close personal friends.', 'I understand why I believe and behave the way I do.', 'I consider that conservation of resources and achieving sustainable growth are two of the biggest issues of our times.', 'I like to do crosswords, play Scrabble or have a go at other word puzzles.', 'I like to put together a detailed itinerary for vacations or trips.', 'I have no problem reading maps and navigating.', 'I can play a musical instrument.', 'I need to tackle a new learning experience ‘hands-on’ rather than reading a manual or watching a video.', 'I communicate well with people and can help resolve disputes.', 'I often spend ‘quiet time’ reflecting on the important issues in my life.', 'I enjoy categorizing things by common traits', 'I can hold my own in verbal arguments or debates.', 'I enjoy the challenge of brain teasers or other puzzles that require logical thinking.', 'I can visualize how things look from a different perspective.', 'I often listen to music at home.', 'I find it difficult to sit still for long periods of time. ', 'I talk over problems with others rather than trying to resolve them by myself.', 'I am an independent thinker—I know my own mind.', 'Classification helps me make sense of new data. ', 'I like to talk through problems, explain solutions and ask questions.', 'I can find specific examples to support a general point of view.', 'Charts, graphs and tables help me interpret data. ', 'I find myself tapping in time to music.', 'I frequently get insights or ideas when I am involved in physical activities, such as walking, swimming, or jogging.', 'I prefer team and group sports to individual sports.', 'I have a private hobby or interest which I don’t really share with anyone else.', 'I enjoy working in a garden.', 'I can readily absorb information from the radio or audio cassettes.', 'I can quickly and easily compute numbers in my head.', 'When I close my eyes, I can see clear visual images.', 'I can identify different musical instruments.', 'I enjoy spending my free time outside.', 'I have been called a leader and consider myself one.', 'I work for myself—or have seriously contemplated ‘doing your own thing.’', 'Putting things in hierarchies makes sense to me', 'I really enjoy books. ', 'I enjoy Math and Science in school.', 'I am responsive to color.', 'I can’t imagine life without music.', 'Sports are a part of my life. ', 'I am comfortable in a crowd of people.', 'I have specific goals in life that I think about regularly.', 'I am good at categorizing and cataloguing information easily ', 'I like puns, tongue twisters, nonsense rhymes, and double meanings.', 'I look for structure, patterns, sequences, or logical order.', 'I often use a camcorder or camera to record my surroundings.', 'I often whistle or hum a tune.', 'I use gestures and non-verbal cues when I communicate.', 'I would rather spend a Saturday night at a party than spend it at home alone.', 'I would rather spend a weekend in a cabin or hide-away than at a large resort with lots of people.', 'I enjoy keeping pets ', 'I often refer to things I have read or heard in conversations.', 'I can think in abstract, clear, imageless concepts. ', 'I enjoy visual puzzles such as mazes, jigsaw puzzles, 3-D images.', 'I like a musical background when I am working.', 'I love to dance. ', 'I am a “team player”.', 'I like to be involved in causes that help others.', 'I like to learn about nature ', 'People often ask me the meaning of words.', 'I can find logical flaws in things people say and do at work or home. ', 'I navigate well in unfamiliar places.', 'I have a pleasant singing voice. ', 'I am skilful in working with objects. ', 'I am a good listener when friends have problems.', 'I am keenly aware of my moral beliefs.', 'I like to camp, hike, walk and climb ', 'Foreign languages interest me. ', 'I can complete calculations quickly in my head.', 'I find Geometry easier than Algebra.', 'I can tell when someone sings off key or out of tune. ', 'I learn best when I have to get up and do it for myself. ', 'I like teaching things to others.', 'I learn best when I have an emotional attachment to the subject.', 'I am conscious of changes in the weather ', "I'm good at finding the fine points of word meanings.", 'Logic puzzles are fun.', 'I can manipulate three dimensional drawings in my head.', 'I often find a TV jingle or a tune running through my mind as I walk or work.', 'I find it easiest to solve problems when I am doing something physical.', 'I have a natural ability to sort out arguments between friends. ', 'Fairness is important to me.', 'I enjoy nature and to be outdoors. '
];

module.exports.questions = q.slice(0, 10); // For testing

module.exports.options = [
  'Always', 'Often', 'Sometimes', 'Rarely', 'Never'
];

const sections = [
  'Verbal Linguistic',
  'Logical Mathematics',
  'Visual Spatial',
  'Musical',
  'Bodily Kinesthetic',
  'Interpersonal',
  'Intrapersonal',
  'Naturalist'
];

const n = sections.length;

module.exports.score = function(input) {
  var marks = [];
  for(var i = 0; i < n; i++) {
    marks[i] = 0;
  }

  var answers = [];

  for (const [key, value] of Object.entries(input)) {
    const i = key % n;
    marks[i] += parseInt(value);
    answers.push(value);
  }

  const totalMarks = marks.reduce((accumulator, element) => {
      return accumulator + element;
  });

  marks = marks.map(element => {
      const percent = parseFloat(element/totalMarks)*100;
      return Math.round(percent * 100)/100; // To 2 Decimal Places
  });

  return {marks: marks, answers: answers};
}
