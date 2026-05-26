export type FeedItem = {
  id: number
  title: string
  meta?: string
  text?: string
  link?: string
}

export type Story = {
  id: number
  title: string
  category?: string
  excerpt?: string
  link?: string
  image?: string
}

export type Message = {
  id: number
  name?: string
  email?: string
  message?: string
  read?: boolean
  createdAt?: string
}

let feedItems :FeedItem[];


let topStories :Story[];

let messages: Message[] = []
let idCounter = 100

// Feed Methods
export const getAllFeedItems = (): FeedItem[] => feedItems
export const getFeedItemById = (id: string | number): FeedItem | undefined =>
  feedItems.find((item) => item.id === parseInt(String(id)))
export const createFeedItem = (data: Partial<FeedItem>): FeedItem => {
  const newItem: FeedItem = { id: idCounter++, ...data } as FeedItem
  feedItems = [newItem, ...feedItems]
  return newItem
}
export const updateFeedItem = (id: string | number, data: Partial<FeedItem>): FeedItem | null => {
  const idx = feedItems.findIndex((item) => item.id === parseInt(String(id)))
  if (idx !== -1) {
    feedItems[idx] = { ...feedItems[idx], ...data }
    return feedItems[idx]
  }
  return null
}
export const deleteFeedItem = (id: string | number): boolean => {
  const idx = feedItems.findIndex((item) => item.id === parseInt(String(id)))
  if (idx !== -1) {
    feedItems.splice(idx, 1)
    return true
  }
  return false
}

// Stories Methods
export const getAllStories = (): Story[] => topStories
export const getStoryById = (id: string | number): Story | undefined =>
  topStories.find((item) => item.id === parseInt(String(id)))
export const createStory = (data: Partial<Story>): Story => {
  const newItem: Story = { id: idCounter++, ...data } as Story
  topStories = [newItem, ...topStories]
  return newItem
}
export const updateStory = (id: string | number, data: Partial<Story>): Story | null => {
  const idx = topStories.findIndex((item) => item.id === parseInt(String(id)))
  if (idx !== -1) {
    topStories[idx] = { ...topStories[idx], ...data }
    return topStories[idx]
  }
  return null
}
export const deleteStory = (id: string | number): boolean => {
  const idx = topStories.findIndex((item) => item.id === parseInt(String(id)))
  if (idx !== -1) {
    topStories.splice(idx, 1)
    return true
  }
  return false
}

// Messages Methods
export const getAllMessages = (): Message[] => messages
export const getMessageById = (id: string | number): Message | undefined =>
  messages.find((m) => m.id === parseInt(String(id)))
export const createMessage = (data: Partial<Message>): Message => {
  const newMsg: Message = { id: idCounter++, ...data, read: false, createdAt: new Date().toISOString() } as Message
  messages = [newMsg, ...messages]
  return newMsg
}
export const markMessageRead = (id: string | number): Message | null => {
  const msg = messages.find((m) => m.id === parseInt(String(id)))
  if (msg) {
    msg.read = true
    return msg
  }
  return null
}
export const deleteMessage = (id: string | number): boolean => {
  const idx = messages.findIndex((m) => m.id === parseInt(String(id)))
  if (idx !== -1) {
    messages.splice(idx, 1)
    return true
  }
  return false
}
