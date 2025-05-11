import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db("scavenger-hunt")
  return { client, db }
}

// Define the fixed QR code IDs and their component mappings
export const QR_CODE_MAPPINGS = {
  "550e8400-e29b-41d4-a716-446655440000": {
    componentId: "hedy-lamarr",
    name: "Hedy Lamarr",
    description: "Pioneer of wireless communication technologies.",
  },
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8": {
    componentId: "emilie-du-chatelet",
    name: "Émilie du Châtelet",
    description: "Translated and explained Newton's laws of motion.",
  },
  "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d": {
    componentId: "kimberly-bryant",
    name: "Kimberly Bryant",
    description: "Founder of Black Girls CODE.",
  },
  "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed": {
    componentId: "jess-wade",
    name: "Jess Wade",
    description: "Physicist and advocate for diversity in STEM.",
  },
  "f47ac10b-58cc-4372-a567-0e02b2c3d479": {
    componentId: "4as",
    name: "The 4 A's",
    description: "Afua Bruce, Alan Turing, Alice Ball, and Asmaa Boujibar.",
  },
};

// Updated clues and hints
export const CLUES_AND_HINTS = [
  {
    componentId: "hedy-lamarr",
    clue: "In a place where countless feet traverse the same path, where conversations echo and minds meet, a brilliant woman once cast her light not in the spotlight of Hollywood but in the shadows of science. Her groundbreaking invention laid the foundation for wireless communication, yet her name was largely forgotten by history. Today, we honor her quiet, but luminous legacy in a spot that lies halfway between the high and the low, where many people pause but few stop. She is there, in the middle, her contribution still glowing.",
    hint: "Look on the middle step of the main staircase for a small tribute to Hedy Lamarr, the woman whose invention helped create Wi-Fi, Bluetooth, and GPS.",
    difficulty: "Easy",
  },
  {
    componentId: "emilie-du-chatelet",
    clue: "Among the stillness of books, where knowledge is stored and great minds are honored, there lies a hidden gem. A woman of the 18th century, who brought Newton’s laws to life in her own words, is quietly remembered. Her legacy of brilliance transcends centuries, yet her name is often overlooked in the history of physics. Like the quiet yet essential role she played in the development of classical mechanics, her tribute lies under a vast surface of thought and learning, where knowledge flourishes and secrets are kept.",
    hint: "Look beneath the table in the study or reading area, the place where minds gather to dive into the past, uncover hidden knowledge, and continue the work she helped pioneer. Her legacy is tucked away just beneath the surface, waiting to be rediscovered.",
    difficulty: "Above Easy",
  },
  {
    componentId: "kimberly-bryant",
    clue: "In a space where machines hum and ideas are brought to life, a pioneer in the world of technology worked tirelessly to ensure that every voice was heard. She didn’t just code — she built an entire community of young women of color, empowering them to take charge of their futures through technology. Her work helped create an opportunity for girls everywhere to learn the language of the future: code. In this space where wires twist together and machines come to life, her legacy pulses like a heartbeat. It’s hidden in plain sight, quietly waiting for someone to find it.",
    hint: "Seek out the blinking light on a shared table, a small but constant sign of her work. Look behind or under it, where connections are made, just like the ones Kimberly Bryant has made for so many future tech leaders.",
    difficulty: "Hard",
  },
  {
    componentId: "jess-wade",
    clue: "In a space where ideas and meals are shared, a powerful scientist who writes about the overlooked stands firm. This physicist has spent her career advocating for those whose stories are often erased, bringing attention to the amazing contributions of women and people of color in STEM. She shines brightest not where people sit to eat, but where everything begins — where meals are prepared, where new energy starts, and where the next generation of great minds begins to gather. Her quiet resistance to being ignored reflects the same energy that drives change.",
    hint: "You’ll find her tribute near the food counter, not where people eat, but where the tools of nourishment are laid out. Her work is all about giving voice to those who deserve to be seen.",
    difficulty: "Super Hard",
  },
  {
    componentId: "4as",
    clue: "In a place where conversations brew, ideas flow freely, and creativity is sparked by the aroma of fresh coffee, there lies a connection to four remarkable individuals whose work transcends borders and backgrounds. Afua Bruce, a trailblazing technologist, stands strong in advocating for public interest technology. Alan Turing, the brilliant mind who broke the Enigma code, helped lay the foundations for the computer age. Alice Ball, an African-American chemist, developed the first successful treatment for leprosy. And Asmaa Boujibar, a planetary scientist, has contributed to our understanding of space while advocating for diversity in science. These four powerhouses, whose work intersects with innovation and inclusion, are honored here. They all, in their own way, opened doors for others and made the world a better, more inclusive place.",
    hint: "Look at the base of the tallest tree near the café, a symbol of growth, strength, and rooting for a better future. Beneath it, find subtle symbols of the four A’s, each standing for a different person but all working towards the same goal: an inclusive and forward-thinking future in STEM.",
    difficulty: "Difficult, Slightly Easier than Super Hard",
  },
];

