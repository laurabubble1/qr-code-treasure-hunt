// Define the clue structure
export interface Clue {
  id: number
  title: string
  clue: string
  hint: string
  alternateClues?: string[]
}

// Define our clue sets with multiple variations for each component
export const CLUE_SETS: Clue[] = [
  {
    id: 1,
    title: "First Component",
    clue: "In a place where countless feet traverse the same path, where conversations echo and minds meet, a brilliant woman once cast her light not in the spotlight of Hollywood but in the shadows of science. Her groundbreaking invention laid the foundation for wireless communication, yet her name was largely forgotten by history. Today, we honor her quiet, but luminous legacy in a spot that lies halfway between the high and the low, where many people pause but few stop. She is there, in the middle, her contribution still glowing.",
    hint: "Look on the middle step of the main staircase for a small tribute to Hedy Lamarr, the woman whose invention helped create Wi-Fi, Bluetooth, and GPS.",
    alternateClues: [ "In a place where countless feet traverse the same path, where conversations echo and minds meet, a brilliant woman once cast her light not in the spotlight of Hollywood but in the shadows of science. Her groundbreaking invention laid the foundation for wireless communication, yet her name was largely forgotten by history. Today, we honor her quiet, but luminous legacy in a spot that lies halfway between the high and the low, where many people pause but few stop. She is there, in the middle, her contribution still glowing."
      ],
  },
  {
    id: 2,
    title: "Second Component",
    clue: "Among the stillness of books, where knowledge is stored and great minds are honored, there lies a hidden gem. A woman of the 18th century, who brought Newton’s laws to life in her own words, is quietly remembered. Her legacy of brilliance transcends centuries, yet her name is often overlooked in the history of physics. Like the quiet yet essential role she played in the development of classical mechanics, her tribute lies under a vast surface of thought and learning, where knowledge flourishes and secrets are kept.",
    hint: "Look beneath the table in the study or reading area, the place where minds gather to dive into the past, uncover hidden knowledge, and continue the work she helped pioneer. Her legacy is tucked away just beneath the surface, waiting to be rediscovered.",
    alternateClues: [ "Among the stillness of books, where knowledge is stored and great minds are honored, there lies a hidden gem. A woman of the 18th century, who brought Newton’s laws to life in her own words, is quietly remembered. Her legacy of brilliance transcends centuries, yet her name is often overlooked in the history of physics. Like the quiet yet essential role she played in the development of classical mechanics, her tribute lies under a vast surface of thought and learning, where knowledge flourishes and secrets are kept."
      ],
  },
  {
    id: 3,
    title: "Third Component",
    clue: "In a space where machines hum and ideas are brought to life, a pioneer in the world of technology worked tirelessly to ensure that every voice was heard. She didn’t just code — she built an entire community of young women of color, empowering them to take charge of their futures through technology. Her work helped create an opportunity for girls everywhere to learn the language of the future: code. In this space where wires twist together and machines come to life, her legacy pulses like a heartbeat. It’s hidden in plain sight, quietly waiting for someone to find it.",
    hint: "Seek out the blinking light on a shared table, a small but constant sign of her work. Look behind or under it, where connections are made, just like the ones Kimberly Bryant has made for so many future tech leaders.",
    alternateClues: ["In a space where machines hum and ideas are brought to life, a pioneer in the world of technology worked tirelessly to ensure that every voice was heard. She didn’t just code — she built an entire community of young women of color, empowering them to take charge of their futures through technology. Her work helped create an opportunity for girls everywhere to learn the language of the future: code. In this space where wires twist together and machines come to life, her legacy pulses like a heartbeat. It’s hidden in plain sight, quietly waiting for someone to find it."],
  },
  {
    id: 4,
    title: "Fourth Component",
    clue: "In a space where ideas and meals are shared, a powerful scientist who writes about the overlooked stands firm. This physicist has spent her career advocating for those whose stories are often erased, bringing attention to the amazing contributions of women and people of color in STEM. She shines brightest not where people sit to eat, but where everything begins — where meals are prepared, where new energy starts, and where the next generation of great minds begins to gather. Her quiet resistance to being ignored reflects the same energy that drives change.",
    hint: "You will find her tribute near the food counter, not where people eat, but where the tools of nourishment are laid out. Her work is all about giving voice to those who deserve to be seen.",
    alternateClues: ["In a space where ideas and meals are shared, a powerful scientist who writes about the overlooked stands firm. This physicist has spent her career advocating for those whose stories are often erased, bringing attention to the amazing contributions of women and people of color in STEM. She shines brightest not where people sit to eat, but where everything begins — where meals are prepared, where new energy starts, and where the next generation of great minds begins to gather. Her quiet resistance to being ignored reflects the same energy that drives change."

    ],
  },
  {
    id: 5,
    title: "Final Component",
    clue: "In a place where conversations brew, ideas flow freely, and creativity is sparked by the aroma of fresh coffee, there lies a connection to four remarkable individuals whose work transcends borders and backgrounds. Afua Bruce, a trailblazing technologist, stands strong in advocating for public interest technology. Alan Turing, the brilliant mind who broke the Enigma code, helped lay the foundations for the computer age. Alice Ball, an African-American chemist, developed the first successful treatment for leprosy. And Asmaa Boujibar, a planetary scientist, has contributed to our understanding of space while advocating for diversity in science. These four powerhouses, whose work intersects with innovation and inclusion, are honored here. They all, in their own way, opened doors for others and made the world a better, more inclusive place.",
    hint: "Look at the base of the tallest tree near the café, a symbol of growth, strength, and rooting for a better future. Beneath it, find subtle symbols of the four A’s, each standing for a different person but all working towards the same goal: an inclusive and forward-thinking future in STEM.",
    alternateClues: [ 
      "In a place where conversations brew, ideas flow freely, and creativity is sparked by the aroma of fresh coffee, there lies a connection to four remarkable individuals whose work transcends borders and backgrounds. Afua Bruce, a trailblazing technologist, stands strong in advocating for public interest technology. Alan Turing, the brilliant mind who broke the Enigma code, helped lay the foundations for the computer age. Alice Ball, an African-American chemist, developed the first successful treatment for leprosy. And Asmaa Boujibar, a planetary scientist, has contributed to our understanding of space while advocating for diversity in science. These four powerhouses, whose work intersects with innovation and inclusion, are honored here. They all, in their own way, opened doors for others and made the world a better, more inclusive place."
    ],
  }
];

