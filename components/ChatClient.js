import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React,{useEffect,useState} from 'react'
import {StreamChat} from 'stream-chat'
import{ 
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  Thread,
  LoadingIndicator,
  MessageInput
} from 'stream-chat-react'

import 'stream-chat-react/dist/css/index.css'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export default function ChatClient({ session }) {
  const[client,setClient]=useState(null)
  const[channel,setChannel]=useState(null)
  const [user,setUser] = useState(session.user)

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey)

      // api call to get token
      const response = await fetch('http://localhost:3000/api/token',{
        method:'POST',
        body:JSON.stringify(user)
      })

      const { token } = await response.json()

      await chatClient.connectUser(
        user,
        token // token
      )

      const channel = chatClient.channel('messaging','react-talk',{name:'something',members:[user.id]})
      
      await channel.watch()

      setChannel(channel)
      setClient(chatClient)
    
    }

    init()

    if(client ) return ()=> client.disconnectUser()
    
  },[])

  if(!channel || !client) return <LoadingIndicator/>

  return(
    <Chat client={client} theme='messaging light'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader/>
          <MessageList/>
          <MessageInput/>
        </Window>
      </Channel>
    </Chat>
  )
}
