import { StreamChat } from "stream-chat";

export default function handler(req, res) {
  // //accept user id to authenticate then create a token for that user 
 // To check your permissions version (server side only)
    const { app } = await client.getAppSettings()
    console.log(app.permission_version)

  res.status(200).json({ token })
}