// Function to get a random clue for a specific component
export function getRandomClueForComponent(componentId: number): Clue {
  const clueSet = CLUE_SETS.find((set) => set.id === componentId)

  if (!clueSet) {
    throw new Error(`No clue set found for component ID: ${componentId}`)
  }

  // Check if we have a stored clue for this component in this session
  const storedClue = getStoredClue(componentId)
  if (storedClue) {
    return storedClue
  }

  // Create a new clue with a random variation
  const newClue = { ...clueSet }

  if (newClue.alternateClues && newClue.alternateClues.length > 0) {
    // 50% chance to use an alternate clue
    if (Math.random() > 0.5) {
      const randomIndex = Math.floor(Math.random() * newClue.alternateClues.length)
      newClue.clue = newClue.alternateClues[randomIndex]
    }
  }

  // Store the selected clue for this session
  storeClue(componentId, newClue)

  return newClue
}

// Store the clue in session storage
function storeClue(componentId: number, clue: Clue): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(`clue_${componentId}`, JSON.stringify(clue))
  }
}

// Get a stored clue from session storage
function getStoredClue(componentId: number): Clue | null {
  if (typeof window !== "undefined") {
    const storedClue = sessionStorage.getItem(`clue_${componentId}`)
    if (storedClue) {
      return JSON.parse(storedClue)
    }
  }
  return null
}

// Clear all stored clues
export function clearStoredClues(): void {
  if (typeof window !== "undefined") {
    CLUE_SETS.forEach((set) => {
      sessionStorage.removeItem(`clue_${set.id}`)
    })
  }
}

// Function to reset a specific clue (for testing)
export function resetClue(componentId: number): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(`clue_${componentId}`)
  }
}

