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
  MessageInput,
  ChannelList
} from 'stream-chat-react'
import { AnyResource, AnyRole, Allow, Deny} from 'stream-chat';
import 'stream-chat-react/dist/css/index.css'


export default function ChatClient({ session }) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
  const filters ={members:{$in:[session.user.id]}}
  
  const[client,setClient]=useState(null)
  const[channel,setChannel]=useState(null)
  const [user,setUser] = useState(session.user)
  // const permissions = [
  //   new Permission("Admin users can perform any action", 600, AnyResource, ["admin"], , Allow),
  //   new Permission("Anonymous users are not allowed", 500, AnyResource, ["anonymous"], false, Deny),
  //   new Permission("Users can modify their own messages", 400, ["UpdateMessage"], ["user"], true, Allow),
  //   new Permission("Users can create channels", 300, ["CreateChannel"], ["user"], false, Allow),
  //   new Permission("Channel Members", 200, ["ReadChannel", "CreateMessage"], ["channel_member"], false, Allow),
  //   new Permission("Discard all", 100, AnyResource, AnyRole, false, Deny),
  // ];

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
        // * user is an object
        user,
        token // token
      )
      
      
      
      
      
      
      //     //* ➡️Check to see if there are existing channels if not just show the client
      //     const filter = { type: 'messaging', members: { $in: ['thierry'] } };
      //     const sort = [{ last_message_at: -1 }];
      
      //     const channels = await chatClient.queryChannels(filter, sort, {
        //     watch: true, // this is the default
        //     state: true,
        //     });
        
        //     channels.map((channel) => {
          //     console.log(channel.data.name, channel.cid)
          //   })
          // }
          
          
          
          
          // await client.updateChannelType('messaging', {permissions});
          // //*When adding a member to the list the person is searched and then added
          // await channel.addMembers([],{text:'user has joined the channel.'});
          // const channel = chatClient.channel('messaging',"",{name:'something',members:[user1.id,user2.id]})
          const channel = chatClient.channel('messaging')
          
          await channel.watch()
          
          setChannel(channel)
          setClient(chatClient)
          // await client.updateChannelType("messaging", {permissions});
          
        }
        
        
        init()
        
        if(client ) return ()=> client.disconnectUser()
        
      },[])
      
      if(!channel || !client) return <LoadingIndicator/>;
      
      return(
    <Chat client={client} theme='messaging light'>
      <ChannelList filters={filters}/>
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