// Add this helper function to get IoT component data
export async function getIoTComponents() {
  const { db } = await connectToDatabase();
  const components = await db.collection("components").find({}).toArray();

  if (components.length === 0) {
    const defaultComponents = [
      { id: "hedy-lamarr", 
        name: "Hedy Lamarr", 
        description: "Pioneer of wireless communication technologies." },
      { id: "emilie-du-chatelet",
        name: "Émilie du Châtelet", 
        description: "Translated and explained Newton's laws of motion." },
      { id: "kimberly-bryant", 
        name: "Kimberly Bryant", 
        description: "Founder of Black Girls CODE." },
      { id: "jess-wade", 
        name: "Jess Wade", 
        description: "Physicist and advocate for diversity in STEM." },
      { id: "4as", 
        name: "The 4 A's", 
        description: "Afua Bruce, Alan Turing, Alice Ball, and Asmaa Boujibar." },
    ];

    await db.collection("components").insertMany(defaultComponents);
    return defaultComponents;
  }

  return components;
}

// Add function to get QR code data
export async function getQRCodes() {
  const { db } = await connectToDatabase()
  const qrCodes = await db.collection("qrcodes").find({}).toArray()

  // If no QR codes exist, initialize them with the fixed IDs and component associations
  if (qrCodes.length === 0) {
    const components = await getIoTComponents()

    // Use the fixed QR code IDs
    const qrCodeIds = [
      "550e8400-e29b-41d4-a716-446655440000",
      "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    ]

    // Create QR codes with fixed associations and updated clues
    const defaultQRCodes = qrCodeIds.map((id, index) => {
      // Point to the next component in a circular fashion
      const pointsToIndex = (index + 1) % 5

      return {
        id: id,
        componentId: components[index].id,
        pointsToComponentId: components[pointsToIndex].id,
        clue: CLUES_AND_HINTS[index].clue,
        hint: CLUES_AND_HINTS[index].hint,
        difficulty: CLUES_AND_HINTS[index].difficulty,
        location: `Location ${index + 1}`,
        createdAt: new Date(),
      }
    })

    await db.collection("qrcodes").insertMany(defaultQRCodes)
    return defaultQRCodes
  }

  return qrCodes
}

// Function to get component by QR code ID
export async function getComponentByQRCodeId(qrId: string) {
  // First check if this is one of our fixed QR codes
  if (QR_CODE_MAPPINGS[qrId as keyof typeof QR_CODE_MAPPINGS]) {
    const { db } = await connectToDatabase()
    const component = await db.collection("components").findOne({ id: QR_CODE_MAPPINGS[qrId as keyof typeof QR_CODE_MAPPINGS].componentId })

    if (component) {
      return component
    }

    // If component not found in DB, return the mapping directly
    return {
      id: QR_CODE_MAPPINGS[qrId as keyof typeof QR_CODE_MAPPINGS].componentId,
      name: QR_CODE_MAPPINGS[qrId as keyof typeof QR_CODE_MAPPINGS].name,
      description: QR_CODE_MAPPINGS[qrId as keyof typeof QR_CODE_MAPPINGS].description,
    }
  }

  // If not a fixed QR code, try to find it in the database
  const { db } = await connectToDatabase()
  const qrCode = await db.collection("qrcodes").findOne({ id: qrId })

  if (!qrCode) {
    return null
  }

  const component = await db.collection("components").findOne({ id: qrCode.componentId })
  return component
}

// Function to validate registration ID
export function validateRegistrationId(registrationId: string): boolean {
  // Trim any leading or trailing spaces
  const trimmedId = registrationId.trim()

  // Check if it's at least 8 characters long
  if (trimmedId.length < 8) {
    return false
  }

  // Check if the 7th and 8th characters are '4' and '9'
  return trimmedId.charAt(6) === "4" && trimmedId.charAt(7) === "9"
}

// Function to normalize registration ID (trim spaces and convert to uppercase)
export function normalizeRegistrationId(registrationId: string): string {
  return registrationId.trim().toUpperCase()
}

// Function to check if a user's payment is verified
export async function isUserVerified(registrationId: string): Promise<boolean> {
  try {
    // Check if verification is enabled
    const { db } = await connectToDatabase()
    const settings = await db.collection("settings").findOne({ id: "verification_settings" })
    const verificationEnabled = settings ? settings.verificationEnabled : true

    // If verification is disabled, automatically approve
    if (!verificationEnabled) {
      return true
    }

    // Normalize the registration ID
    const normalizedId = normalizeRegistrationId(registrationId)

    console.log(`Checking if user is verified: ${normalizedId}`)

    // Check if the registration ID exists in the payments collection with status PAID
    // Handle both field name formats
    const payment = await db.collection("payments").findOne({
      $or: [{ registrationId: normalizedId }, { registrationid: normalizedId }],
      status: "PAID",
    })

    console.log(`Payment verification result: ${!!payment}`)

    return !!payment
  } catch (error) {
    console.error("Error checking if user is verified:", error)
    return false
  }
}

// Function to get the first clue
export async function getFirstClue() {
  const { db } = await connectToDatabase()

  // Get the first QR code (LED)
  const qrCode = await db.collection("qrcodes").findOne({
    componentId: "hedy-lamarr",
  })

  if (!qrCode) {
    // If not found, initialize QR codes and try again
    await getQRCodes()
    return db.collection("qrcodes").findOne({ componentId: "hedy-lamarr" })
  }

  return qrCode
}

// Function to get all verified users (for admin)
export async function getAllVerifiedUsers() {
  const { db } = await connectToDatabase()

  // Get all users with PAID status from payments collection
  const payments = await db.collection("payments").find({ status: "PAID" }).toArray()

  // Map payments to verified users format
  return payments.map((payment) => ({
    registrationId: payment.registrationId || payment.registrationid || "N/A",
    fullName: payment.name || "N/A",
    transactionId: payment.orderId || "N/A",
    amount: payment.amount || 0,
    bankingName: payment.bankingName || "N/A",
    verified: true,
    timestamp: payment.timestamp || new Date(),
  }))
}

// Function to check if a user has paid
export async function hasUserPaid(registrationId: string): Promise<boolean> {
  const { db } = await connectToDatabase()

  // Check if verification is enabled
  const settings = await db.collection("settings").findOne({ id: "verification_settings" })
  const verificationEnabled = settings ? settings.verificationEnabled : true

  // If verification is disabled, automatically approve
  if (!verificationEnabled) {
    return true
  }

  // Check if the registration ID exists in the payments collection with status PAID
  // Handle both field name formats
  const payment = await db.collection("payments").findOne({
    $or: [
      { registrationId: normalizeRegistrationId(registrationId) },
      { registrationid: normalizeRegistrationId(registrationId) },
    ],
    status: "PAID",
  })

  return !!payment
}

// Function to get all payment records
export async function getAllPaymentRecords() {
  const { db } = await connectToDatabase()

  // Get all payment records
  return db.collection("payments").find({}).toArray()
}

// Function to track completion of all five components
export async function trackFullCompletion(registrationId: string): Promise<void> {
  const { db } = await connectToDatabase()

  // Normalize the registration ID
  const normalizedId = normalizeRegistrationId(registrationId)

  // Check if already in the collection
  const existing = await db.collection("completionStud").findOne({ registrationId: normalizedId })

  if (!existing) {
    // Add to the completionStud collection
    await db.collection("completionStud").insertOne({
      registrationId: normalizedId,
      completedAt: new Date(),
    })
  }
}

// Function to track completion of three components
export async function trackThreeCompletion(registrationId: string): Promise<void> {
  const { db } = await connectToDatabase()

  // Normalize the registration ID
  const normalizedId = normalizeRegistrationId(registrationId)

  // Check if already in the collection
  const existing = await db.collection("threeCompletion").findOne({ registrationId: normalizedId })

  if (!existing) {
    // Add to the threeCompletion collection
    await db.collection("threeCompletion").insertOne({
      registrationId: normalizedId,
      completedAt: new Date(),
    })
  }
}

// Function to check if user has collected three components
export async function hasCollectedThreeComponents(registrationId: string): Promise<boolean> {
  const { db } = await connectToDatabase()

  // Normalize the registration ID
  const normalizedId = normalizeRegistrationId(registrationId)

  // Check if in the threeCompletion collection
  const record = await db.collection("threeCompletion").findOne({ registrationId: normalizedId })

  return !!record
}

// Function to check if user has completed the hunt
export async function hasCompletedHunt(registrationId: string): Promise<boolean> {
  const { db } = await connectToDatabase()

  // Normalize the registration ID
  const normalizedId = normalizeRegistrationId(registrationId)

  // Check if in the completionStud collection
  const record = await db.collection("completionStud").findOne({ registrationId: normalizedId })

  return !!record
}

// Function to check if a payment exists for a registration ID
export async function getPaymentByRegistrationId(registrationId: string): Promise<any> {
  try {
    const { db } = await connectToDatabase()

    // Normalize the registration ID
    const normalizedId = normalizeRegistrationId(registrationId)

    console.log(`Looking for payment for registration ID: ${normalizedId}`)

    // Find the payment - handle both field name formats
    const payment = await db.collection("payments").findOne({
      $or: [{ registrationId: normalizedId }, { registrationid: normalizedId }],
      status: "PAID",
    })

    console.log(`Payment found: ${!!payment}`)

    return payment
  } catch (error) {
    console.error("Error getting payment by registration ID:", error)
    return null
  }
}

// Function to verify a user based on payment data
export async function verifyUserFromPayment(
  registrationId: string,
  name: string,
  email: string,
  phone: string,
): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()

    // Normalize the registration ID
    const normalizedId = normalizeRegistrationId(registrationId)

    console.log(`Verifying user from payment: ${normalizedId}`)

    // Check if user already exists
    const existingUser = await db.collection("verifiedUsers").findOne({
      registrationId: normalizedId,
    })

    if (existingUser) {
      // User already verified
      console.log(`User already exists, updating verification status if needed`)

      // Update verification status if needed
      if (!existingUser.verified) {
        await db.collection("verifiedUsers").updateOne(
          { registrationId: normalizedId },
          {
            $set: {
              verified: true,
              name: name || existingUser.name,
              email: email || existingUser.email,
              phone: phone || existingUser.phone,
              updatedAt: new Date(),
            },
          },
        )
      }

      return true
    }

    // Create verified user
    console.log(`Creating new verified user for ${normalizedId}`)
    await db.collection("verifiedUsers").insertOne({
      registrationId: normalizedId,
      name,
      email,
      phone,
      verified: true,
      timestamp: new Date(),
    })

    return true
  } catch (error) {
    console.error("Error verifying user from payment:", error)
    return false
  }
}

// Function to get verification settings
export async function getVerificationSettings(): Promise<{ enabled: boolean }> {
  try {
    const { db } = await connectToDatabase()
    const settings = await db.collection("settings").findOne({ id: "verification_settings" })

    // Default to enabled if no settings found
    return { enabled: settings ? settings.verificationEnabled : true }
  } catch (error) {
    console.error("Error getting verification settings:", error)
    // Default to enabled on error
    return { enabled: true }
  }
}

export async function getAllUsers() {
  const { db } = await connectToDatabase();

  // Fetch all users from the users collection
  const users = await db.collection("users").find({}).toArray();

  // Map users to a consistent format
  return users.map((user) => ({
    registrationId: user.registrationId || "N/A",
    fullName: user.fullName || "N/A",
    email: user.email || "N/A",
    phone: user.phone || "N/A",
    verified: user.verified || false,
    timestamp: user.timestamp || new Date(),
  }));
}

